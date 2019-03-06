import React from "react";

import { FlowerIcon20, FlowerIcon32 } from "../../components/SvgIcons/FlowerIcon";
import { StaticLegendContainer, Label, Circle } from "./styled";

export const StaticLegend = ({ disabled }) => {
  return (
    <StaticLegendContainer disabled={disabled}>
      <Circle disabled={disabled} />
      <FlowerIcon20 disabled={disabled} />
      <FlowerIcon32 disabled={disabled} />
      <Label>Чем выше спрос рядом с магазином цветов, тем больше цветочек</Label>
    </StaticLegendContainer>
  );
};
