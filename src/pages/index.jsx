import { Component, h } from "preact";
import Router from "preact-router";
import { getGlobalData, getTickerData } from "../api";
import settings from "../settings";
import Header from "../components/header";
import Tabs from "../components/tabs";
import TokenPreviewList from "../components/token-preview-list";
//import SearchPage from "./search";

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.scrollListener = function() {
      if (innerHeight + scrollY >= document.body.offsetHeight) {
        this.setState((prevState, props) => ({
          loadLimit: prevState.loadLimit + 10
        }));
      }
    }.bind(this);
  }

  async componentDidMount() {
    const globalData = await getGlobalData(settings);
    const tickerData = await getTickerData("", settings);
    this.setState({
      globalData,
      tickerData,
      loadLimit: settings.limit
    });

    addEventListener("scroll", this.scrollListener);
  }

  componentWillUnmount() {
    removeEventListener("scroll", this.scrollListener);
  }

  render(props, { globalData = {}, tickerData = [], loadLimit }) {
    const toggleNight = () => {
      settings.night = !settings.night;
      document.body.classList.toggle("night");
    };

    const topTokens = tickerData.slice(0, loadLimit);
    const pinnedTokens = tickerData.filter(token =>
      settings.pinned.includes(token.id)
    );

    return (
      <div>
        <Header
          title="CryptoCharts"
          iconRight="⋮"
          iconRightAction={toggleNight}
          marketCap={globalData.total_market_cap_usd}
          volume={globalData.total_24h_volume_usd}
        />
        <Tabs />
        <Router>
          <TokenPreviewList default path="/top" tickerData={topTokens} />
          <TokenPreviewList path="/pinned" tickerData={pinnedTokens} />
          {/*          <SearchPage path="/search" /> */}
        </Router>
      </div>
    );
  }
}
