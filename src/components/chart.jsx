import { Component, h } from "preact";
import settings from "../settings";

export default class Chart extends Component {
  render({ symbol }) {
    const theme = settings.night ? "Dark" : "Light";
    const widget = `https://s.tradingview.com/widgetembed/?symbol=${symbol}USD&interval=120&hidetoptoolbar=1&hideideas=1&theme=${theme}`;
    const fullChart = `https://s.tradingview.com/widgetembed/?symbol=${symbol}USD&interval=120&hidesidetoolbar=0&symboledit=1&saveimage=1&withdateranges=1&studies=MASimple%40tv-basicstudies&theme=${theme}`;

    return (
      <div class="chart-container">
        <iframe class="chart" src={widget} scrolling="no" />
        <div class="full-chart">
          <a href={fullChart} target="_blank">
            Open Full Chart
          </a>
        </div>
      </div>
    );
  }
}
