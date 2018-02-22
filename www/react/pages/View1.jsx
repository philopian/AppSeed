import React, { Component } from "react";

import HelloContainer from "../containers/HelloContainer";

class View1 extends Component {
  constructor(props) {
    super(props);
    console.log("[View1]");
  }

  render() {
    return (
      <div>
        <h2>View 1</h2>
        <HelloContainer />
      </div>
    );
  }
}
export default View1;
