import styled from "styled-components";

export const UsersBarWrapper = styled.div`
  position: sticky;
  top: 60px;
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: white;
  border-radius: 10px;

  min-height: 500px;
  max-width: 250px;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const UsersWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CustomInput = styled.input`
  width: 100%;
  height: 100%;
  max-width: 170px;
  min-height: 20px;
  border: none;
  border-bottom: 1px solid #b7c0dc;
  padding: 2px;
  color: #092896;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #b7c0dc;
    opacity: 1; /* Firefox */
  }
`;
