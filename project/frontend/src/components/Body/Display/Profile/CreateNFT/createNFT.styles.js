import styled from "styled-components";

export const CreateProductWrapper = styled.div`
  width: 240px;
  height: 210px;
  background: #FFFFFF;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  margin: 20px;
  padding: 10px;
  :hover {
    .img-text {
      background-color: #00abff;
      color: white;
      opacity: 1;
    }
    background-color: #00abff;
  }
`;

export const ImageText = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  opacity: 0.8;
  border-radius: 10px;
  font-size: 80px;
  font-weight: 600;
  text-align: center;
  padding: 20px;
`;
