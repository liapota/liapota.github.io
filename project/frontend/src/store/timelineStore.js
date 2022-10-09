import { makeAutoObservable, configure } from "mobx";
import apiMain from "../api/apiMain";

class TimelineStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.getEventsHandler();
    configure({
      enforceActions: "never",
    });
  }

  id = 0;
  title = "";
  creator_id = 0;
  description = "";
  start = "";
  duration = ""; // ex. "02:00:00" - 2h
  reward = "";
  is_member = false;
  events = [];

  setId = (result) => {
    this.id = result;
  };
  setTitle = (result) => {
    this.title = result;
  };
  setDescription = (result) => {
    this.description = result;
  };
  setStart = (result) => {
    this.start = result;
  };
  setDuration = (result) => {
    this.duration = result;
  };
  setReward = (result) => {
    this.reward = result;
  };
  setCreatorId = (result) => {
    this.creatorId = result;
  };
  setIsMember = (result) => {
    this.isMember = result;
  };

  // получить все эвенты
  getEventsHandler = () => {
    apiMain
      .getEvents()
      .then(({ data }) => {
        this.events = data;
        this.setId(data.id);
        this.setTitle(data.title);
        this.setDescription(data.description);
        this.setDuration(data.duration);
        this.setReward(data.reward);
        this.setCreatorId(data.creator_id);
        this.setIsMember(data.is_member);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // создать эвент админом
  postEventHandler = (creatorId, title, description, start, duration, reward) => {
    apiMain
      .postEventHandler(creatorId, title, description, start, duration, reward)
      .then(({ data }) => {
          console.log('ok');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // закрыть эвент админом
  closeEventHandler = (eventId, reward) => {
    apiMain
      .closeEvent(eventId, reward)
      .then(({ data }) => {
          console.log('ok');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // подписаться на участие
  subscribeEventHandler = (eventId) => {
    apiMain
      .subscribeEvent(eventId)
      .then(({ data }) => {
          console.log('ok');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleTry = (id) => {
        this.subscribeEventHandler(id);
        this.getEventsHandler();
  }

  handleClick = () => {
    
  }
  
}

export default TimelineStore;
