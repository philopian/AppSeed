import React from "react";
import { connect } from "react-redux";
import CardView from "./CardView.jsx";
import CommentForm from "./CommentForm.jsx";
import UserList from "./UserList.jsx";

import { addComment } from "../../reducers/comments/actions";

import styled from "styled-components";
const Container = styled.div`
  padding: 10px 20px;
  display: inline-block;
  width: 100%;
  background-color: rgb(136, 231, 207);
`;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    // console.log("[Comments props]", props);
  }

  render() {
    const users = this.props.comments.map(user => {
      return (
        <CardView
          className="card-view"
          key={user.id}
          username={user.username}
          comment={user.comment}
        />
      );
    });

    return (
      <div>
        <Container>
          <CommentForm className="comment-form" style="float:left;" />
          <UserList
            className="user-list"
            style="float:left;"
            users={this.props.comments}
          />
        </Container>
        <div id="container-cards">{users}</div>
      </div>
    );
  }
}

// Map state/dispatch to props
const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     addComment: value => dispatch(addComment(value))
//   };
// };
export default connect(mapStateToProps, null)(Comments);
