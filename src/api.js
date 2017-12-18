export const { format } = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 8
});

export async function get(uri) {
  return fetch(uri).then(r => r.json());
}

/*
{
  "total_market_cap_usd": 166188629850.0, 
  "total_24h_volume_usd": 5903136540.0, 
  "bitcoin_percentage_of_market_cap": 45.26, 
  "active_currencies": 866, 
  "active_assets": 229, 
  "active_markets": 5373
}
*/

export async function getGlobalData({ currency }) {
  return get(`https://api.coinmarketcap.com/v1/global/?convert=${currency}`);
}

/*
[
  {
    "id": "bitcoin", 
    "name": "Bitcoin", 
    "symbol": "BTC", 
    "rank": "1", 
    "price_usd": "4549.68", 
    "price_btc": "1.0", 
    "24h_volume_usd": "2031630000.0", 
    "market_cap_usd": "75222643844.0", 
    "available_supply": "16533612.0", 
    "total_supply": "16533612.0", 
    "percent_change_1h": "-0.26", 
    "percent_change_24h": "-0.68", 
    "percent_change_7d": "9.12", 
    "last_updated": "1504122565"
  },
  ...
]
*/

export async function getTickerData(tokenID = "", { currency }) {
  return get(
    `https://api.coinmarketcap.com/v1/ticker/${tokenID}/?convert=${currency}`
  );
}

/*
{
  "market_cap_by_available_supply": [
    [time, value],
    ...
  ],
  "price_btc": [
    [time, value],
    ...
  ],
  "price_usd": [
    [time, value],
    ...
  ],
  "volume_usd": [
    [time, value],
    ...
  ]
}
*/

export async function getGraphData(tokenID, [start, end] = ["", ""]) {
  return get(
    `https://cors-anywhere.herokuapp.com/graphs.coinmarketcap.com/currencies/${tokenID}/${start}/${end}`
  );
}
