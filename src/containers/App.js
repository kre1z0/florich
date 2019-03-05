import React, { Component } from "react";
import styled from "styled-components";
import { injectGlobal } from "styled-components";

import {
  injectGlobals,
  ThemeProvider,
  getTheme,
  GlobalsContainer as GlobalsContainerUI,
  Overlay
} from "@evergis/ui";
import { hsl } from "polished";

import { Map } from "./Map/Map";

injectGlobal`
  html, body, #app {
    width: 100%;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
  ${Overlay} {
    background-color: rgba(255, 243, 248, 0.65);
  }
`;

export const GlobalsContainer = styled(GlobalsContainerUI)`
  width: 100%;
  height: 100%;
  letter-spacing: 0.1px;
  * {
    box-sizing: border-box;
  }
`;

export const palette = {
  primary: hsl(335, 1, 0.7),
  primaryDark: hsl(336, 1, 0.67),
  primaryDeep: hsl(338, 1, 0.63)
};

export const theme = getTheme({ palette });

injectGlobals({ iconFont: true });

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalsContainer>
          <Map />
        </GlobalsContainer>
      </ThemeProvider>
    );
  }
}

export default App;
