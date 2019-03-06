import styled from "styled-components";

import {
  DialogContent as DialogContentUI,
  DialogActions as DialogActionsUI
} from "../../components/Atoms/Dialog";

export const DialogContent = styled(DialogContentUI)`
  margin-bottom: 10px;
`;

export const DialogActions = styled(DialogActionsUI)`
  justify-content: flex-end;
`;
