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
import { useStore } from "../../../../../store";

const UsersBar = ({title, description, id}) => {
  const {timelineStore} = useStore();
  const { handleTry, is_member } = timelineStore;
  return (
    <EventCardWrapper>
      <ImgWrapper>
        <ImgEvent src={Img} alt="" />
        <AgreeButton className="agree-btn" onClick={() => handleTry(id)}>{is_member ? "Уже участвуешь" : "Участвовать"}</AgreeButton>
      </ImgWrapper>
      <TitleEvent>{title}</TitleEvent>
      <DescriptionEvent>
       {description}
      </DescriptionEvent>
    </EventCardWrapper>
  );
};

export default observer(UsersBar);
