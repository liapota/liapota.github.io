import React from "react";

import { observer } from "mobx-react-lite";
import { 
  UserInformationWrapper,
  UserMainStyles,
  UserLevelStyles,
  UserName,
  LevelTimesStyles,
  Level,
  UnderLevel,
  LevelProgress,
  UserLogoStyles,
  UserLogo,
  MainWrapper,
  NFTUserStyles,
  GiveMoneyStyles,
  LogoWrapper
 } from "./MainUserProfile.styles";
import { useStore } from "../../../store";
import userTwo from "../../../img/userTwo.jpeg";
import handsLogo from "../../../img/hand.png";
import seifLogo from "../../../img/seif.png"
import { ProfileMain } from "../Display/Profile/Profile.styles";
import NFTDefaultComponents from "../Display/Profile/ProfileComponents"



const MainUserProfile = () => {
    const { globalStore } = useStore();
  const usersNFT = [
    {name: "НАЗВАНИЕ NFT"},
    {name: "НАЗВАНИЕ NFT"},
    {name: "НАЗВАНИЕ NFT"},
    {name: "НАЗВАНИЕ NFT"},

  ]
  
  return (
    <UserInformationWrapper>
      <MainWrapper>
      <UserMainStyles>
      <UserLogoStyles><UserLogo src={userTwo} width="150" height="150"></UserLogo></UserLogoStyles>
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
      <GiveMoneyStyles>
        <LogoWrapper><img src={handsLogo} width="30" height="30"></img></LogoWrapper>
        <LogoWrapper><img src={seifLogo} width="30" height="30"></img></LogoWrapper>
      </GiveMoneyStyles>
      </UserMainStyles>
      <ProfileMain>
        {usersNFT.map(nft => {
          return (
            <NFTDefaultComponents text="НАЗВАНИЕ nft" profile>{nft.name}</NFTDefaultComponents>
          )
        })}
      </ProfileMain>
      </MainWrapper>
    </UserInformationWrapper>
  );
};

export default observer(MainUserProfile);
