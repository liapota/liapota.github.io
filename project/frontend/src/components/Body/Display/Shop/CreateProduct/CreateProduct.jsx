import React from "react";

import { observer } from "mobx-react-lite";
import {
  CreateProductWrapper,
  ImageText,
} from "./CreateProduct.styles";

const CreateProduct = () => {
  return (
    <CreateProductWrapper>
        <ImageText className="img-text">+</ImageText>
    </CreateProductWrapper>
  );
};

export default observer(CreateProduct);
