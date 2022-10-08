import { makeAutoObservable, configure } from "mobx";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }



  
}

export default UserStore;
