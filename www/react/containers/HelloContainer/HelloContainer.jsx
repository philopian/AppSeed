import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import StyleComponents from "../../components/StyleComponents";
import SimpleButton from "../../components/SimpleButton";

class HelloContainer extends Component {
  handleSimpleButtonClick = () => {
    console.log("[hello SimpleButton click]");
  };
  handleStyleComponentsClick = () => {
    console.log("[StyleComponents click]");
  };

  render() {
    return (
      <div>
        <SimpleButton
          handleClick={this.handleSimpleButtonClick}
          message="hi there!!"
        />
        <StyleComponents handleClick={this.handleStyleComponentsClick} />
      </div>
    );
  }
}

HelloContainer.propTypes = {};
const mapStateToProps = state => ({
  // currentUser: state.currentUser,
  // users: state.users
});
const mapDispatchToProps = dispatch => ({
  // getUsers: () => dispatch(fetchAllUsers())
});
export default connect(mapStateToProps, mapDispatchToProps)(HelloContainer);
