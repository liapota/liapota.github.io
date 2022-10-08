import React from "react";

import { observer } from "mobx-react-lite";
import { Summary, UserSummaryWrapper } from "./UserSummary.styles";


const UserSummary = () => {
  

  
  return (
    <UserSummaryWrapper>

      <Summary>Пользователь</Summary>
    </UserSummaryWrapper>
  );
};

export default observer(UserSummary);
