import styled from "styled-components";

export const AboutContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  min-width: 1400px;
  min-height: 1000px;

  box-shadow: -2px 2px 5px grey;
  border-radius: 10px;
  left: 100;
  font-size: 14px;

  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 30px;

  .title {
    max-width: 300px;
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
    max-width: 600px;
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
