import axios from "axios";

export class ApiBlockchain {
  constructor() {
    this.client = axios.create();
    this.client.defaults.baseURL = "http://localhost:4242";
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

  getUser = () => this.clientWrapper("get", `user`);
  getUsers = () => this.clientWrapper("get", `users`);

  trans = (to, amount) =>
    this.clientWrapper("post", `transaction`, {
      to: to,
      amount: amount,
    });
  transBank = (to, amount) =>
    this.clientWrapper("post", `transaction_from_bank`, {
      to: to,
      amount: amount,
    });

  buyExp = (coins) =>
    this.clientWrapper("post", `buy_exp`, {
      coins: coins,
    });
}
const apiBlockchain = new ApiBlockchain();

export default apiBlockchain;
