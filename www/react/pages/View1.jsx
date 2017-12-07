import React, { Component } from "react";

export default class View1 extends Component {
  constructor(props) {
    super(props);
    console.log("[View1]", this.props.location.state);
  }

  render() {
    return <div>VIEW 1</div>;
  }
}
