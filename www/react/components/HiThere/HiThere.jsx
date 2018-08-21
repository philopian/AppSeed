import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";

class HiThere extends Component {
  state = {
    username: "",
    clickCount: 0,
    clickMessage: "",
    parentMessage: ""
  };

  handleClick = () => {
    this.setState({
      clickMessage: `Hello ${this.state.username}, you just clicked a button!`,
      clickCount: this.state.clickCount++
    });
  };

  calcSum = (a, b) => {
    return a + b;
  };

  handleUsernameInputChange = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return (
      <div className="my-component">
        <Wrapper>
          <div className="container">
            <h1>hi there</h1>
            <p className="props-message">{this.props.message}</p>
          </div>

          <div className="local-message container">
            <input
              className="username"
              type="text"
              value={this.state.username}
              placeholder="username"
              onChange={this.handleUsernameInputChange}
            />
            <button onClick={this.handleClick}>Click me!</button>
            <p className="click-message">{this.state.clickMessage}</p>
          </div>

          <div className="parent-message container">
            <button onClick={this.props.handleClickForParent}>
              Send Message to parent!
            </button>
            <p className="click-message-for-parent">
              {this.state.parentMessage}
            </p>
          </div>
        </Wrapper>
      </div>
    );
  }
}
HiThere.propTypes = {
  message: PropTypes.string,
  handleClickForParent: PropTypes.func
};
HiThere.defaultProps = {
  message: "World"
};
export default HiThere;
