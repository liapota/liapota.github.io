import styled from "styled-components";

export const ProfileTabsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ProfileTab = styled.button`
  cursor: pointer;
  flex: 1;
  width: 100%;
  height: 100%;
  max-height: 40px;
  background-color: aliceblue;
  text-align: center;
  border: solid 1px;
  border-radius: 10px;
  background-color: ${(props) => (props?.active ? "white" : "#B7C0DC")};
  color: ${(props) => (props?.active ? "#00ABFF" : "#092896")};
  min-height: ${(props) => (props?.active ? "50px" : "45px")};
  font-size: 20px;
  font-weight: 500;
`;

export const ProfileMain = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
`;

export const NFTWrapper = styled.div`
  display: flex;
`;

export const ProfileFeedStyles = styled.div`
  width: 100%:

`;
