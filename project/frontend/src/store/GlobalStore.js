import { makeAutoObservable, configure } from "mobx";

class GlobalStore  {
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    tabs = [
        { name: "МАГАЗИН", active: false },
        { name: "ЛЕНТА", active: true },
        { name: "ПРОФИЛЬ", active: false },
    ];

    tabsProfile = [
        { name: "Достижения", active: false},
        { name: "МОИ NFT", active: true},
        { name: "ПОКУПКИ", active: false},

    ]


    handleChange = (id, text) => {
        if (text === "main") {
            this.tabs.map(tab => tab.active = false);
            this.tabs[id].active = true;
        }

        if (text === "profile") {
            this.tabsProfile.map(tab => tab.active = false);
            this.tabsProfile[id].active = true
        }
        
    }


    
}

export default GlobalStore;
