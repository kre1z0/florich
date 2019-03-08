import React, { Component } from "react";
import throttle from "lodash/throttle";

import { isMobile, isTablet } from "../../utils/browser";

export class ViewportHeight extends Component {
  constructor(props) {
    super(props);
    this.onResizeThrottled = throttle(this.onResize, 44);
  }

  vh = 0;
  interval = 0;
  timeout = 0;

  componentDidMount() {
    this.onResize();

    if (isMobile() || isTablet()) {
      window.addEventListener("orientationchange", this.onOrientationChange);
    } else {
      window.addEventListener("resize", this.onResizeThrottled);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    window.removeEventListener("resize", this.onResizeThrottled);
    window.removeEventListener("resize", this.onOrientationChange);
  }

  onOrientationChange = () => {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.interval = setInterval(() => {
      if (this.vh !== window.innerHeight) {
        this.setVhProperty();
      }
      this.vh = window.innerHeight;
    }, 4);
    this.timeout = setTimeout(() => {
      const axis = Math.abs(window.orientation);

      if (axis === 90) {
        window.scrollTo(0, 1);
      }

      clearInterval(this.interval);
      this.vh = 0;
    }, 240);
  };

  onResize = () => {
    this.setVhProperty();
  };

  setVhProperty = () =>
    document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);

  render() {
    return <div style={{ display: "none" }} />;
  }
}
