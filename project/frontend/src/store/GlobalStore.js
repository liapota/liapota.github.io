import { makeAutoObservable, configure } from "mobx";

class GlobalStore  {
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    currentUserId = 0;

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

    handleClick = (id) => {
        this.currentUserId = id;
        this.tabs.map(tab => tab.active = false);
    }


    handleChange = (id, text) => {
        if (text === "main") {
            this.tabs.map(tab => tab.active = false);
            this.tabs[id].active = true;
        }

        if (text === "profile") {
            this.tabsProfile.map(tab => tab.active = false);
            this.tabsProfile[id].active = true
        }

        if (text === "shop") {
            this.tabsShop.map(tab => tab.active = false);
            this.tabsShop[id].active = true
        }
        
    }

    tabsShop = [
        { name: "ВЕНДОМАТ", active: true },
        { name: "МАРКЕТПЛЕЙС", active: false },
    ];

    handleTry = (id) => {
        
    }
    
}

export default GlobalStore;
