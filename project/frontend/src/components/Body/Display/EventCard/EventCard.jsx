import React from "react";

import { observer } from "mobx-react-lite";
import {
  DescriptionEvent,
  EventCardWrapper,
  ImgEvent,
  TitleEvent,
} from "./EventCard.styles";
import Img from "../../../../img/event.png";

const UsersBar = () => {
  return (
    <EventCardWrapper>
      <ImgEvent src={Img} alt="" />
      <TitleEvent>Заголовок</TitleEvent>
      <DescriptionEvent>
        Давно выяснено, что при оценке дизайна и композиции читаемый текст
        мешает сосредоточиться. Lorem Ipsum используют потому, что тот
        обеспечивает более или менее стандартное заполнение шаблона, а также
        реальное распределение букв и пробелов в абзацах, которое{" "}
      </DescriptionEvent>
    </EventCardWrapper>
  );
};

export default observer(UsersBar);
