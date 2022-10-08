import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import { ShopWrapper } from "./Shop.styles";
import ShopTabs from "./ShopTabs";
import ShopMarketContent from "./ShopMarketContent";
import { useStore } from "../../../../store";
import ShopVendorContent from "./ShopVendorContent";

const Shop = () => {
  const store = useStore();
  const { globalStore } = store;
  const { tabsShop } = globalStore;
  const activeIndex = tabsShop?.findIndex((tab) => tab.active);

  return (
    <ShopWrapper>
      <ShopTabs />
      {activeIndex === 0 && <ShopMarketContent />}
      {activeIndex === 1 && <ShopVendorContent />}
    </ShopWrapper>
  );
};

export default observer(Shop);
