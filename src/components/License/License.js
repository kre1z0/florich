import React from "react";

import { LicenseContainer } from "./styled";

export const License = () => {
  return (
    <LicenseContainer>
      Работает на API{" "}
      <a href="http://www.everpoint.ru/#&panel1-1" target="_blank">
        EverGIS
      </a>{" "}
      | Данные предоставлены{" "}
      <a href="https://2gis.ru" target="_blank">
        2GIS
      </a>
    </LicenseContainer>
  );
};
