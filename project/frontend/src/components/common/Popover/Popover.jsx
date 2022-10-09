import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { PopoverWrapper } from "./Popover.styles";

const Popover = (props) => {
  return (
    <PopoverWrapper
      {...props}
      style={{
        ...props.style,
        marginTop: props.marginTop,
        position: "absolute",
        backgroundColor: "white",
        zIndex: 10,
      }}
      onClick={props.close}
    >
      {props.child}
    </PopoverWrapper>
  );
};

export default observer(Popover);
