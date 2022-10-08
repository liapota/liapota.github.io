import React from "react";
import ShopStore from "./shopStore";
import TempUserStore from "./tempUserStore";
import TimelineStore from "./timelineStore";
import TransStore from "./transStore";
import UsersListStore from "./usersListStore";

import UserStore from "./userStore";

class Store {
  constructor() {
    this.userStore = new ShopStore(this);
    this.userStore = new TempUserStore(this);
    this.userStore = new TimelineStore(this);
    this.userStore = new TransStore(this);
    this.userStore = new UsersListStore(this);
    this.userStore = new UserStore(this);
  }
}

export const storeContext = React.createContext(new Store());
export const useStore = () => React.useContext(storeContext);
