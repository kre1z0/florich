import styled from "styled-components";

import { IconButton } from "../../components/Controls/styled";

export const MapWrapper = styled("div")`
  width: 100%;
  height: 100%;
`;

export const FilterButton = styled(IconButton)`
  width: 64px;
  height: 64px;
  position: absolute;
  z-index: 4;
  top: 15px;
  left: 15px;
  background-color: ${({ theme: { palette } }) => palette.primary};
  > span {
    &:after {
      content: "";
    }
  }
  svg {
    width: 21px;
    height: 24px;
    fill: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    bottom: 14px;
  }
`;
