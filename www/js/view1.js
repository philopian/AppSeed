import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';


import ReactBanner from '../react/components/ReactBanner.jsx';
import DialogExample from '../react/components/DialogExample.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




require("../sass/view1.scss");
const html = require("../html/view1.html");

export class View {
  constructor() {} // eslint-disable-line

  deconstructor() {
    $('#just-a-button').off("click", this.justaButtonClick.bind(this));
  }

  html() {
    return html;
  }

  addListeners() {
    $('#just-a-button').on("click", this.justaButtonClick.bind(this));
  }

  init() {
    // $('#view-1').foundation(); // Allows you to do foundation JS stuff like show modals
    this.initReact();
  }

  //--Custom Method---------
  initReact() {
    const App = () => (
      <MuiThemeProvider>
        <DialogExample />
      </MuiThemeProvider>
    );

    ReactDOM.render(<App />, document.getElementById('react-dialog'));
  }

  justaButtonClick(e) {
    this.printMessage(`..the (${$(e.target).text()}) button was clicked `);
  }

  printMessage(message) {
    console.log(`${message} ... from view1`);
  }

}
export { View as default };