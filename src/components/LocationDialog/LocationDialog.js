import React from "react";
import { RaisedButton } from "@evergis/ui";

import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import { Dialog, DialogTitle, DialogActions } from "../../components/Atoms/Dialog";
import { DialogContent, FlatButton } from "./styled";

export const LocationDialog = ({ isOpen, onCloseRequest, onEnableGeolocation, onSwiped }) => (
  <Dialog maxWidth="560px" onCloseRequest={onCloseRequest} isOpen={isOpen}>
    <Swiper onSwiped={onSwiped}>
      <DialogTitle>
        <Divider />
        Не можем вас найти
      </DialogTitle>
      <DialogContent>
        Чтобы определить свое местоположение,
        <br />
        включите геолокацию и перезагрузите страницу
      </DialogContent>
      <DialogActions>
        <FlatButton onClick={onCloseRequest}>нет, cпасибо</FlatButton>
        <RaisedButton primary onClick={onEnableGeolocation}>
          включить
        </RaisedButton>
      </DialogActions>
    </Swiper>
  </Dialog>
);
