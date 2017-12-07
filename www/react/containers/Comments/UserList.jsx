import React from "react";
import styled from "styled-components";
import _ from "lodash";

const Container = styled.div`
  padding: 10px;
  display: inline-block;
  color: rgb(24, 24, 24);
  float: left;
  margin: 8px;
`;
const H3 = styled.h3`
  margin: 0px;
`;
const UL = styled.ul`
  margin-top: 0px;
`;

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  getUniqueUserList(data) {
    const x = _.uniq(_.map(data, "username"));
    const users = x.map((user, i) => {
      return <li key={i}>{user}</li>;
    });
    return users;
  }

  render() {
    return (
      <Container className="react-component component-user-list">
        <H3>User List</H3>
        <UL>{this.getUniqueUserList(this.props.users)}</UL>
      </Container>
    );
  }
}
