import React from "react";

import twoGis from "./2-gis.svg";
import everpoint from "./ep.svg";
import { LicenseContainer, Logo } from "./styled";

export const License = () => {
  return (
    <LicenseContainer>
      <a href="http://www.everpoint.ru" target="_blank">
        <Logo src={everpoint} />
      </a>
      <a href="https://2gis.ru" target="_blank">
        <Logo src={twoGis} />
      </a>
    </LicenseContainer>
  );
};
