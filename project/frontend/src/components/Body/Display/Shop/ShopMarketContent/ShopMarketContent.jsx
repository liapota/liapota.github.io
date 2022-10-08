import React from "react";

import { observer } from "mobx-react-lite";
import { ShopMarketContentWrapper} from "./ShopMarketContent.styles";
import ShopProduct from "../ShopProduct";


const ShopMarketContent = () => {
  return (
    <ShopMarketContentWrapper>
      <ShopProduct/>
      <ShopProduct/>
      <ShopProduct/>
      <ShopProduct/>
    </ShopMarketContentWrapper>
  );
};

export default observer(ShopMarketContent);
