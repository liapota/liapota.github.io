import React from "react";

import { observer } from "mobx-react-lite";
import { DisplayWrapper, EventCardsWrapper } from "./Display.styles";
import EventCard from "./EventCard";


const UsersBar = () => {
  

  
  return (
    <DisplayWrapper>

      <EventCardsWrapper>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
      </EventCardsWrapper>
    </DisplayWrapper>
  );
};

export default observer(UsersBar);
