import React from "react";

import { observer } from "mobx-react-lite";
import { Summary, 
  UserSummaryWrapper,
  NFTUserStyles,
  UserLogoStyles,
  UserLevelStyles,
  UserLogo,
  Level,
  UnderLevel
 } from "./UserSummary.styles";
 import userLogo from "../../img/logo.png";
 import hft from "../../img/nft.png"


const UserSummary = () => {
  
  return (
    <UserSummaryWrapper>
      <Summary>
        <UserLogoStyles><UserLogo src={userLogo} width="150" height="150"></UserLogo></UserLogoStyles>
        <UserLevelStyles>
          <div>
            Лупа Пуповна
          </div>
          <Level>
            <UnderLevel>250/500</UnderLevel>
          </Level>
        </UserLevelStyles>
        <NFTUserStyles><img src={hft}></img></NFTUserStyles>
      </Summary>
    </UserSummaryWrapper>
  );
};

export default observer(UserSummary);
