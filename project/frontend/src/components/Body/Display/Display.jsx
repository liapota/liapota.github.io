import React from "react";

import { observer } from "mobx-react-lite";
import { DisplayWrapper } from "./Display.styles";
import Events from "./Events";
import Shop from "./Shop";
import Profile from "./Profile";
import { useStore } from "../../../store";
import MainUserProfile from "../MainUserProfile";

const Display = () => {
  const store = useStore();
  const { globalStore } = store;
  const { tabs } = globalStore;
  const activeIndex = tabs.findIndex((tab) => tab.active);
  console.log(Boolean(!!activeIndex))
  return (
    <DisplayWrapper>
      {activeIndex === 0 && 
        <Shop/>
      }
      {
        activeIndex === 1 && 
        <Events />
      }
      {
        activeIndex === 2 &&
        <Profile />

      }
      {
        !activeIndex && 
        <MainUserProfile />

      }
    </DisplayWrapper>
  );
};

export default observer(Display);
