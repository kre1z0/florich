import React from "react";
import Bowser from "bowser";

import chartDesktop from "./chart-desktop.svg";
import chartMobile from "./chart-mobile.svg";
import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import {  DialogActions } from "../../components/Atoms/Dialog";
import { DialogContent, RaisedButton, Link, ChartTitle, Chart, Dialog, DialogTitle } from "./styled";

export const InfoDialog = ({ isOpen, onCloseRequest, onSwiped }) => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const { parsedResult } = browser;
  const { platform } = parsedResult;
  const isMobile = platform.type === "mobile";

  return (
    <Dialog maxWidth="624px" onCloseRequest={onCloseRequest} isOpen={isOpen}>
      <Swiper onSwiped={onSwiped}>
        <DialogTitle>
          <Divider />
          Как москвичи покупают цветы к 8 марта?
        </DialogTitle>
        <DialogContent>
          Спрос на цветы к 8 марта в Москве возрастает почти на 400%. Оценка проведена по данным
          поисковых запросов пользователей 2ГИС за 2018 г. Больше всего людей ищут "где купить
          цветы" в центре города, в районе метро Белорусская, Пушкинская, Лубянка, Охотный ряд и
          Третьяковская, а также возле метро и вокзалов.
          <ChartTitle>Рост потенциального спроса на цветы (% к 1 марта)</ChartTitle>
          <Chart src={isMobile ? chartMobile : chartDesktop} alt="chart" />
          {/*<Link primary href="http://blog1molodogo2papito.blogspot.com/" target="_blank">*/}
          {/*Читать статью*/}
          {/*</Link>*/}
        </DialogContent>
        <DialogActions>
          <RaisedButton primary onClick={onCloseRequest}>
            ok
          </RaisedButton>
        </DialogActions>
      </Swiper>
    </Dialog>
  );
};
