import React from "react";

import { observer } from "mobx-react-lite";
import {  TransBarWrapper } from "./TransBar.styles";
import { Title } from "../Body.styles";
import TransButton from "./TransButton";

const TransBar = () => {
  return (
    <TransBarWrapper>
      <Title>История ваших транзакций</Title>
      <TransButton/>
      <TransButton/>
      <TransButton/>
      <TransButton/>

    </TransBarWrapper>
  );
};

export default observer(TransBar);
