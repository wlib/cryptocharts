import { Component, h } from "preact";
import { format } from "../api";

export default class Header extends Component {
  render(props) {
    return (
      <header>
        <nav>
          <li class="icon-left click" onClick={props.iconLeftAction}>
            {props.iconLeft}
          </li>
          <li class="title">{props.title}</li>
          <li class="icon-right click" onClick={props.iconRightAction}>
            {props.iconRight}
          </li>
        </nav>
        <dl>
          <dt>Market Cap</dt>
          <dd>{format(props.marketCap)}</dd>
          <dt>Today's Volume</dt>
          <dd>{format(props.volume)}</dd>
        </dl>
      </header>
    );
  }
}
