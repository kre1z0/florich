import React from "react";

import { Divider } from "../../components/Atoms/Divider";
import { StaticLegend } from "../../components/StaticLegend/StaticLegend";
import { FiltersContainer, Header, Title, CloseButton, Block, Switch, Slider } from "./styled";

export const Filters = ({
  value,
  onFilterChange,
  onZoomToPoints,
  isVisible,
  onToggleFilters,
  dayWeek,
  interestByDay,
  flowerShops
}) => (
  <FiltersContainer isVisible={isVisible}>
    <Divider />
    <Block>
      <Header>
        <Title>Интерес по дням</Title>
        <Switch
          checked={interestByDay}
          onChange={() => onFilterChange(!interestByDay, "interestByDay")}
        />
      </Header>
      <Slider
        isVisible={interestByDay}
        primary
        sliderWidth="100%"
        showTooltips={false}
        min={4}
        max={8}
        value={dayWeek}
        marks={[5, 6, 7, 8]}
        onChange={value => onFilterChange(value, "dayWeek")}
        disabled={!interestByDay}
      />
    </Block>
    <Block>
      <Header>
        <Title>Цветочные магазины</Title>
        <Switch
          checked={flowerShops}
          onChange={() => onFilterChange(!flowerShops, "flowerShops")}
        />
      </Header>
      <StaticLegend />
    </Block>
    <CloseButton kind="close" onClick={onToggleFilters} />
  </FiltersContainer>
);
