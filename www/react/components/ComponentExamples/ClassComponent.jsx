import React, { Component } from "react";
import PropTypes from "prop-types";
class ClassComponent extends Component {
  render() {
    return (
      <div className="container">
        <h3>Class Component!</h3>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  message: PropTypes.string
};
ClassComponent.defaultProps = {
  message: "World"
};
export default ClassComponent;
