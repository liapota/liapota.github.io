import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import { MainTabsWrapper, Tab, Tabs, TabsWrapper } from "./MainTabs.styles";
import { useStore } from "../../store";

const MainTabs = () => {
  const { globalStore } = useStore();
  const { tabs, handleChange } = globalStore;

  return (
    <>
      <MainTabsWrapper>
        <TabsWrapper>
          {tabs.map((tab, index) => {
            return (
              <Tab 
                id={index}
                active={tab.active}
                onClick={()=>handleChange(index, "main")}>{tab.name}</Tab>
            )
          })}
        </TabsWrapper>
      </MainTabsWrapper>
    </>
  );
};

export default observer(MainTabs);
