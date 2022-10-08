import axios from "axios";

export class ApiBlockchain {
  constructor() {
    this.client = axios.create();
    this.client.defaults.baseURL = "https://gently-whitesnow.github.io/";
    this.client.defaults.headers["Access-Control-Allow-Origin"] = "*";
    this.client.defaults.headers["Content-Type"] =
      "application/json;charset=UTF-8";
    this.client.defaults.withCredentials = true;
    this.client.timeout = 3000;
  }

  clientWrapper = (method, url, data, config = {}) => {
    const clientResult = this.client[method](url, data, config);
    return clientResult;
  };

  
}
const apiBlockchain = new ApiBlockchain();

export default apiBlockchain;
