import React from "react";

import { observer } from "mobx-react-lite";
import {  TransBarWrapper } from "./TransBar.styles";
import { Title } from "../Body.styles";

const TransBar = () => {
  return (
    <TransBarWrapper>
      <Title>История ваших транзакций</Title>
      <div>Транзакция</div>
    </TransBarWrapper>
  );
};

export default observer(TransBar);
