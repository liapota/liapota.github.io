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

    tabsProfile = [
        { name: "Достижения", active: true},
        { name: "МОИ NFT", active: false},
        { name: "ПОКУПКИ", active: false},

    ]


    handleChange = (id, text) => {
        console.log(text)
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


    
}

export default GlobalStore;
