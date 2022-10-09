import React from "react";

import { observer } from "mobx-react-lite";
import { CustomInput, UsersBarWrapper, UsersWrapper } from "./UsersBar.styles";
import { Title } from "../Body.styles";
import UserButton from "./UserButton";
import { useStore } from "../../../store";

const UsersBar = () => {
  const { globalStore, usersListStore } = useStore();
  const { handleClick } = globalStore;
  const { members } = usersListStore;

  return (
    <UsersBarWrapper>
      <Title>Пользователи</Title>
      <CustomInput placeholder="Поиск" type="text" />
      <UsersWrapper>
        {members.map((user, index) => {
          return (
            <UserButton 
              onClick={() => handleClick(index)}
              key={user.id}
              name={user.name}
              surname={user.surname}
            ></UserButton>
          )

        })}
      </UsersWrapper>
    </UsersBarWrapper>
  );
};

export default observer(UsersBar);
