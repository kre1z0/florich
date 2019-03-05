import React from "react";
import { ThemeProvider, darkTheme } from "@evergis/ui";

import { Swiper } from "../../components/Swiper/Swiper";
import { Divider } from "../../components/Atoms/Divider";
import { OutsideLink } from "../OutsideLink/OutsideLink";
import { getScheduleValue } from "./getScheduleValue";
import { getWeightText } from "./getWeightText";
import {
  CardContainer,
  Header,
  MainTitle,
  Title,
  Content,
  PaginationSimple,
  ZoomToButton,
  CloseButton,
  SubTitle,
  FieldValue
} from "./styled";

export const ObjectCard = props => {
  const {
    isVisible,
    name,
    address,
    site,
    site_2gis,
    phone,
    zoomToFeature,
    onClose,
    currentPage,
    extent,
    work_time,
    pageCount,
    onPrevObject,
    onNextObject,
    weight
  } = props;

  return (
    <CardContainer isVisible={isVisible}>
      <Header>
        <Divider />
        <ThemeProvider theme={darkTheme}>
          <>
            <Title>
              {pageCount > 1 && (
                <PaginationSimple
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onPrev={onPrevObject}
                  onNext={onNextObject}
                />
              )}
              <MainTitle>{name}</MainTitle>
              <SubTitle>{getWeightText(weight)}</SubTitle>
            </Title>
            <ZoomToButton kind="zoom-to" onClick={() => zoomToFeature(extent)} />
            <CloseButton kind="close" onClick={onClose} />
          </>
        </ThemeProvider>
      </Header>
      <Content>
        <FieldValue field="Адрес" value={address} />
        <FieldValue field="Часы работы" value={getScheduleValue(work_time)} />
        {site && site !== "-" && (
          <FieldValue
            field="Сайт"
            value={
              <OutsideLink www href={site}>
                {site}
              </OutsideLink>
            }
          />
        )}
        {phone && phone !== "-" && <FieldValue field="Телефон" value={phone} />}
        {site_2gis && site_2gis !== "-" && (
          <OutsideLink href={site_2gis}>Смотреть на 2GIS</OutsideLink>
        )}
      </Content>
    </CardContainer>
  );
};
