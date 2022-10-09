import React from "react";
import { observer } from "mobx-react-lite";
import { CardWrapper } from "./NFTComponents.styes"
import defaultNFT from "../../../../../img/defaultNFT.svg"


const NFTComponents = ({text, level, active, profile}) => {
    return (
        <CardWrapper active={active} profile={profile}>
            <img className="img" src={defaultNFT} width="150" height="150"></img>
            <span>{text}</span>
            <span>{level}</span>
        </CardWrapper>
    )
}

export default observer(NFTComponents)