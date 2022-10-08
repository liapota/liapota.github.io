import React from "react";

import { observer } from "mobx-react-lite";
import {
    ProfileTabsWrapper,
    ProfileTab,
    ProfileMain,
    NFTWrapper,
} from "./Profile.styles"
import { useStore } from "../../../../store";
import NFTCreateComponents from "./ProfileComponents/NFTCreate";
import NFTDefaultComponents from "./ProfileComponents/NFTDefault";

const Profile = () => {
    const { globalStore } = useStore();
    const { tabsProfile, handleChange } = globalStore;
    return (
        <>
        <ProfileTabsWrapper>
           {tabsProfile.map((tab, index) => {
            return (
            <ProfileTab
                id={index}
                active={tab.active}
                onClick={()=>handleChange(index, "profile")}>{tab.name}
            </ProfileTab>)
           })}

        </ProfileTabsWrapper>

        <ProfileMain>
            <NFTWrapper>
                <NFTCreateComponents></NFTCreateComponents>
            </NFTWrapper>
            <NFTWrapper>
                <NFTDefaultComponents></NFTDefaultComponents>
            </NFTWrapper>
            
        </ProfileMain>
        </>
    )

}

export default observer(Profile);