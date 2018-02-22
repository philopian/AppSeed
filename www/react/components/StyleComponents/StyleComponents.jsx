import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";
class StyleComponents extends Component {
  render() {
    return (
      <div className="my-component">
        <Wrapper>
          <h1>Styled-Components</h1>
          <p>Some content</p>
          <button
            className="btn-warnning button"
            onClick={this.props.handleClick}
          >
            this is a button
          </button>
          <p>{this.props.message}</p>
        </Wrapper>
      </div>
    );
  }
}
StyleComponents.propTypes = {
  message: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};
StyleComponents.defaultProps = {
  message: "World"
};
export default StyleComponents;
