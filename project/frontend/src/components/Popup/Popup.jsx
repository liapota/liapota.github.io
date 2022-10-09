import React from "react";

import { observer } from "mobx-react-lite";
import { 
    PopupWrapper,
    PopupHeader,
    PopupMain,
    PopupFooter
 } from "./Popup.styles";
 import { useStore } from "../../store";
 import chest from "../../img/chest";

const Popup = ({showPopup}) => {
  
  return (
    showPopup && (
        <PopupWrapper>
            <PopupHeader>
                <span>Чё-та</span>
                <img src={chest}></img>
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
