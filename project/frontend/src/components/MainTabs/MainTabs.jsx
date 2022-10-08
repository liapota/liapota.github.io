import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import { MainTabsWrapper, Tab, Tabs, TabsWrapper } from "./MainTabs.styles";

const MainTabs = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <MainTabsWrapper>
        <TabsWrapper>
          <Tab active={0 === active} onClick={()=>setActive(0)}>МАГАЗИН</Tab>
          <Tab active={1 === active} onClick={()=>setActive(1)}>ЛЕНТА</Tab>
          <Tab active={2 === active} onClick={()=>setActive(2)}>ПРОФИЛЬ</Tab>
        </TabsWrapper>
      </MainTabsWrapper>
    </>
  );
};

export default observer(MainTabs);
