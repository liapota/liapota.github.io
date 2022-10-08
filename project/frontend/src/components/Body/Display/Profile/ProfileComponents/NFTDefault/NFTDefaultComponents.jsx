import React from "react";
import { observer } from "mobx-react-lite";
import { CardWrapper } from "../NFTComponents.styes"
import defaultNFT from "../../../../../../img/defaultNFT.svg"

const NFTComponents = () => {
    return (
        <CardWrapper>
            <img src={defaultNFT} width="150" height="150"></img>
            <span>НАЗВАНИЕ NFT</span>
        </CardWrapper>
    )

}

export default observer(NFTComponents)