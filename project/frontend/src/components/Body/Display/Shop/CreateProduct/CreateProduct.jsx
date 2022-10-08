import React from "react";

import { observer } from "mobx-react-lite";
import {
  AgreeButton,
  CreateProductWrapper,
  ImageText,
  ImgWrapper,
  ProductDescriptionWrapper,
  ProductImg,
  ProductPrice,
  ProductTitle,
} from "./CreateProduct.styles";
import imgSrc from "../../../../../img/product.png";

const ShopProduct = () => {
  return (
    <CreateProductWrapper>
        <ImageText className="img-text">+</ImageText>
       
    </CreateProductWrapper>
  );
};

export default observer(ShopProduct);
