import React from "react";

import { observer } from "mobx-react-lite";
import { ShopVendorContentWrapper} from "./ShopVendorContent.styles";
import ShopProduct from "../ShopProduct";


const ShopVendorContent = () => {
  return (
    <ShopVendorContentWrapper>
      <ShopProduct/>
      <ShopProduct/>
      <ShopProduct/>
      <ShopProduct/>
    </ShopVendorContentWrapper>
  );
};

export default observer(ShopVendorContent);
