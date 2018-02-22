import React from "react";
import PropTypes from "prop-types";

const FunctionaComponent = props => (
  <div className="container">
    <h3>Function Component</h3>
    <p>{props.message}</p>
  </div>
);

FunctionaComponent.propTypes = {
  message: PropTypes.string
};
FunctionaComponent.defaultProps = {
  message: "World"
};
export default FunctionaComponent;
