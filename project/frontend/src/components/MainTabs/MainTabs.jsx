import React from "react";

import { observer } from "mobx-react-lite";
import { MainTabsWrapper } from "./MainTabs.styles";

const MainTabs = () => {
  return (
    <>
      <MainTabsWrapper>
        <div>Главные переключатели</div>
      </MainTabsWrapper>
    </>
  );
};

export default observer(MainTabs);
