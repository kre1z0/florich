import React from "react";
import styled from "styled-components";

export const Svg = styled("svg")``;

export const SvgIcon = ({ children, ...props }) => {
  return <Svg {...props}>{children}</Svg>;
};
