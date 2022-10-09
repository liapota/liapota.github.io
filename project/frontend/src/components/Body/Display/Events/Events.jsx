import React from "react";

import { observer } from "mobx-react-lite";
import {
  ButtonWrapper,
  CreateEventButton,
  EventCardsWrapper,
  EventsWrapper,
} from "./Events.styles";
import EventCard from "./EventCard";
import { useStore } from "../../../../store";

const Events = () => {
  const {globalStore, timelineStore, userStore} = useStore();
  const { events, handleClick } = timelineStore;
  const { role } = userStore;
  return (
    <EventsWrapper>
      {
        role === 0 &&
        <ButtonWrapper>
          <CreateEventButton onClick={handleClick}>Создать событие</CreateEventButton>
        </ButtonWrapper>
      }
        <EventCardsWrapper>
          {events.map((event => {
            return (<EventCard 
              title={event.title}
              description={event.description}
              id={event.id}
              />)
          }))}
        </EventCardsWrapper>
      </EventsWrapper>
  );
};

export default observer(Events);
