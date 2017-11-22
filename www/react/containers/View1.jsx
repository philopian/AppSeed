import React from "react";
import ClassComponent from "../components/ClassComponent.jsx";
import FunctionCompoment from "../components/FunctionCompoment.jsx";
import CardView from "../components/CardView.jsx";
import CommentForm from "../components/CommentForm.jsx";
import UserList from "../components/UserList.jsx";
import store from "../../store";

import styled from "styled-components";
const Container = styled.div`
  padding: 10px;
  display: inline-block;
  width: 100%;
`;

export default class View1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = store.getState();
    store.subscribe(() => {
      this.setState(store.getState());
    }); // get new state when available
  }

  render() {
    console.log("[Root, state]", this.state.users);

    const users = this.state.users.map(user => {
      return (
        <CardView
          className="component component-card-view"
          key={user.id}
          username={user.username}
          comment={user.comment}
        />
      );
    });

    return (
      <div>
        <Container>
          <CommentForm
            className="component component-comment-form"
            style="float:left;"
          />
          <UserList
            className="component component-user-list"
            style="float:left;"
            users={this.state.users}
          />
        </Container>
        <div id="container-cards">{users}</div>
      </div>
    );
  }
}
