import styled from "styled-components";

export const LicenseContainer = styled("div")`
  z-index: 4;
  position: absolute;
  bottom: 4px;
  right: 4px;
  height: 16px;
  a {
    display: inline-block;
    height: 16px;
    text-decoration: none;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const Logo = styled(`img`)`
  width: auto;
  height: 16px;
`;
