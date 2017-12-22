import { Component, h } from "preact";
import { getTickerData } from "../api";
import sparklines from "../../static/sparklines";
import TokenPreview from "./token-preview";

export default class TokenPreviewList extends Component {
  componentDidMount() {
    this.state = {
      sparklines
    };
  }

  render({ tickerData = [] }, { sparklines }) {
    const tokens = tickerData.map(token => {
      return <TokenPreview token={ token } sparkline={ sparklines[token.id] }/>
    });

    return (
      <div class="token-preview-list">
        { tokens }
      </div>
    );
  }
}
