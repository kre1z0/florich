import React from "react";
import { IconButton, ThemeProvider, darkTheme } from "@evergis/ui";

import { OutsideLink } from "../OutsideLink/OutsideLink";
import { CardContainer, Header, MainTitle, Title, Content, PaginationSimple, SubTitle, FieldValue } from "./styled";

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
            <IconButton kind="zoom-to" onClick={() => zoomToFeature(extent)} />
            <IconButton kind="close" onClick={onClose} />
          </>
        </ThemeProvider>
      </Header>
      <Content>
        <FieldValue field="Адрес" value={address} />
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
        {site_2gis && site_2gis !== "-" && <OutsideLink href={site_2gis}>Смотреть на 2GIS</OutsideLink>}
      </Content>
    </CardContainer>
  );
};
