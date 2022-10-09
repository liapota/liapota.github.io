import { makeAutoObservable, configure } from "mobx";
import apiMain from "../api/apiMain";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.init();
    configure({
      enforceActions: "never",
    });
  }

  init = () => {
    this.getUserHandler();
  }
  id = 1;
  role = 0;
  name = "";
  surname = "";
  participationTeams = [];
  teammates = [];

  bonuses = [];
  setId = (result) => {
    this.id = result;
  };
  setRole = (result) => {
    this.role = result;
  };
  setName = (result) => {
    this.name = result;
  };
  setSurname = (result) => {
    this.surname = result;
  };
  setParticipationTeams = (result) => {
    this.participationTeams = result;
  };
  setTeammates = (result) => {
    this.teammates = result;
  };
  setBonuses = (result) => {
    this.bonuses = result;
  };

  getUserHandler = (id) => {
    apiMain
      .getUser(id)
      .then(({ data }) => {
        this.name = data.name;
        this.surname = data.surname;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getBonusHandler = () => {
    apiMain
      .getBonus()
      .then(({ data }) => {
        this.setBonuses(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default UserStore;
