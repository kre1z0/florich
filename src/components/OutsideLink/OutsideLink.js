import React from "react";
import styled from "styled-components";

import { Link as LInkUI } from "@evergis/ui";

export const Link = styled(LInkUI)`
  &:visited {
    color: ${({ theme: { palette } }) => palette.primary};
  }
`;

const replaceHttp = site => {
  const protomatch = /^(https|http):\/\//; // NB: not '.*'
  const replaced = site.replace(protomatch, "");
  const hasWww = replaced.toString().indexOf("www") === 0;

  if (!hasWww) {
    return `www.${replaced}`;
  } else {
    return replaced;
  }
};

const getUrl = value => {
  if (!value) {
    return;
  }

  const isHttp = value.toString().indexOf("http") === 0;
  const isWww = value.toString().indexOf("www") === 0;

  return isWww || isHttp ? value : `https://${value}`;
};

export const OutsideLink = ({ href, children, www, ...props }) => (
  <Link href={getUrl(href)} target="_blank" rel="noopener noreferrer" {...props}>
    {www && typeof children === "string" ? replaceHttp(children) : children}
  </Link>
);
