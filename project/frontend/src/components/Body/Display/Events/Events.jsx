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
  const { globalStore, timelineStore, userStore } = useStore();
  const { events, handleClick } = timelineStore;
  const { role } = userStore;
  return (
    <EventsWrapper>
      {role === 0 && (
        <ButtonWrapper>
          <CreateEventButton onClick={handleClick}>
            Создать событие
          </CreateEventButton>
        </ButtonWrapper>
      )}
      {/* <EventCardsWrapper>
          {events.map((event => {
            return (<EventCard 
              title={event.title}
              description={event.description}
              id={event.id}
              />)
          }))} */}
      <EventCardsWrapper>
        <EventCard
          title="Хакатон"
          description="Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое "
          id={0}
        />
        <EventCard
          title="Митап"
          description="Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое "
          id={0}
        />
      </EventCardsWrapper>
    </EventsWrapper>
  );
};

export default observer(Events);
