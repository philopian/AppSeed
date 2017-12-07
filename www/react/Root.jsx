import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation.jsx";
import View1 from "./pages/View1.jsx";
import View2 from "./pages/View2.jsx";
import UserComments from "./pages/UserComments.jsx";

export default class Root extends Component {
  render() {
    return (
      <Router>
        <div className="application-container">
          <div>
            <Navigation />
          </div>
          <div>
            <Route exact path="/" component={View1} />
            <Route path="/view2" component={View2} />
            <Route path="/comments" component={UserComments} />
          </div>
        </div>
      </Router>
    );
  }
}
