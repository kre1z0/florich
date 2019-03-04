import React from "react";
import { IconButton, ThemeProvider, darkTheme } from "@evergis/ui";

import { Divider } from "../../components/Atoms/Divider";
import { OutsideLink } from "../OutsideLink/OutsideLink";
import { getScheduleValue } from "./getScheduleValue";
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

const array = [
  [["10:00", "13:00"], ["14:00", "19:00"]],
  [["10:00", "13:00"], ["14:00", "19:00"]],
  [["10:00", "13:00"], ["14:00", "19:00"]],
  [["10:00", "13:00"], ["14:00", "19:00"]],
  [["10:00", "13:00"], ["19:00", "20:00"]],
  [[""]],
  [[""]]
];

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
    pageCount,
    onPrevObject,
    onNextObject
  } = props;

  return (
    <CardContainer isVisible={isVisible}>
      <Header>
        <Divider />
        <ThemeProvider theme={darkTheme}>
          <>
            <Title>
              <MainTitle>{name}</MainTitle>
              <SubTitle>Интерес покупателей на 20% выше среднего</SubTitle>
            </Title>
            {/*{pageCount > 1 && (*/}
            {/*<PaginationSimple*/}
            {/*currentPage={currentPage}*/}
            {/*pageCount={pageCount}*/}
            {/*onPrev={onPrevObject}*/}
            {/*onNext={onNextObject}*/}
            {/*/>*/}
            {/*)}*/}
            <ZoomToButton kind="zoom-to" onClick={() => zoomToFeature(extent)} />
            <CloseButton kind="close" onClick={onClose} />
          </>
        </ThemeProvider>
      </Header>
      <Content>
        <FieldValue field="Адрес" value={address} />
        <FieldValue field="Часы работы" value={getScheduleValue(array)} />
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
