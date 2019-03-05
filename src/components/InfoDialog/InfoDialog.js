import React from "react";

import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import { Dialog, DialogTitle, DialogActions } from "../../components/Atoms/Dialog";
import { DialogContent, RaisedButton, Link } from "./styled";

export const InfoDialog = ({ isOpen, onCloseRequest, onSwiped }) => (
  <Dialog maxWidth="560px" onCloseRequest={onCloseRequest} isOpen={isOpen}>
    <Swiper onSwiped={onSwiped}>
      <DialogTitle>
        <Divider />
        Что это за карта?
      </DialogTitle>
      <DialogContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores excepturi explicabo
        facere fuga iure natus nihil, obcaecati placeat quibusdam suscipit temporibus vero voluptas.
        A blanditiis deleniti, harum nesciunt praesentium rerum!
        <Link primary href="http://blog1molodogo2papito.blogspot.com/" target="_blank">
          Читать статью
        </Link>
      </DialogContent>
      <DialogActions>
        <RaisedButton primary onClick={onCloseRequest}>
          ok
        </RaisedButton>
      </DialogActions>
    </Swiper>
  </Dialog>
);
