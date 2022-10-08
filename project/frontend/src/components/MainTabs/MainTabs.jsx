import React, { useState } from "react";

import { observer } from "mobx-react-lite";
import { MainTabsWrapper, Tab, Tabs, TabsWrapper } from "./MainTabs.styles";

const MainTabs = () => {
  const [activeText, setActiveText] = useState(["МАГАЗИН", "ПРОФИЛЬ", "ЛЕНТА"]);

  const leftTabHandler = () => {
    var array = activeText.slice();
    var el = array.pop();
    array.unshift(el);
    setActiveText(array);
  };

  const rightTabHandler = () => {
    var array = activeText.slice();
    var el = array.shift();
    array.push(el);
    setActiveText(array);
  };

  return (
    <>
      <MainTabsWrapper>
        <TabsWrapper>
          <Tab onClick={leftTabHandler}>{activeText[0]}</Tab>
          <Tab active>{activeText[1]}</Tab>
          <Tab onClick={rightTabHandler}>{activeText[2]}</Tab>
        </TabsWrapper>
      </MainTabsWrapper>
    </>
  );
};

export default observer(MainTabs);
