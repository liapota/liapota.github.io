import { makeAutoObservable, configure } from "mobx";

class TimelineStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }


  

}

export default TimelineStore;
