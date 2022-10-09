import { makeAutoObservable, configure } from "mobx";
import apiMain from "../api/apiMain";

class UsersListStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.init();
    configure({
      enforceActions: "never",
    });
  }

  id = 0;
  title = "";
  members = [];
  init = () => {
    this.getUsersHandler();
  }

  setId = (result) => {
    this.id = result;
  };
  setTitle = (result) => {
    this.title = result;
  };
  setMembers = (result) => {
    this.members = result;
  };

  getUsersHandler = () => {
    apiMain
      .getUsers()
      .then(({ data }) => {
        this.setId(data.id);
        this.setTitle(data.title);
        this.setMembers(data[2].members);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default UsersListStore;
