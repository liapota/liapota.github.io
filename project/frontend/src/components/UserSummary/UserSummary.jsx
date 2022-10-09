import React from "react";

import { observer } from "mobx-react-lite";
import { Summary, 
  UserSummaryWrapper,
  NFTUserStyles,
  UserLogoStyles,
  UserLevelStyles,
  UserLogo,
  Level,
  UnderLevel,
  LevelTimesStyles,
  UserName,
  LevelProgress,
 } from "./UserSummary.styles";
 import { useStore } from "../../store";
 import userLogo from "../../img/logo.png";
import monk1 from "../../img/monk1.jpeg";
import monk2 from "../../img/monk2.png";
import monk3 from "../../img/monk3.jpeg";
import monk4 from "../../img/monk4.jpeg";

const UserSummary = () => {
  const { userStore } = useStore();
  const { name, surname } = userStore;
  const usersLogo = [monk1, monk2, monk2, monk3, monk4, userLogo];
  const randomLogo = (arr) => {
    var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
  return (
    <UserSummaryWrapper>
      <Summary>
        <UserLogoStyles><UserLogo src={randomLogo(usersLogo)} width="150" height="150"></UserLogo></UserLogoStyles>
        <UserLevelStyles>
          <UserName>
            {name} {surname}
          </UserName>
          <LevelTimesStyles>
            10
          </LevelTimesStyles>
          <div>
          <Level>
            <UnderLevel></UnderLevel>
          </Level>
          </div>
          <LevelProgress>350/500</LevelProgress>
        </UserLevelStyles>
        <NFTUserStyles>100 R</NFTUserStyles>
      </Summary>
    </UserSummaryWrapper>
  );
};

export default observer(UserSummary);
