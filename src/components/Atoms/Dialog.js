import styled from "styled-components";

import {
  Dialog as DialogUI,
  DialogContent as DialogContentUI,
  DialogActions as DialogActionsUI,
  DialogTitle as DialogTitleUI
} from "@evergis/ui";

export const Dialog = styled(DialogUI)``;

export const DialogTitle = styled(DialogTitleUI)`
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    position: relative;
    padding: 40px 20px 0 20px;
  }
`;

export const DialogContent = styled(DialogContentUI)`
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    padding: 20px;
  }
`;

export const DialogActions = styled(DialogActionsUI)`
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    padding: 0 20px 25px 20px;
  }
`;
