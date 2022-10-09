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
 import userLogo from "../../img/logo.png";
 import hft from "../../img/nft.png"


const UserSummary = () => {
  
  return (
    <UserSummaryWrapper>
      <Summary>
        <UserLogoStyles><UserLogo src={userLogo} width="150" height="150"></UserLogo></UserLogoStyles>
        <UserLevelStyles>
          <UserName>
            Лупа Пуповна
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
