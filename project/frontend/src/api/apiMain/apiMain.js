import axios from "axios";

export class ApiMain {
  constructor() {
    this.client = axios.create();
    this.client.defaults.baseURL = "http://localhost:80";
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

  getUser = (id) => this.clientWrapper("get", `api/auth?id=${id}`);
  getUsers = () => this.clientWrapper("get", `api/teams`);
  getEvents = () => this.clientWrapper("get", `api/events`);
  closeEvent = (eventId, reward) =>
    this.clientWrapper("put", `api/event/close`, {
      event_id: eventId,
      reward: reward,
    });

  subscribeEvent = (eventId) =>
    this.clientWrapper("put", `api/event/create`, {
      event_id: eventId,
    });

  createEvent = (creatorId, title, description, start, duration, reward) =>
    this.clientWrapper("post", `api/event/create`, {
      creator_id: creatorId,
      title: title,
      description: description,
      start: start,
      duration: duration,
      reward: reward,
    });
    getBonus = () => this.clientWrapper("get", `api/bonus`);
}
const apiMain = new ApiMain();

export default apiMain;
