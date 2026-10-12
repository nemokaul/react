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
    console.log("Connected to LinkedIn tab. Navigating to search...");
    await sendCommand("Page.navigate", { url: "https://www.linkedin.com/learning/search?keywords=React" });
    
    // Wait for search results to load
    await new Promise(r => setTimeout(r, 4000));
    
    const evalRes = await sendCommand("Runtime.evaluate", {
      expression: `(() => {
        const results = [];
        // Extract course cards from search results
        const cards = document.querySelectorAll('.search-results-list__item, .artdeco-card, [data-entity-urn*="learningApiCourse"], a[href*="/learning/"]');
        const courseLinks = new Set();
        for (const card of cards) {
          const a = card.querySelector ? card.querySelector('a[href*="/learning/"]') : (card.tagName === 'A' ? card : null);
          if (a && a.href) {
            const cleanUrl = a.href.split('?')[0];
            const text = (card.innerText || a.innerText || '').trim();
            if (cleanUrl.match(/linkedin\.com\/learning\/[a-z0-9-]+$/) && !cleanUrl.endsWith('/search') && !cleanUrl.endsWith('/browse')) {
              courseLinks.add(cleanUrl + '|||' + text.slice(0, 100).replace(/\\n/g, ' '));
            }
          }
        }
        return Array.from(courseLinks);
      })()`,
      returnByValue: true
    });
    
    console.log("Search Results Courses:", evalRes?.result?.value);
    ws.close();
  });
}

main().catch(console.error);
