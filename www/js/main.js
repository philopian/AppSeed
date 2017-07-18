import React from 'react';
import ReactDOM from 'react-dom';
import Hello from '../react/components/hello.jsx';
import http from './services/http';

require("../sass/main.scss");
const html = require("../html/main.html");

export class View {
  constructor() {} // eslint-disable-line

  deconstructor() {}

  html() {
    return html;
  }

  addListeners() {}

  init() {
    ReactDOM.render(<Hello />, document.getElementById('react-example'));
    http.getSampleData()
      .then((data) => {
        $('#mock-json-data').text(JSON.stringify(data));
      })
      .catch((e) => {
        console.log(e); // "oh, no!"
      });
  }


  //--Custom Method---------
  customMethod() {
    console.log('..custom method');
  }

}
export { View as default };