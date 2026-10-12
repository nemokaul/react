import { WebSocket } from "ws";

async function main() {
  const tabsRes = await fetch("http://127.0.0.1:12934/json/list");
  const tabs = await tabsRes.json();
  const pageTab = tabs.find((t: any) => t.type === "page" && t.url.includes("linkedin.com"));
  if (!pageTab) {
    console.log("No linkedin tab found. Available tabs:", tabs);
    return;
  }
  console.log("Found tab:", pageTab.title, pageTab.url);

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  ws.on("open", () => {
    ws.send(JSON.stringify({
      id: 1,
      method: "Runtime.evaluate",
      params: {
        expression: "JSON.stringify({ title: document.title, url: window.location.href, bodyText: document.body.innerText.slice(0, 300) })",
        returnByValue: true
      }
    }));
  });

  ws.on("message", (data) => {
    console.log("CDP Response:", data.toString());
    ws.close();
  });
}

main().catch(console.error);
