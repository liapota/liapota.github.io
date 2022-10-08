import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import UserSummary from "../UserSummary";
import MainTabs from "../MainTabs";
import Body from "../Body";
import { ContentWrapper } from "./Content.styles";
import { useStore } from "../../store";

const Content = () => {
  const { userStore, usersListStore } = useStore();
  const { getUserHandler } = userStore;
  const { getUsersHandler } = usersListStore;

  useEffect(() => {
    getUserHandler(1);
    getUsersHandler();
  }, []);

  return (
    <ContentWrapper>
      <UserSummary />
      <MainTabs />
      <Body />
    </ContentWrapper>
  );
};

export default observer(Content);
