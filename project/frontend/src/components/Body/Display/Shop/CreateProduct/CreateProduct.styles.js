import styled from "styled-components";

export const CreateProductWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 160px;
  min-height: 190px;
  max-width: 220px;
  max-height: 220px;
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  justify-content: center;
  :hover{
      .img-text{
          background-color: #00ABFF;
          color: white;
          opacity: 1;
      }
      background-color: #00ABFF;
  }
`;


export const ImageText = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  background-color: white;
  opacity: 0.8;
  border-radius: 10px;
  font-size: 80px;
  font-weight: 600;
  text-align: center;
  padding: 20px;
`;

