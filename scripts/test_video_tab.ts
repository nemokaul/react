import { WebSocket } from "ws";

async function main() {
  const tabId = "663B82520CE37A252E45F5FD524408DF";
  const tabsRes = await fetch("http://127.0.0.1:12934/json/list");
  const tabs = await tabsRes.json();
  const targetTab = tabs.find((t: any) => t.id === tabId);
  if (!targetTab) {
    console.log("Tab not found");
    return;
  }

  const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
  ws.on("open", () => {
    setTimeout(() => {
      ws.send(JSON.stringify({
        id: 1,
        method: "Runtime.evaluate",
        params: {
          expression: "JSON.stringify({ title: document.title, url: window.location.href, hasVideo: !!document.querySelector('video'), h1: document.querySelector('h1')?.innerText, breadcrumb: document.querySelector('.classroom-nav')?.innerText || document.querySelector('nav')?.innerText })",
          returnByValue: true
        }
      }));
    }, 2000);
  });

  ws.on("message", (data) => {
    console.log("Tab info:", JSON.parse(data.toString())?.result?.result?.value);
    ws.close();
  });
}

main().catch(console.error);
