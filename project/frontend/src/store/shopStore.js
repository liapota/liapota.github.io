import { makeAutoObservable, configure } from "mobx";

class ShopStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }


  

}

export default ShopStore;
