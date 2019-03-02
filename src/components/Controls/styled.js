import styled from "styled-components";
import { IconButton as IconButtonUi } from "@evergis/ui";

export const IconButton = styled(IconButtonUi)`
  width: 40px;
  height: 40px;
  top: 25px;
  right: 25px;
  position: absolute;
  z-index: 4;
  border-radius: 50%;
  background-color: rgb(255, 255, 255, 1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 767px) and (orientation: portrait), (max-width: 812px) and (orientation: landscape) {
    top: 10px;
    right: 10px;
  }
`;

export const ButtonInfo = styled(IconButton)`
  @media (max-width: 767px) and (orientation: portrait), (max-width: 812px) and (orientation: landscape) {
    right: auto;
    left: 10px;
  }
`;

export const ButtonZoomIn = styled(IconButton)`
  transform: translateY(calc(100% + 30px));
  @media (max-width: 767px) and (orientation: portrait), (max-width: 812px) and (orientation: landscape) {
    transform: none;
  }
`;

export const ButtonZoomOut = styled(IconButton)`
  transform: translateY(calc(200% + 38px));
  @media (max-width: 767px) and (orientation: portrait), (max-width: 812px) and (orientation: landscape) {
    transform: translateY(calc(100% + 6px));
  }
`;

export const ButtonLocation = styled(IconButton)`
  transform: translateY(calc(300% + 68px));
  @media (max-width: 767px) and (orientation: portrait), (max-width: 812px) and (orientation: landscape) {
    transform: translateY(300%);
  }
`;
