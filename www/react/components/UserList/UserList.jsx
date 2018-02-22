import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";

class UserList extends Component {
  render() {
    const Users = this.props.users.map(user => (
      <li key={user.id}>
        {user.name} - {user.city}
      </li>
    ));

    return (
      <Wrapper>
        <button onClick={this.props.getUsers}>Get users</button>
        <ul>{Users}</ul>
      </Wrapper>
    );
  }
}
UserList.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired
};
export default UserList;
