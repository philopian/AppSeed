import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.ul`
  width: 100%;

  li {
    line-height: 42px;
    // border: solid rgb(190, 190, 190) 2px;
    padding: 10px;
    a {
      text-decoration: none;
      color: white;
    }
  }
  li:first-child {
    border-right-width: 0px;
  }
  li:hover {
    background-color: rgb(23, 88, 149);

    a {
      color: white;
    }
  }
`;
const NavList = styled.li`
  display: inline;
  // background-color: rgb(202, 72, 151);
`;
export default class Navigation extends Component {
  render() {
    const linkToView2 = { pathname: "/view2", state: { some: "data" } };

    return (
      <Nav className="react-component nav-bar">
        <NavList>
          <Link to="/"> Home </Link>
        </NavList>
        <NavList>
          <Link to={linkToView2}> View2 </Link>
        </NavList>
      </Nav>
    );
  }
}
