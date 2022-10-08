import styled from "styled-components";

export const EventsWrapper = styled.div`
  padding: 20px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
`;

export const EventCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const CreateEventButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 100%;
  max-width: 100px;

  max-height: 40px;
  font-weight: 500;
  font-size: 13px;
  text-align: center;
  color: #b7c0dc;
  background-color: transparent;
  border: 1px solid #b7c0dc;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
