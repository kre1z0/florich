import styled from "styled-components";

export const StaticLegendContainer = styled("div")`
  padding: 10px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  svg {
    margin-right: 16px;
    transition: fill 144ms ease;
    &:last-of-type {
      margin-right: 0;
    }
  }
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    display: ${({ disabled }) => (disabled ? "none" : "flex")};
  }
`;

export const Label = styled("div")`
  padding-top: 10px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
`;

export const Circle = styled("div")`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 16px;
  transition: background-color 144ms ease;
  background-color: ${({ theme: { palette }, disabled }) =>
    disabled ? palette.iconDisabled : "rgba(142, 0, 255, 0.6)"};
`;
