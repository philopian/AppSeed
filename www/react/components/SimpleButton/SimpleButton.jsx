import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper, Button } from "./styles.js";

class SimpleButton extends Component {
  render() {
    return (
      <Wrapper>
        <Button className="button" onClick={this.props.handleClick}>
          click me
        </Button>
        <div>
          <p>{this.props.message}</p>
        </div>
      </Wrapper>
    );
  }
}
SimpleButton.propTypes = {
  message: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};
SimpleButton.defaultProps = {
  message: ""
};
export default SimpleButton;
