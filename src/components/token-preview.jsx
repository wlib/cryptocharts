import { Component, h } from "preact";
import { format } from "../api";

export default class TokenPreview extends Component {
  color(percent) {
    const float = parseFloat(percent);
    if (float > 0) {
      return "green";
    } else if (float < 0) {
      return "red";
    } else {
      return "gray";
    }
  }

  render({ token, sparkline }) {
    const icon = `https://files.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`;
    const preview = `https://files.coinmarketcap.com/generated/sparklines/${sparkline}.png`;

    const hour = token.percent_change_1h;
    const day = token.percent_change_24h;
    const week = token.percent_change_7d;

    return (
      <a href={`/token/${token.id}`} class="token-preview">
        <div class="media">
          <figure class="icon">
            <img width="32" height="32" src={ icon }/>
          </figure>
          <div class="info">
            <p class="title">{ token.name }</p>
            <p class="subtitle">{ token.symbol } | #{ token.rank }</p>
          </div>
        </div>

        <img class="sparkline" src={ preview }/>

        <div class="content">
          <b>{ format(token.price_usd) }</b>
          <br/>
          <span class={ this.color(hour) }>
            <b>{ hour }%</b> Hour
          </span>
          <br/>
          <span class={ this.color(day) }>
            <b>{ day }%</b> Day
          </span>
          <br/>
          <span class={ this.color(week) }>
            <b>{ week }%</b> Week
          </span>
          <br/>
        </div>
      </a>
    );
  }
}
