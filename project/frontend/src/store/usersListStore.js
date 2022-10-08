import { makeAutoObservable, configure } from "mobx";
import apiMain from "../api/apiMain";

class UsersListStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }

  id = 0;
  title = "";
  members = [];

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
        console.log(data);
        this.setId(data.id);
        this.setTitle(data.title);
        this.setMembers(data.members);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default UsersListStore;
