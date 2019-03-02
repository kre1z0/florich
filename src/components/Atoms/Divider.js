import styled from "styled-components";

export const Divider = styled("div")`
  display: none;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: 92px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme: { palette } }) => palette.elementDeep};
  @media (max-width: 767px) and (orientation: portrait), (max-width: 812px) and (orientation: landscape) {
    display: block;
  }
`;
