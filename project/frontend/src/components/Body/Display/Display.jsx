import React from "react";

import { observer } from "mobx-react-lite";
import { DisplayWrapper } from "./Display.styles";
import Events from "./Events";
import Shop from "./Shop";

const Display = () => {
  return (
    <DisplayWrapper>
      {/* <Events /> */}
      <Shop/>
    </DisplayWrapper>
  );
};

export default observer(Display);
