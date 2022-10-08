import React from "react";

import { observer } from "mobx-react-lite";
import {
  Description,
  Direction,
  TransButtonLineWrapper,
  TransButtonWrapper,
  TransImg,
} from "./TransButton.styles";
import imgSrc from "../../../../img/trans.png";

const TransBar = () => {
  return (
    <TransButtonWrapper>
      <TransButtonLineWrapper>
        <Direction>Блокчейн</Direction>
        <div>&rarr;</div>
        <Direction>Name Surname</Direction>
        <TransImg src={imgSrc} alt="" />
      </TransButtonLineWrapper>
      <Description className="desc">За участие в хакатоне</Description>
    </TransButtonWrapper>
  );
};

export default observer(TransBar);
