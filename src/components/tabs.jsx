import { h } from "preact";
import { Link } from "preact-router/match";

export default function Tabs() {
  return (
    <div class="tabs">
      <ul>
        <li>
          <Link activeClassName="active" href="/top">Top Tokens</Link>
        </li>
        <li>
          <Link activeClassName="active" href="/pinned">Pinned Tokens</Link>
        </li>
      </ul>
    </div>
  );
}
