import React from "react";
import styled from "styled-components";
const Avatar = styled.img`
  border-radius: 40px;
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;
const Span = styled.span`
  height: 1.17em;
  vertical-align: super;
  color: rgb(81, 81, 81);
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 150px;
  margin: 1rem;
  position: relative;
  width: 300px;
  color: rgb(81, 81, 81);
  font-size: 12px;
  p {
    margin-bottom: 4px;
  }
  .card:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export default class CardView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const avatar = username => {
      let avatarImage = "../assets/images/avatars/default.jpg";
      switch (username) {
        case "kspitzley":
          avatarImage = "../assets/images/avatars/kspitzley.jpg";
          break;
        case "ehyland":
          avatarImage = "../assets/images/avatars/ehyland.jpg";
          break;
        case "cmeszler":
          avatarImage = "../assets/images/avatars/cmeszler.jpg";
          break;
        case "pwillis":
          avatarImage = "../assets/images/avatars/pwillis.jpg";
          break;
      }
      return avatarImage;
    };

    return (
      <Card className="container-user-info card">
        <h3>
          <Avatar src={avatar(this.props.username)} />

          <Span>{this.props.username}</Span>
        </h3>
        <h3>
          <b>Comment: </b>
          {this.props.comment}
        </h3>
      </Card>
    );
  }
}
