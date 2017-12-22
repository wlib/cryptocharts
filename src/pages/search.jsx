import { Component, h } from "preact";
import searchDB from "../../static/searchDB";
import TokenPreviewList from "../components/token-preview-list";

// From Underscore.js
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default class SearchPage extends Component {
  componentDidMount() {
    this.setState({
      searchDB,
      matches: []
    });
  }

  search(e) {
    const input = e.target.value;
    const matches = [];

    searchDB.find(token => {
      if (token.search.match(input.toLowerCase())) {
        matches.push(token.tokenID);
      }
    });

    return this.setState({
      matches
    });
  }

  render(props, { matches }) {
    const debouncedSearch = debounce(this.search.bind(this), 500);

    return (
      <div>
        <input onInput={debouncedSearch} />
        <TokenPreviewList tickerData={matches} />
      </div>
    );
  }
}
