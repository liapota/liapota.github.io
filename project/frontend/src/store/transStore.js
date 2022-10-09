import { makeAutoObservable, configure } from "mobx";
import apiBlockchain from "../api/apiBlockchain/apiBlockchain";

class TransStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }

  users = [];
  userId = 0;
  coins = 0;
  exp = 0;

  getUsersBlockHandler = () => {
    apiBlockchain
      .getUsers()
      .then(({ data }) => {
        this.users = data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getUserBlockHandler = () => {
    apiBlockchain
      .getUser()
      .then(({ data }) => {
        this.userId = data.id;
        this.coins = data.coins;
        this.exp = data.exp;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  sendHandler = (to, amount) => {
    apiBlockchain
      .trans(to, amount)
      .then(({ data }) => {
        console.log("ok");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  sendBankHandler = (to, amount) => {
    apiBlockchain
      .transBank(to, amount)
      .then(({ data }) => {
        console.log("ok");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  expHandler = (coins) => {
    apiBlockchain
      .buyExp(coins)
      .then(({ data }) => {
        console.log("ok");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default TransStore;
