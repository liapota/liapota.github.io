import React from "react";

import { observer } from "mobx-react-lite";
import { CustomImg, PersonData, UserButtonWrapper } from "./UserButton.styles";
import faceSvg from "../../../../img/face.svg";

const UserButton = ({ onClick }) => {
  return (
    <UserButtonWrapper onClick={onClick}>
      <CustomImg src={faceSvg} alt="" />
      <PersonData>Name</PersonData>
      <PersonData>Surname</PersonData>
    </UserButtonWrapper>
  );
};

export default observer(UserButton);
