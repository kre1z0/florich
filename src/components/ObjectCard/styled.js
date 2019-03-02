import styled from "styled-components";
import { H3, Blank, FieldValue as FieldValueUI, PaginationSimple as PaginationSimpleUI } from "@evergis/ui";

export const CardContainer = styled(Blank)`
  max-width: 393px;
  width: 100%;
  position: absolute;
  z-index: 4;
  top: 15px;
  left: 15px;
  flex-direction: column;
  transition: opacity 144ms ease;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
`;

export const Header = styled("div")`
  display: flex;
  padding: 20px;
  background-color: ${({ theme: { palette } }) => palette.primary};
`;

export const Title = styled("div")`
  margin: 0;
  flex-grow: 1;
`;

export const MainTitle = styled(H3)`
  margin: 0 0 10px 0;
`;

export const SubTitle = styled("div")`
  font-size: 12px;
  color: ${({ theme: { palette } }) => palette.textSecondary};
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
`;
