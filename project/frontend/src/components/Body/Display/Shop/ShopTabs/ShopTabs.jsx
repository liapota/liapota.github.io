import React from "react";

import { observer } from "mobx-react-lite";
import { ShopTab, ShopTabsWrapper } from "./ShopTabs.styles";
import { useStore } from "../../../../../store";

const ShopTabs = () => {

    
  const { globalStore } = useStore();
  const { tabsShop, handleChange } = globalStore;
  return (
    <ShopTabsWrapper>
      {tabsShop.map((tab, index) => {
            return (
              <ShopTab 
                id={index}
                active={tab.active}
                onClick={()=>handleChange(index, "shop")}>{tab.name}</ShopTab>
            )
          })}
    </ShopTabsWrapper>
  );
};

export default observer(ShopTabs);
