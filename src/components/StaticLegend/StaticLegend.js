import React from "react";

import { FlowerIcon } from "../../components/SvgIcons/FlowerIcon";
import { StaticLegendContainer, Label } from "./styled";

const legend = [
  {
    width: 14,
    height: 16
  },
  {
    width: 21,
    height: 24
  },
  {
    width: 28,
    height: 32
  }
];

export const StaticLegend = () => {
  return (
    <StaticLegendContainer>
      {legend.map(({ width, height }, index) => (
        <FlowerIcon key={`static-legend-item-${index}`} width={width} height={height} />
      ))}
      <Label>Интерес покупателей вблизи</Label>
    </StaticLegendContainer>
  );
};
