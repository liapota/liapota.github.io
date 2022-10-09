import React from "react";

import { observer } from "mobx-react-lite";
import { 
    PopupWrapper,
    PopupHeader,
    PopupMain,
    PopupFooter
 } from "./Popup.styles";
 import { useStore } from "../../store";

const Popup = ({showPopup}) => {
  
  return (
    showPopup && (
        <PopupWrapper>
            <PopupHeader>

            </PopupHeader>
            <PopupMain>

            </PopupMain>
            <PopupFooter>

            </PopupFooter>
        </PopupWrapper>
    )
    
  );
};

export default observer(Popup);
