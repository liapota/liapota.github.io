import React from "react";
import ShopStore from "./shopStore";
import TempUserStore from "./tempUserStore";
import TimelineStore from "./timelineStore";
import TransStore from "./transStore";
import UsersListStore from "./usersListStore";
import GlobalStore from "./GlobalStore";

import UserStore from "./userStore";

class Store {
  constructor() {
    this.globalStore = new GlobalStore(this);
    this.shopStore = new ShopStore(this);
    this.tempUserStore = new TempUserStore(this);
    this.timelineStore = new TimelineStore(this);
    this.transStore = new TransStore(this);
    this.usersListStore = new UsersListStore(this);
    this.userStore = new UserStore(this);
  }
}

export const storeContext = React.createContext(new Store());
export const useStore = () => React.useContext(storeContext);
