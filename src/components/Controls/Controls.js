import React from "react";

import { ButtonZoomIn, ButtonZoomOut, ButtonLocation, ButtonInfo } from "./styled";

export const Controls = ({ onZoom, goToLocation, openInfoDialog }) => {
  return (
    <>
      <ButtonInfo kind={"info"} onClick={openInfoDialog} />
      <ButtonZoomIn kind={"plus"} onClick={() => onZoom(1)} />
      <ButtonZoomOut kind={"minus"} onClick={() => onZoom(-1)} />
      <ButtonLocation kind={"location-coordinate"} onClick={goToLocation} />
    </>
  );
};
