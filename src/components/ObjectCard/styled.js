import styled from "styled-components";
import {
  H3,
  Blank,
  FieldValue as FieldValueUI,
  PaginationSimple as PaginationSimpleUI,
  IconButton as IconButtonUI
} from "@evergis/ui";
import { getHeaderColorByWeight } from "./getHeaderColorByWeight";

export const CardContainer = styled(Blank)`
  max-width: 393px;
  width: 100%;
  position: absolute;
  z-index: 5;
  top: 15px;
  left: 15px;
  flex-direction: column;
  transition: opacity 144ms ease;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  border-radius: 4px;
  max-height: 100%;
  overflow-y: overlay;
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    border-radius: 4px 4px 0 0;
    width: 100%;
    max-width: none;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const Header = styled("div")`
  display: flex;
  padding: 10px 10px 20px 20px;
  background-color: ${({ weight }) => getHeaderColorByWeight(weight)};
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    padding-top: 48px;
  }
`;

export const Title = styled("div")`
  margin: 0;
  flex-grow: 1;
`;

export const MainTitle = styled(H3)`
  margin: 6px 0;
`;

export const SubTitle = styled("div")`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

export const Strong = styled("strong")`
  padding-top: 4px;
  color: #fff;
  font-weight: 600;
  display: block;
`;

export const Content = styled("div")`
  padding: 20px;
`;

export const FieldValue = styled(FieldValueUI)`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 20px;
  > span:first-of-type {
    display: block;
  }
`;

export const PaginationSimple = styled(PaginationSimpleUI)`
  align-self: flex-start;
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    position: absolute;
    top: 5px;
    left: 12px;
  }
`;

const Button = styled(IconButtonUI)`
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    top: 6px;
    position: absolute;
  }
`;

export const ZoomToButton = styled(Button)`
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    right: 46px;
  }
`;

export const CloseButton = styled(Button)`
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    right: 12px;
  }
`;
