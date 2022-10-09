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
        {/* TODO {members.map((user, index) => {
          return (
            <UserButton 
              onClick={() => handleClick(index)}
              key={user.id}
              name={user.name}
              surname={user.surname}
            ></UserButton>
          )

        })} */}
        <UserButton 
              onClick={() => handleClick(1)}
              key={1}
              name="Peter"
              surname='Parker'
            ></UserButton>
            <UserButton 
              onClick={() => handleClick(2)}
              key={1}
              name="Jhon"
              surname='Cena'
            ></UserButton>
            <UserButton 
              onClick={() => handleClick(3)}
              key={1}
              name="Sylvester"
              surname='Stallone'
            ></UserButton>
            <UserButton 
              onClick={() => handleClick(4)}
              key={1}
              name="Jason"
              surname='Statham'
            ></UserButton>
      </UsersWrapper>
    </UsersBarWrapper>
  );
};

export default observer(UsersBar);
