import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UserList from "../../components/UserList";
import { fetchAllUsers } from "../../actions/users";

class MyContainer extends Component {
  render() {
    return (
      <div>
        <p>user: {this.props.currentUser}</p>
        <UserList users={this.props.users} getUsers={this.props.getUsers} />
      </div>
    );
  }
}

MyContainer.propTypes = {
  currentUser: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  currentUser: state.currentUser,
  users: state.users
});
const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchAllUsers())
});
export default connect(mapStateToProps, mapDispatchToProps)(MyContainer);
