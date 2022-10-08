import React from "react";

import { observer } from "mobx-react-lite";
import { ShopVendorContentWrapper } from "./ShopVendorContent.styles";
import ShopProduct from "../ShopProduct";
import CreateProduct from "../CreateProduct";

const ShopVendorContent = () => {
  return (
    <ShopVendorContentWrapper>
      <CreateProduct />
      <ShopProduct />
    </ShopVendorContentWrapper>
  );
};

export default observer(ShopVendorContent);
