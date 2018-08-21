import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";

class HelloComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="my-component">
        <Wrapper>
          <h1>HelloComponent</h1>
          <p>
            it <span>{this.props.message}</span>
          </p>
        </Wrapper>
      </div>
    );
  }
}
HelloComponent.propTypes = {
  message: PropTypes.string
};
HelloComponent.defaultProps = {
  message: "World"
};
export default HelloComponent;
