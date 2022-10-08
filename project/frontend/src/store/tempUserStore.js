import { makeAutoObservable, configure } from "mobx";

class TempUserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }


  

}

export default TempUserStore;
