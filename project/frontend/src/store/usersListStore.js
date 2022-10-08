import { makeAutoObservable, configure } from "mobx";

class UsersListStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }



  
}

export default UsersListStore;
