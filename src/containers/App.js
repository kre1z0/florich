import React, { Component } from "react";
import styled from "styled-components";
import { injectGlobal } from "styled-components";
import { injectGlobals, ThemeProvider, getTheme, GlobalsContainer as GlobalsContainerUI } from "@evergis/ui";
import { hsl } from "polished";

import { Map } from "./Map/Map";

injectGlobal`
  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
  primary: hsl(321, 1, 0.77),
  primaryDark: hsl(322, 1, 0.74),
  primaryDeep: hsl(324, 1, 0.71)
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
