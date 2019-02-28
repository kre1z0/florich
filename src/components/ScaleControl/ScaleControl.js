import React from "react";
import { IconButton } from "@evergis/ui";

import { ScaleRuler } from "./ScaleRuler";
import { ScaleControlContainer, ZoomLvl } from "./styled";

export const ScaleControl = ({ onZoom, resolution, zoomLvl }) => {
  console.info("--> zoomLvl ggwp 4444", zoomLvl);
  return (
    <ScaleControlContainer>
      <IconButton kind={"plus"} onClick={() => onZoom(1)} />
      <IconButton kind={"minus"} onClick={() => onZoom(-1)} />
      <ZoomLvl>{zoomLvl || 0}</ZoomLvl>
      <ScaleRuler resolution={resolution} />
    </ScaleControlContainer>
  );
};
