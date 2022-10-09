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
    { name: "НАУШНИКИ" },
    { name: "КОФЕ" },
    { name: "ФУТБОЛКА" },
    { name: "КЛАВИАТУРА" },
    { name: "МЫШКА" },
    { name: "АБОНЕМЕНТ" },
  ];

  const plushki = [
    { name: "ДМС", level: "уровень 1", active: true },
    { name: "АБОНЕМЕНТ В СПОРТЗАЛ", level: "уровень 2", active: true },
    { name: "ОПЛАЧИВАЕМЫЕ КУРСЫ", level: "уровень 4", active: false },
    { name: "БАССЕЙН", level: "уровень 6", active: true },
    { name: "КОМАНДИРОВКА", level: "уровень 8", active: false },
    { name: "КУРСЫ АНГЛИЙСКОГО", level: "уровень 10", active: true },
    { name: "ЛЬГОТНАЯ ИПОТЕКА", level: "уровень 12", active: true },
    { name: "БЕСПРОЦЕНТНЫЙ КРЕДИТ", level: "уровень 14", active: true },
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
