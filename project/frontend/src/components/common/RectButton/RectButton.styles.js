import styled from "styled-components";

export const RectButtonWrapper = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 0px;
  max-width: ${(props) => (props.maxwidth ? props.maxwidth : "240px")};
  min-width: ${(props) => (props.minwidth ? props.minwidth : "none")};
  .btn-rect {
    width: 100%;
    height: 58px;
    border-radius: 5px;
    background-color: ${(props) => (props.fill ? "#0094FF" : "#F8F8F8")};
    color: ${(props) => (props.fill ? "#F8F8F8" : "#0094FF")};
    border: none;
    :hover {
      transition: all 0.1s ease-in-out;
      transform: scale(1.02);
    }
  }
`;
