import React from "react";

export default class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("[props: class component]", this.props);

    return (
      <div className="container">
        <h3>Class Component!</h3>
        <p>{this.props.message}</p>
      </div>
    );
  }
}
