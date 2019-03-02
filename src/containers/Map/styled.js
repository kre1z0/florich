import styled from "styled-components";

import { IconButton } from "../../components/Controls/styled";

export const MapWrapper = styled("div")`
  width: 100%;
  height: 100%;
`;

export const FilterButton = styled(IconButton)`
  position: absolute;
  z-index: 4;
  top: 15px;
  left: 15px;
  @media (max-width: 767px) and (orientation: portrait), (max-width: 812px) and (orientation: landscape) {
    top: auto;
    left: auto;
    right: 10px;
    bottom: 10px;
  }
`;
