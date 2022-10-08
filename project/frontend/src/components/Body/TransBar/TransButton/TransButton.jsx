import React from "react";

import { observer } from "mobx-react-lite";
import { Direction, TransButtonWrapper, TransImg } from "./TransButton.styles";
import imgSrc from "../../../../img/trans.png";

const TransBar = () => {
  return (
    <TransButtonWrapper>
      <Direction>Блокчейн</Direction>
      <div>{"->"}</div>
      <Direction>Name Surname</Direction>
      <TransImg src={imgSrc} alt="" />
    </TransButtonWrapper>
  );
};

export default observer(TransBar);
