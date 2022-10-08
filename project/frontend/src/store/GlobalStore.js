import { makeAutoObservable, configure } from "mobx";

class GlobalStore  {
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    tabs = [
        { name: "МАГАЗИН", active: true },
        { name: "ПРОФИЛЬ", active: false },
        { name: "ЛЕНТА", active: false },
    ];


    handleChange = (id) => {
        this.tabs.map(tab => tab.active = false);
        this.tabs[id].active = true;
    }

    
}

export default GlobalStore;
