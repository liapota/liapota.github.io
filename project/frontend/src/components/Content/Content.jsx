import React from "react";

import { observer } from "mobx-react-lite";
import UserSummary from "../UserSummary";
import MainTabs from "../MainTabs";
import Body from "../Body";


const Content = () => {
  

  
  return (
    <>
      <UserSummary/>
      <MainTabs/>
      <Body/>
    </>
  );
};

export default observer(Content);
