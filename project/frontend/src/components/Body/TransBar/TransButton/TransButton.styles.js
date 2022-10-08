import styled from "styled-components";

export const TransButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  :hover {
    .desc{
        display: inline;
    }
  }
  cursor: pointer;
`;
export const TransButtonLineWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  max-height: 30px;
  max-width: 250px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
`;

export const Direction = styled.span``;

export const TransImg = styled.img`
  max-width: 30px;
`;

export const Description = styled.div`
  display: none;
  font-size: 13px;
  color: #b7c0dc;
  
`;
