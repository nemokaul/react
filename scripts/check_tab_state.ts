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
      expression: `JSON.stringify({
        title: document.title,
        url: window.location.href,
        linksCount: document.querySelectorAll('a').length,
        links: Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.includes('/learning/')).slice(0, 20)
      })`,
      returnByValue: true
    });
    
    console.log("Current Tab State:", evalRes?.result?.value);
    ws.close();
  });
}

main().catch(console.error);
