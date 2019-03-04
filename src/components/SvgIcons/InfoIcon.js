import React from "react";

import { SvgIcon } from "./SvgIcon";

export const InfoIcon = props => {
  return (
    <SvgIcon width="4" height="16" viewBox="0 0 4 16" {...props}>
      <path d="M1 4h2a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1M3 16H1a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1" />
    </SvgIcon>
  );
};
