import styled from "styled-components";

export const EventCardWrapper = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 500px;
  background-color: white;
  border: 1px solid #b7c0dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;

export const ImgEvent = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  max-width: 450px;
  max-height: 250px;
`;

export const TitleEvent = styled.div`
  text-align: start;
  font-weight: 600;
  font-size: 36px;
  color: #092896;
  width: 100%;
`;
export const DescriptionEvent = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #b7c0dc;
`;
