import { Component, h } from "preact";
import { format } from "../api";

export default class Header extends Component {
  render({ title, marketCap, volume }) {
    const back = () => history.go(-1);
    return (
      <header>
        <nav>
          <li class="back click" onClick={ back }>◂</li>
          <li class="title">{ title }</li>
          <li class="options click">⋮</li>
        </nav>
        <dl>
          <dt>Market Cap</dt>
          <dd>{ format(marketCap) }</dd>
          <dt>Today's Volume</dt>
          <dd>{ format(volume) }</dd>
        </dl>
      </header>
    );
  }
}
