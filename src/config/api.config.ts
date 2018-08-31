export const API_CONFIG = {
  _baseURL: "http://localhost:8080",
  get baseURL() {
    return this._baseURL;
  },
  set baseURL(value) {
    this._baseURL = value;
  },
}
