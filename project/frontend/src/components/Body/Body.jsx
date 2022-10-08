import React from "react";

import { observer } from "mobx-react-lite";
import UsersBar from "./UsersBar";
import Display from "./Display";
import TransBar from "./TransBar";
import { BodyWrapper } from "./Body.styles";


const Body = () => {
  

  
  return (
    <BodyWrapper>

      <UsersBar/>
      <Display/>
      <TransBar/>
    </BodyWrapper>
  );
};

export default observer(Body);
