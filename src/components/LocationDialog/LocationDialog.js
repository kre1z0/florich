import React from "react";
import { RaisedButton } from "@evergis/ui";

import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import { Dialog, DialogTitle } from "../../components/Atoms/Dialog";
import { DialogContent, DialogActions } from "./styled";

export const LocationDialog = ({ isOpen, onCloseRequest, onEnableGeolocation, onSwiped }) => (
  <Dialog maxWidth="440px" onCloseRequest={onCloseRequest} isOpen={isOpen}>
    <Swiper onSwiped={onSwiped}>
      <DialogTitle>
        <Divider />
        Не можем вас найти
      </DialogTitle>
      <DialogContent>
        Чтобы определить свое местоположение,
        <br />
        включите геолокацию
      </DialogContent>
      <DialogActions>
        <RaisedButton primary onClick={onEnableGeolocation}>
          ok
        </RaisedButton>
      </DialogActions>
    </Swiper>
  </Dialog>
);
