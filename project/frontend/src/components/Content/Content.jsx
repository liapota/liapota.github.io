import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import UserSummary from "../UserSummary";
import MainTabs from "../MainTabs";
import Body from "../Body";
import { ContentWrapper } from "./Content.styles";
import { useStore } from "../../store";

const Content = () => {
  const { userStore, usersListStore, transStore } = useStore();
  const { getUserHandler } = userStore;
  const { getUsersHandler } = usersListStore;
  const { getUserBlockHandler, getUsersBlockHandler } = transStore;

  useEffect(() => {
    getUserHandler(1);
    getUsersHandler();
    getUsersBlockHandler();
    getUserBlockHandler(1);
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
