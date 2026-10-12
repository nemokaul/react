import { WebSocket } from "ws";

async function main() {
  const tabId = "663B82520CE37A252E45F5FD524408DF";
  const tabsRes = await fetch("http://127.0.0.1:12934/json/list");
  const tabs = await tabsRes.json();
  const targetTab = tabs.find((t: any) => t.id === tabId);

  const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
  ws.on("open", () => {
    ws.send(JSON.stringify({
      id: 1,
      method: "Runtime.evaluate",
      params: {
        expression: `JSON.stringify({
          title: document.title,
          url: window.location.href,
          bodySnippet: document.body.innerText.slice(0, 1500),
          links: Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.href })).filter(a => a.href.includes('/learning/')).slice(0, 30)
        })`,
        returnByValue: true
      }
    }));
  });

  ws.on("message", (data) => {
    const res = JSON.parse(data.toString());
    console.log(res.result?.result?.value);
    ws.close();
  });
}

main().catch(console.error);
