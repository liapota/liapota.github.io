import React from "react";

import { observer } from "mobx-react-lite";
import UserSummary from "../UserSummary";
import MainTabs from "../MainTabs";
import Body from "../Body";
import { ContentWrapper } from "./Content.styles";


const Content = () => {
  return (
    <ContentWrapper>
      <UserSummary />
      <MainTabs />
      <Body />
    </ContentWrapper>
  );
};

export default observer(Content);
