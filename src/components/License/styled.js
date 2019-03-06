import styled from "styled-components";

export const LicenseContainer = styled("div")`
  z-index: 4;
  position: absolute;
  bottom: 4px;
  right: 4px;
  height: 20px;
  a {
    display: inline-block;
    text-decoration: none;
    height: 20px;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export const Logo = styled(`img`)`
  width: auto;
  height: 20px;
`;
