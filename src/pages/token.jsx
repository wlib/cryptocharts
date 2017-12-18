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

  render(props, { token }) {
    return (
      <div class="token">
        <Header title={ token.name } marketCap={ token.market_cap_usd } volume={ token["24h_volume_usd"] }/>
        <Chart symbol={ token.symbol }></Chart>
      </div>
    );
  }
}
