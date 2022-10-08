import React from "react";

import { observer } from "mobx-react-lite";
import { ShopMarketContentWrapper } from "./ShopMarketContent.styles";
import ShopProduct from "../ShopProduct";
import CreateProduct from "../CreateProduct";

const ShopMarketContent = () => {
  return (
    <ShopMarketContentWrapper>
      <CreateProduct />
      <ShopProduct />
      <ShopProduct />
      <ShopProduct />
      <ShopProduct />
    </ShopMarketContentWrapper>
  );
};

export default observer(ShopMarketContent);
