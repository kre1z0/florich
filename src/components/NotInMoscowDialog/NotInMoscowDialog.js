import React from "react";
import { RaisedButton } from "@evergis/ui";

import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import { Dialog, DialogTitle, DialogActions } from "../../components/Atoms/Dialog";
import { DialogContent } from "./styled";

export const NotInMoscowDialog = ({ isOpen, onCloseRequest, onSwiped }) => (
  <Dialog maxWidth="560px" onCloseRequest={onCloseRequest} isOpen={isOpen}>
    <Swiper onSwiped={onSwiped}>
      <DialogTitle>
        <Divider />
        Вы находитесь не в Москве
      </DialogTitle>
      <DialogContent>Кто рано встает, тот за МКАДом живет!</DialogContent>
      <DialogActions>
        <RaisedButton primary onClick={() => onCloseRequest()}>
          ок
        </RaisedButton>
      </DialogActions>
    </Swiper>
  </Dialog>
);
