import { Component, h } from "preact";
import Router from "preact-router";
import { getGlobalData, getTickerData } from "../api";
import settings from "../settings";
import Header from "../components/header";
import Tabs from "../components/tabs";
import TokenPreviewList from "../components/token-preview-list";

export default class Index extends Component {
  async componentDidMount() {
    const globalData = await getGlobalData(settings);
    const tickerData = await getTickerData("", settings);
    this.setState({
      globalData,
      tickerData
    });
  }

  render(props, { globalData = {}, tickerData = [] }) {
    const topTokens = tickerData.slice(0, settings.limit);
    const pinnedTokens = tickerData.filter(token =>
      settings.pinned.includes(token.id)
    );

    return (
      <div>
        <Header
          title="CryptoCharts"
          iconRight="⋮"
          marketCap={globalData.total_market_cap_usd}
          volume={globalData.total_24h_volume_usd}
        />
        <Tabs />
        <Router>
          <TokenPreviewList default path="/top" tickerData={topTokens} />
          <TokenPreviewList path="/pinned" tickerData={pinnedTokens} />
        </Router>
      </div>
    );
  }
}
