import React from "react";

import { observer } from "mobx-react-lite";
import { ShopMarketContentWrapper } from "./ShopMarketContent.styles";
import ShopProduct from "../ShopProduct";
import CreateProduct from "../CreateProduct";

const ShopMarketContent = () => {
  return (
    <ShopMarketContentWrapper>
      <CreateProduct />
      <ShopProduct name="Наушники" price="100"/>
      <ShopProduct name="Футболка" price="50"/>
      <ShopProduct name="Часы" price="200"/>
      <ShopProduct name="Кружка" price="10"/>
    </ShopMarketContentWrapper>
  );
};

export default observer(ShopMarketContent);
