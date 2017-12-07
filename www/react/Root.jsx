import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store";
import Navigation from "./containers/Navigation.jsx";
import View1 from "./pages/View1.jsx";
import View2 from "./pages/View2.jsx";
import CommentView from "./pages/CommentView.jsx";

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="application-container">
            <div>
              <Navigation />
            </div>
            <div>
              <Route exact path="/" component={View1} />
              <Route path="/view2" component={View2} />
              <Route path="/comments" component={CommentView} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
