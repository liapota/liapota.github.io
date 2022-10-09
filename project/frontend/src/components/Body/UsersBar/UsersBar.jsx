import React from "react";

import { observer } from "mobx-react-lite";
import { CustomInput, UsersBarWrapper, UsersWrapper } from "./UsersBar.styles";
import { Title } from "../Body.styles";
import UserButton from "./UserButton";
import { useStore } from "../../../store";

const UsersBar = () => {
  const { globalStore } = useStore();
  const { handleClick } = globalStore;
  const users = [
    {name: "Пупа" },
    {name: "Лупа" },
    {name: "Лупа" },
    {name: "Пупа" },
    {name: "Пупа" },
    {name: "Лупа" },

  ];


  return (
    <UsersBarWrapper>
      <Title>Пользователи</Title>
      <CustomInput placeholder="Поиск" type="text" />
      <UsersWrapper>
        {users.map((user, index) => {
          return (
            <UserButton 
              onClick={handleClick}
              key={index}
            >{user.name}</UserButton>
          )

        })}
      </UsersWrapper>
    </UsersBarWrapper>
  );
};

export default observer(UsersBar);
