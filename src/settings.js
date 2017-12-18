export function persistGet(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function persistSet(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// If a setting is not stored locally, return a default
// If it is stored, return the stored version
// Every reassignment is stored in LocalStorage
export default new class Settings {
  get currency() {
    return persistGet("currency") || "USD";
  }

  set currency(value) {
    return persistSet("currency", value);
  }

  get limit() {
    return persistGet("limit") || 24;
  }

  set limit(value) {
    return persistSet("limit", value);
  }

  get pinned() {
    return (
      persistGet("pinned") || [
        "basic-attention-token",
        "bitcoin",
        "bitcoin-cash",
        "dash",
        "ethereum",
        "litecoin",
        "monero",
        "omisego",
        "ripple"
      ]
    );
  }

  set pinned(value) {
    return persistSet("pinned", value);
  }
}();
