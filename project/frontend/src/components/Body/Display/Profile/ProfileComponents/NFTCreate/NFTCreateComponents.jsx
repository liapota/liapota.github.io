import React from "react";
import { observer } from "mobx-react-lite";
import { CardWrapper } from "../NFTComponents.styes"
import createNFTLogo from "../../../../../../img/create-nft-logo.svg"


const NFTComponentsCreate = () => {
    return (
        <CardWrapper>
            <img src={createNFTLogo} width="150" height="150"></img>
            <span>СОЗДАТЬ NFT</span>
        </CardWrapper>
    )

}

export default observer(NFTComponentsCreate)