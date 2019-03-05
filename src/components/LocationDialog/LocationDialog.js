import React from "react";
import { RaisedButton } from "@evergis/ui";

import { Divider } from "../../components/Atoms/Divider";
import { Dialog, DialogTitle, DialogActions } from "../../components/Atoms/Dialog";
import { DialogContent, FlatButton } from "./styled";

export const LocationDialog = ({ isOpen, onCloseRequest, onEnableGeolocation }) => (
  <Dialog maxWidth="560px" onCloseRequest={onCloseRequest} isOpen={isOpen}>
    <DialogTitle>
      <Divider />
      Не можем вас найти
    </DialogTitle>
    <DialogContent>
      Чтобы определить свое местоположение,
      <br />
      ключите геолокацию и перезагрузите страницу
    </DialogContent>
    <DialogActions>
      <FlatButton onClick={onCloseRequest}>нет, cпасибо</FlatButton>
      <RaisedButton primary onClick={onEnableGeolocation}>
        включить
      </RaisedButton>
    </DialogActions>
  </Dialog>
);