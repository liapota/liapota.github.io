import styled from "styled-components";

export const ShopProductWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 220px;
  max-height: 220px;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`;
export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  :hover {
    .img-text {
      display: inline;
    }
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const ImageText = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  background-color: white;
  opacity: 0.3;
  display: none;
  border-radius: 10px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  padding: 20px;
`;

export const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 150px;
  margin-bottom: 5px;
`;

export const ProductDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ProductTitle = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  color: #092896;
`;

export const ProductPrice = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 24px;
  color: #00abff;
  text-align: end;
`;
