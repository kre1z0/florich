import React from "react";

import { SvgIcon } from "./SvgIcon";

export const LocationIcon = props => {
  return (
    <SvgIcon width="16" height="16" viewBox="0 0 16 16" {...props}>
      <path
        fill="#FF64A4"
        fillOpacity=".85"
        fillRule="evenodd"
        d="M.033.435L7.415 15.2a.2.2 0 0 0 .368-.027l1.689-5.067c.1-.299.334-.533.633-.633l5.068-1.689a.2.2 0 0 0 .026-.369L.435.034a.3.3 0 0 0-.402.401"
      />
    </SvgIcon>
  );
};
