import React, { useEffect, useRef } from "react";

import { observer } from "mobx-react-lite";
import UserSummary from "../UserSummary";
import MainTabs from "../MainTabs";
import Body from "../Body";
import { ContentWrapper } from "./Content.styles";
import { useStore } from "../../store";
import Popover from "../common/Popover";

const Content = () => {
  const { userStore, usersListStore, globalStore } = useStore();
  const { getUserHandler } = userStore;
  const { getUsersHandler } = usersListStore;
  const { isShowPopupAbout,setIsShowPopupAbout } = globalStore;
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isShowPopupAbout && ref.current && !ref.current.contains(e.target)) {
        setIsShowPopupAbout(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
console.log('show');
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isShowPopupAbout]);

  useEffect(() => {
    getUserHandler(1);
    getUsersHandler();
  }, []);

  return (
    <ContentWrapper>
      {isShowPopupAbout ? (
        <div ref={ref}>
          <Popover close={()=>setIsShowPopupAbout(false)}/>
        </div>
      ) : null}
      <UserSummary />
      <MainTabs />
      <Body />
    </ContentWrapper>
  );
};

export default observer(Content);
