import { render, h } from "preact";
import App from "./App";
export default App;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

if (typeof window !== "undefined") {
  render(<App/>, document.querySelector("#app"));
}
