import React from "react";
import { RectButtonWrapper } from "./RectButton.styles";

const RectButton = (props) => {
  return (
    <RectButtonWrapper className={props.className} fill={props.fill} maxwidth={props.maxwidth} 
    minwidth={props.minwidth} width={props.width}>
      <button type="button" className="btn-rect" onClick={props.onClick}>
        {props.name}
      </button>
    </RectButtonWrapper>
  );
};

export default RectButton;
