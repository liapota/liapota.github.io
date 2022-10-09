import React from "react";

import { observer } from "mobx-react-lite";
import { AboutContentWrapper } from "../AboutContent/AboutContent.styles";
import {
  EnterWrapper,
  Lift,
  UserLogo,
  UserLogoStyles,
} from "./AuthContent.styles";
import userLogo from "../../../../img/logo.png";
import { UserName } from "../../../UserSummary/UserSummary.styles";
import apiMain from "../../../../api/apiMain";
import { useStore } from "../../../../store";

const AboutContent = (props) => {
  const { userStore, globalStore } = useStore();

  const { setIsShowPopupAuth } = globalStore;
  const { setId } = userStore;
  const clickHandler = (i) => {
    setId(i);
    setIsShowPopupAuth(false);
  };

  const auth = (i) => {
    apiMain
      .getUser(i)
      .then(({ data }) => {
        return data.name + " " + data.surname;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
      <AboutContentWrapper>
        <EnterWrapper onClick={() => clickHandler(1)}>
          <UserLogoStyles>
            <UserLogo src={userLogo} width="50" height="50"></UserLogo>
          </UserLogoStyles>
          <UserName>{auth(1)}</UserName>
        </EnterWrapper>
        <EnterWrapper onClick={() => clickHandler(2)}>
          <UserLogoStyles>
            <UserLogo src={userLogo} width="50" height="50"></UserLogo>
          </UserLogoStyles>
          <UserName>{auth(2)}</UserName>
        </EnterWrapper>
      </AboutContentWrapper>
  );
};

export default observer(AboutContent);
