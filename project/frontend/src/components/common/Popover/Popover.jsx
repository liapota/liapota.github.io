import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { PopoverWrapper } from "./Popover.styles";

const Popover = (props) => {
  return (
    <PopoverWrapper
      {...props}
      style={{
        ...props.style,
        marginTop: props.marginTop,
        position: "absolute",
        backgroundColor: "white",
        zIndex: 10,
      }}
      onClick={props.close}
    >
      <div className="title">Привет!</div>

      <div className="sub-title">Участники команды</div>
      <div className="desc-p">Зайцев Александр</div>
      <div className="sub-desc">капитан</div>
      <div className="desc-p">Хныкина Маруся</div>
      <div className="sub-desc">дизайнер и реальный юзер</div>
      <div className="desc-p">Троицкая Полина</div>
      <div className="sub-desc">фронтендер</div>
      <div className="desc-p">Гречаниченко Максим</div>
      <div className="sub-desc">бэкендер</div>
      <div className="desc-p">Бурачек Эдуард</div>
      <div className="sub-desc">бэкендер</div>

      <div className="sub-title">Наша цель</div>
      <div className="desc">
        Создать удобное пространство для самовыражения, обмена хорошим
        настроеним и взаимодействия с культурной средой компании
      </div>

      <div className="sub-title">Блокчейн в нашем проекте:</div>
      <div className="desc">
        Это сердце пространства, которое ежедневно одаривает пользователей монетами,
        часть из которых конвертируется в опыт, позволяя получить максимум
        бонусов от компании. Остальные монеты сотрудник может обменять на
        мерчевые вещи в Вендомате или поделиться ими с другом. Также в
        пространстве реализовано создание и обмен NFT, что позволит каждому
        сотруднику самовыразиться и развлечься
      </div>
      
      <div className="click">Click!</div>
    </PopoverWrapper>
  );
};

export default observer(Popover);
