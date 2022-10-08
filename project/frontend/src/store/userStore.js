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

  getUserHandler = (id) => {
    apiMain
      .getUser(id)
      .then(({ data }) => {
        console.log(data);
        this.setId(data.id);
        this.setRole(data.role);
        this.setName(data.name);
        this.setSurname(data.surname);
        this.setParticipationTeams(data.participation_teams);
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default UserStore;
