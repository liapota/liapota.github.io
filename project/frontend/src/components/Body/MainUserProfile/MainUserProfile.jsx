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
import userLogo from "../../../img/logo.png";
import monk1 from "../../../img/monk1.jpeg";
import monk2 from "../../../img/monk2.png";
import monk3 from "../../../img/monk3.jpeg";
import monk4 from "../../../img/monk4.jpeg";


const MainUserProfile = () => {
    const { globalStore, usersListStore, userStore } = useStore();
    const { currentUserId, handleClick } = globalStore;
    const { members } = usersListStore;
    const { role } = userStore;
    const usersName = members.map(user => user.name);
    const usersSurname = members.map(user => user.surname);
    const currentUserName = usersName[currentUserId];
    const currentUserusersSurname = usersSurname[currentUserId];
    const usersLogo = [monk1, monk2, monk2, monk3, monk4, userLogo, userTwo];
    const randomLogo = (arr) => {
      var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}
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
      <UserLogoStyles><UserLogo src={randomLogo(usersLogo)} width="150" height="150"></UserLogo></UserLogoStyles>
        <UserLevelStyles>
          <UserName>
            {currentUserName} {currentUserusersSurname}
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
        <LogoWrapper><img src={handsLogo} width="30" height="30" ></img></LogoWrapper>
        {role === 0 && <LogoWrapper><img src={seifLogo} width="30" height="30"></img></LogoWrapper>}
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
