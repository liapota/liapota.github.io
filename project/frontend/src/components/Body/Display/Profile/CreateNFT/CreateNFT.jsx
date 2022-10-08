import React from "react";

import { observer } from "mobx-react-lite";
import {
  CreateProductWrapper,
  ImageText,
} from "./createNFT.styles";

const CreateNFT = () => {
  return (
    <CreateProductWrapper>
        <ImageText className="img-text">+</ImageText>
    </CreateProductWrapper>
  );
};

export default observer(CreateNFT);
