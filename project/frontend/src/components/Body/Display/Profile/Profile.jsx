import React from "react";

import { observer } from "mobx-react-lite";
import {
    ProfileTabsWrapper,
    ProfileTab
} from "./Profile.styles"
import { useStore } from "../../../../store";

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
        </>
    )

}

export default observer(Profile);