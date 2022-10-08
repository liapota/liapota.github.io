import { makeAutoObservable, configure } from "mobx";
import apiMain from "../api/apiMain";

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  }

  id = 0;
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
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getBonusHandler = () => {
    apiMain
      .getBonus()
      .then(({ data }) => {
        console.log(data);
        this.setBonuses(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default UserStore;
