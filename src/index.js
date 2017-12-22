import { render, h } from "preact";
import "preact/devtools";
import App from "./App";
export default App;
import settings from "./settings";

if (settings.night) {
  document.body.classList.add("night");
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

if (typeof window !== "undefined") {
  render(<App/>, document.querySelector("#app"));
}
