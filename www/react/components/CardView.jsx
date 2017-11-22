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
      <div className="react-component container-user-info card">
        <h3>
          <Avatar src={avatar(this.props.username)} />

          <Span>{this.props.username}</Span>
        </h3>
        <h3>
          <b>Comment: </b>
          {this.props.comment}
        </h3>
      </div>
    );
  }
}
