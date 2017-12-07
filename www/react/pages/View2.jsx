import React, { Component } from "react";

export default class View2 extends Component {
  constructor(props) {
    super(props);
    console.log("[View2]", this.props.location.state);
  }

  render() {
    return <div>... VIEW 2</div>;
  }
}
