import { WebSocket } from "ws";

async function main() {
  const tabsRes = await fetch("http://127.0.0.1:12934/json/list");
  const tabs = await tabsRes.json();
  const pageTab = tabs.find((t: any) => t.type === "page" && t.url.includes("linkedin.com/learning"));
  if (!pageTab) {
    console.log("No linkedin tab found");
    return;
  }

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  
  function sendCommand(method: string, params: any): Promise<any> {
    return new Promise((resolve) => {
      const id = Math.floor(Math.random() * 100000);
      const handler = (data: any) => {
        const msg = JSON.parse(data.toString());
        if (msg.id === id) {
          ws.off("message", handler);
          resolve(msg.result);
        }
      };
      ws.on("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.on("open", async () => {
    const evalRes = await sendCommand("Runtime.evaluate", {
      expression: `(() => {
        const items = [];
        // Look for search result links
        const links = document.querySelectorAll('a[href*="/learning/"]');
        for (const a of links) {
          const href = a.href;
          const text = (a.innerText || '').trim();
          if (href.match(/\/learning\/[a-z0-9-]+$/) && text.length > 5 && !href.includes('/search') && !href.includes('/browse')) {
            items.push({ text: text.replace(/\\n+/g, ' | '), href: href });
          }
        }
        return items;
      })()`,
      returnByValue: true
    });
    
    console.log("Found courses:", JSON.stringify(evalRes?.result?.value, null, 2));
    ws.close();
  });
}

main().catch(console.error);
