import React from "react";

import { observer } from "mobx-react-lite";
import {
  ProfileTabsWrapper,
  ProfileTab,
  ProfileMain,
  NFTWrapper,
  ProfileFeedStyles,
} from "./Profile.styles";
import { useStore } from "../../../../store";
import NFTDefaultComponents from "./ProfileComponents";
import CreateNFT from "./CreateNFT";
import defaultNFT from "../../../../img/defaultNFT.svg";

const Profile = () => {
  const { globalStore } = useStore();
  const { tabsProfile, handleChange } = globalStore;
  const activeIndex = tabsProfile.findIndex((tab) => tab.active);

  const nftshki = [
    { name: "НАЗВАНИЕ NFT" },
    { name: "НАЗВАНИЕ NFT" },
    { name: "НАЗВАНИЕ NFT" },
    { name: "НАЗВАНИЕ NFT" },
    { name: "НАЗВАНИЕ NFT" },
    { name: "НАЗВАНИЕ NFT" },
  ];

  const cost = [
    { name: "ТОВАР" },
    { name: "ТОВАР" },
    { name: "ТОВАР" },
    { name: "ТОВАР" },
    { name: "ТОВАР" },
    { name: "ТОВАР" },
  ];

  const plushki = [
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: true },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: true },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: false },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: true },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: false },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: true },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: true },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: false },
    { name: "ДОСТИЖЕНИЯ", level: "уровень 5", active: true },
  ]

  return (
    <ProfileFeedStyles>
      <ProfileTabsWrapper>
        {tabsProfile.map((tab, index) => {
          return (
            <ProfileTab
              id={index}
              active={tab.active}
              onClick={() => handleChange(index, "profile")}
            >
              {tab.name}
            </ProfileTab>
          );
        })}
      </ProfileTabsWrapper>
      {activeIndex === 1 && (
        <ProfileMain>
          <CreateNFT></CreateNFT>
          {nftshki.map((nft) => {
            return (
              <NFTDefaultComponents text={nft.name}></NFTDefaultComponents>
            );
          })}
        </ProfileMain>
      )}
      {activeIndex === 2 && (
        <ProfileMain>
          {cost.map((cos) => {
            return (
              <NFTDefaultComponents text={cos.name}></NFTDefaultComponents>
            );
          })}
        </ProfileMain>
      )}
      {activeIndex === 0 && (
        <ProfileMain>
        {plushki.map((plushka) => {
          return (
            <NFTDefaultComponents text={plushka.name} level={plushka.level} active={plushka.active}></NFTDefaultComponents>
          );
        })}
      </ProfileMain>
      )}
    </ProfileFeedStyles>
  );
};

export default observer(Profile);
