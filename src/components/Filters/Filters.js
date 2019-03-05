import React from "react";

import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import { StaticLegend } from "../../components/StaticLegend/StaticLegend";
import { FiltersContainer, Header, Title, CloseButton, Block, Switch, Slider } from "./styled";

export const Filters = ({
  onFilterChange,
  onZoomToPoints,
  isVisible,
  onToggleFilters,
  dayWeek,
  interestByDay,
  flowerShops,
  onSwiped
}) => (
  <FiltersContainer isVisible={isVisible}>
    <Swiper onSwiped={onSwiped}>
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
          marks={[4, 5, 6, 7, 8]}
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
        <StaticLegend disabled={!flowerShops} />
      </Block>
      <CloseButton kind="close" onClick={onToggleFilters} />
    </Swiper>
  </FiltersContainer>
);
