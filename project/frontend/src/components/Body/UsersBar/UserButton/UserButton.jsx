import React from "react";

import { observer } from "mobx-react-lite";
import { CustomImg, PersonData, UserButtonWrapper } from "./UserButton.styles";
import faceSvg from "../../../../img/face.svg";
import user1 from "../../../../img/user1.png";
import user2 from "../../../../img/user2.png";
import user3 from "../../../../img/user3.png";
import user4 from "../../../../img/user4.png";
import user5 from "../../../../img/user5.png";
import user6 from "../../../../img/user6.png";

const UserButton = ({ onClick, name, surname }) => {
  const usersLogo = [faceSvg, user1, user2, user3, user4, user5, user6];
  const randomLogo = (arr) => {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}
  return (
    <UserButtonWrapper onClick={onClick}>
      <CustomImg src={randomLogo(usersLogo)} alt="" />
      <PersonData>{name}</PersonData>
      <PersonData>{surname}</PersonData>
    </UserButtonWrapper>
  );
};

export default observer(UserButton);
