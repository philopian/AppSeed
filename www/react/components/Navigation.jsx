import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.ul`
  width: 100%;
  background-color: white;

  li {
    line-height: 42px;
    border: solid rgb(190, 190, 190) 2px;
    padding: 10px;
    a {
      text-decoration: none;
    }
  }
  li:first-child {
    border-right-width: 0px;
  }
  li:hover {
    background-color: rgb(141, 214, 252);
    a {
      color: white;
    }
  }
`;
const NavList = styled.li`display: inline;`;
export default class Navigation extends Component {
  render() {
    const linkToView2 = { pathname: "/view2", state: { some: "data" } };

    return (
      <Nav className="react-component ">
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
