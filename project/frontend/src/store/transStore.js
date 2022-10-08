import { makeAutoObservable, configure } from "mobx";

class TransStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }


  

}

export default TransStore;
