import React, { Component } from "react";

import MyContainer from "../containers/MyContainer";

class View2 extends Component {
  constructor(props) {
    super(props);
    console.log("[View2]", this.props.location.state);
  }

  render() {
    return (
      <div>
        <p>view 2</p>
        <MyContainer />
      </div>
    );
  }
}

export default View2;
