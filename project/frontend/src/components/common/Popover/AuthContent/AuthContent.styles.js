import styled from "styled-components";

export const AuthContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  min-width: 1400px;
  min-height: 1000px;

  box-shadow: -2px 2px 5px grey;
  border-radius: 10px;
  font-size: 14px;

  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 30px;
`;

export const EnterWrapper = styled.div`
  cursor: pointer;
  width: 300px;
  height: 60px;
  background-color: aliceblue;
  display: flex;
  margin-top: 20px;
  align-items: center;
`;

export const UserLogoStyles = styled.div`
  max-width: 35px;
  width: 100%;
  max-height: 35px;
  height: 100%;
`;

export const UserName = styled.div`
`;

export const UserLogo = styled.img`
  border-radius: 50%;
`;
