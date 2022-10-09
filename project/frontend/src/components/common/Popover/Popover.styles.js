import styled from "styled-components";

export const PopoverWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  max-height: 600px;
  height: 100%;
  box-shadow: -2px 2px 5px grey;
  border-radius: 10px;
left:100;
  font-size: 14px;

  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 30px;

  .title {
    font-size: 30px;
  }

  .sub-title {
    color: #00abff;
    font-size: 22px;
    margin-bottom: 10px;
  }

  .desc {
    font-size: 18px;
    text-align: justify;
  }
  .desc-p {
    font-size: 18px;
    text-align: center;
    color: #dcbb09;
  }
  .sub-desc {
    color: #b7c0dc;
    font-size: 10px;
  }
  .click {
    margin-top: 10px;
    font-size: 30px;
    color: gold;
  }
`;
