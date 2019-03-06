import React from "react";
import { RaisedButton } from "@evergis/ui";

import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import { Dialog, DialogTitle } from "../../components/Atoms/Dialog";
import { DialogContent, DialogActions } from "./styled";

export const NotInMoscowDialog = ({ isOpen, onCloseRequest, onSwiped }) => (
  <Dialog maxWidth="560px" onCloseRequest={onCloseRequest} isOpen={isOpen}>
    <Swiper onSwiped={onSwiped}>
      <DialogTitle>
        <Divider />
        Мы определили, что вы не в Москве
      </DialogTitle>
      <DialogContent>
        На карте есть данные только для Москвы. Мы оставим вас там, где много цветов.
      </DialogContent>
      <DialogActions>
        <RaisedButton primary onClick={() => onCloseRequest()}>
          ок
        </RaisedButton>
      </DialogActions>
    </Swiper>
  </Dialog>
);
