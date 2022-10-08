import React from "react";

import { observer } from "mobx-react-lite";
import { CustomInput, UsersBarWrapper, UsersWrapper } from "./UsersBar.styles";
import { Title } from "../Body.styles";
import UserButton from "./UserButton";

const UsersBar = () => {
  return (
    <UsersBarWrapper>
      <Title>Пользователи</Title>
      <CustomInput placeholder="Поиск" type="text" />
      <UsersWrapper>
        <UserButton />
        <UserButton />
        <UserButton />
        <UserButton />
      </UsersWrapper>
    </UsersBarWrapper>
  );
};

export default observer(UsersBar);
