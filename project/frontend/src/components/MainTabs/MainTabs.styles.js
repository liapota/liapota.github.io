import styled from "styled-components";

export const MainTabsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  max-height: 75px;
`;

export const TabsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  max-width: 820px;
  background-color: aliceblue;
`;

export const Tab = styled.div`
cursor: pointer;
  border-radius: 10px;
  height: 100%;
  align-items: center;
  width: 100%;
  background-color: #b7c0dc;
  text-align: center;

  background-color: ${(props) => (props?.active ? "white" : "#B7C0DC")};
  color: ${(props) => (props?.active ? "#00ABFF" : "#092896")};
  min-height: ${(props) => (props?.active ? "70px" : "60px")};
  font-size: ${(props) => (props?.active ? "36px" : "32px")};
  font-weight: ${(props) => (props?.active ? "500" : "600")};
`;
