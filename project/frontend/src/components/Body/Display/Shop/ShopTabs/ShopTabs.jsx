import React from "react";

import { observer } from "mobx-react-lite";
import { ShopTab, ShopTabsWrapper } from "./ShopTabs.styles";

const ShopTabs = () => {
  return (
    <ShopTabsWrapper>
      <ShopTab active>ВЕНДОМАТ</ShopTab>
      <ShopTab>МАРКЕТПЛЕЙС</ShopTab>
    </ShopTabsWrapper>
  );
};

export default observer(ShopTabs);
