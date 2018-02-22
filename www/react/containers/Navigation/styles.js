import styled from "styled-components";

export const Nav = styled.ul`
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

export const NavList = styled.li`
  display: inline;
`;
