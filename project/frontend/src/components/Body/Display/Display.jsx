import React from "react";

import { observer } from "mobx-react-lite";
import { DisplayWrapper } from "./Display.styles";
import Events from "./Events";
import Shop from "./Shop";
import Profile from "./Profile";
import { useStore } from "../../../store";

const Display = () => {
  const store = useStore();
  const { globalStore } = store;
  const { tabs } = globalStore;
  const activeIndex = tabs.findIndex((tab) => tab.active);
  return (
    <DisplayWrapper>
      {activeIndex === 0 && 
        <Shop/>

      }
      {
        activeIndex === 1 && 
        <Profile />
      }
      {
        activeIndex === 2 &&
      <Events />

      }
    </DisplayWrapper>
  );
};

export default observer(Display);
