import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.ul`
  li {
    line-height: 42px;
    display: inline-block;
    a {
      display: inline-block; // anchor display: block or display: inline-block; and then it will accept the width and height values.
      text-decoration: none;
      color: white;
      line-height: 42px;
      padding: 10px;
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
`;
export default class Navigation extends Component {
  render() {
    const linkToView2 = { pathname: "/view2", state: { some: "data" } };

    return (
      <Nav className="react-component nav-bar">
        <NavList>
          <NavLink to="/" exact activeClassName="selected">
            Home
          </NavLink>
        </NavList>
        <NavList>
          <NavLink to={linkToView2} activeClassName="selected">
            View2
          </NavLink>
        </NavList>
        <NavList>
          <NavLink to="/comments" activeClassName="selected">
            Comments
          </NavLink>
        </NavList>
      </Nav>
    );
  }
}
