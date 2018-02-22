import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Nav, NavList } from "./styles";

class Navigation extends Component {
  render() {
    const linkToView2 = { pathname: "/view2", state: { some: "data" } };

    return (
      <Nav className="react-component nav-bar">
        <NavList>
          <NavLink to="/" exact activeClassName="selected">
            View 1
          </NavLink>
        </NavList>
        <NavList>
          <NavLink to={linkToView2} activeClassName="selected">
            View 2
          </NavLink>
        </NavList>
      </Nav>
    );
  }
}
export default Navigation;
// const mapStateToProps = state => ({
//   xx: state.xx
// });
// const mapDispatchToProps = dispatch => ({
//   x: () => dispatch(x())
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
