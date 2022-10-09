import React from "react";

import { observer } from "mobx-react-lite";
import {
  AgreeButton,
  ImageText,
  ImgWrapper,
  ProductDescriptionWrapper,
  ProductImg,
  ProductPrice,
  ProductTitle,
  ShopProductWrapper,
} from "./ShopProduct.styles";
import imgSrc from "../../../../../img/product.png";

const ShopProduct = (props) => {
  return (
    <ShopProductWrapper>
      <ImgWrapper>
        <ImageText className="img-text">КУПИТЬ</ImageText>
        <ProductImg src={imgSrc} alt="" />
      </ImgWrapper>

      <ProductDescriptionWrapper>
        <ProductTitle>{props.name}</ProductTitle>
        <ProductPrice>{props.price}</ProductPrice>
      </ProductDescriptionWrapper>
    </ShopProductWrapper>
  );
};

export default observer(ShopProduct);
