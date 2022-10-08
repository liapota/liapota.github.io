import React from "react";

import { observer } from "mobx-react-lite";
import { ShopVendorContentWrapper } from "./ShopVendorContent.styles";

const ShopVendorContent = () => {
  return (
    <ShopVendorContentWrapper>
      <div>Vendor</div>
    </ShopVendorContentWrapper>
  );
};

export default observer(ShopVendorContent);
