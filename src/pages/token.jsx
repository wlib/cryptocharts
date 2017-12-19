import { Component, h } from "preact";
import { getTickerData } from "../api";
import settings from "../settings";
import Header from "../components/header";
import Chart from "../components/chart";

export default class Token extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: {
        market_cap_usd: 0,
        "24h_volume_usd": 0
      }
    };
  }

  async componentDidMount() {
    const tickerData = await getTickerData(this.props.tokenID, settings);
    this.setState({
      token: tickerData[0]
    });
  }

  render({ tokenID }, { token }) {
    const back = () => history.go(-1);

    const togglePinned = () => {
      const i = settings.pinned.indexOf(tokenID);
      if (i > -1) {
        // Remove
        settings.pinned = settings.pinned.filter(id => id != tokenID);
      } else {
        // Add
        settings.pinned = settings.pinned.concat(tokenID);
      }
      this.forceUpdate();
    };

    let iconRight = "☆";
    if (settings.pinned.includes(tokenID)) {
      iconRight = "★";
    }

    return (
      <div class="token">
        <Header
          title={token.name}
          iconLeft="◂"
          iconLeftAction={back}
          iconRight={iconRight}
          iconRightAction={togglePinned}
          marketCap={token.market_cap_usd}
          volume={token["24h_volume_usd"]}
        />
        <Chart symbol={token.symbol} />
      </div>
    );
  }
}
