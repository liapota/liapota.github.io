import React from "react";

import { observer } from "mobx-react-lite";
import {
  ButtonWrapper,
  CreateEventButton,
  EventCardsWrapper,
  EventsWrapper,
} from "./Events.styles";
import EventCard from "./EventCard";

const Events = () => {
  return (
    <EventsWrapper>
        <ButtonWrapper>
          <CreateEventButton>Создать событие</CreateEventButton>
        </ButtonWrapper>
        <EventCardsWrapper>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </EventCardsWrapper>
      </EventsWrapper>
  );
};

export default observer(Events);
