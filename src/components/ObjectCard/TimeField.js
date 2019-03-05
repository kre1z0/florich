import React, { Component } from "react";

import { getScheduleValue } from "./getScheduleValue";

import { FieldValue } from "./styled";

export class TimeField extends Component {
  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    const { value, ...props } = this.props;

    if (hasError) {
      return null;
    }

    return <FieldValue {...props} value={getScheduleValue(value)} />;
  }
}
