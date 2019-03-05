import styled from "styled-components";
import { RaisedButton as RaisedButtonUI, H3 } from "@evergis/ui";
import { Dialog as DialogUI, DialogTitle as DialogTitleUI } from "../../components/Atoms/Dialog";

import bg from "./bg.svg";
import { DialogContent as DialogContentUI } from "../../components/Atoms/Dialog";
import { Link as LinkUI } from "../OutsideLink/OutsideLink";

export const DialogContent = styled(DialogContentUI)`
  flex-direction: column;
  margin-bottom: 5px;
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    margin-bottom: 0;
  }
`;

export const RaisedButton = styled(RaisedButtonUI)`
  margin-left: auto;
`;

export const Link = styled(LinkUI)`
  margin-top: 10px;
`;

export const ChartTitle = styled(H3)``;

export const Chart = styled("img")`
  width: 100%;
  height: auto;
`;

export const DialogTitle = styled(DialogTitleUI)`
  background-color: transparent;
`;

export const Dialog = styled(DialogUI)`
  background: #fff url(${bg});
  background-position: top right;
  background-size: 226px;
  background-repeat: no-repeat;
`;
