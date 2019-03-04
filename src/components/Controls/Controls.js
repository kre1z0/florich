import React from "react";

import { InfoIcon } from "../../components/SvgIcons/InfoIcon";
import { LocationIcon } from "../../components/SvgIcons/LocationIcon";
import { ButtonZoomIn, ButtonZoomOut, ButtonLocation, ButtonInfo } from "./styled";

export const Controls = ({ onZoom, goToLocation, openInfoDialog }) => {
  return (
    <>
      <ButtonInfo onClick={openInfoDialog}>
        <InfoIcon />
      </ButtonInfo>
      <ButtonZoomIn kind={"plus"} onClick={() => onZoom(1)} />
      <ButtonZoomOut kind={"minus"} onClick={() => onZoom(-1)} />
      <ButtonLocation onClick={goToLocation}>
        <LocationIcon />
      </ButtonLocation>
    </>
  );
};
