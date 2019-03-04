import styled from "styled-components";

export const StaticLegendContainer = styled("div")`
  padding: 10px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  svg {
    margin-right: 16px;
    fill: ${({ theme: { palette } }) => palette.primary};
  }
`;

export const Label = styled("div")`
  padding-top: 10px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
`;
