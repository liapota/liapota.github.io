import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import { ShopWrapper } from "./Shop.styles";
import ShopTabs from "./ShopTabs";
import ShopMarketContent from "./ShopMarketContent";

const Shop = () => {
  return (
    <ShopWrapper>
      <ShopTabs />
      <ShopMarketContent/>
    </ShopWrapper>
  );
};

export default observer(Shop);
