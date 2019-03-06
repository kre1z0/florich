import React from "react";

import { Divider } from "../../components/Atoms/Divider";
import { StaticLegend } from "../../components/StaticLegend/StaticLegend";
import {
  FiltersContainer,
  Header,
  Title,
  CloseButton,
  Block,
  SecondBlock,
  Switch,
  Slider,
  Swiper
} from "./styled";

export const Filters = ({
  onFilterChange,
  onZoomToPoints,
  isVisible,
  onToggleFilters,
  dayWeek,
  interestByDay,
  flowerShops,
  onSwiped,
  onRefPanel
}) => (
  <FiltersContainer isVisible={isVisible}>
    <Swiper onSwiped={onSwiped} onRef={onRefPanel}>
      <Divider />
      <Block>
        <Header>
          <Title>Как растет спрос на цветы в преддверии праздника</Title>
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
      <SecondBlock>
        <Header>
          <Title>Самые популярные точки продаж цветов</Title>
          <Switch
            checked={flowerShops}
            onChange={() => onFilterChange(!flowerShops, "flowerShops")}
          />
        </Header>
        <StaticLegend disabled={!flowerShops} />
      </SecondBlock>
      <CloseButton kind="close" onClick={onToggleFilters} />
    </Swiper>
  </FiltersContainer>
);
