import React from "react";

import { observer } from "mobx-react-lite";
import {
  AgreeButton,
  DescriptionEvent,
  EventCardWrapper,
  ImgEvent,
  ImgWrapper,
  TitleEvent,
} from "./EventCard.styles";
import Img from "../../../../../img/event.png";

const UsersBar = () => {
  return (
    <EventCardWrapper>
      <ImgWrapper>
        <ImgEvent src={Img} alt="" />
        <AgreeButton className="agree-btn">Участвовать</AgreeButton>
      </ImgWrapper>
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
