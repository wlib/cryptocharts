import "./style";
import { Component, h } from "preact";
import Router from "preact-router";
import Redirect from "./components/redirect";
import settings from "./settings";

import Index from "./pages/index";
import Token from "./pages/token";

export default class App extends Component {
  render(props, state) {
    return (
      <Router>
        <Redirect path="/" to="/top" />
        <Index default />
        <Token path="/token/:tokenID" />
      </Router>
    );
  }
}
