require("../sass/main.scss");
var html = require("../html/main.html");

import http from './services/http';

export class View {
  constructor() {
    console.log('...main constructor');
  }

  deconstructor() {
    console.log('...main deconstructor');
  }

  html() {
    // console.log('...HTML main');
    return html;
  }

  init() {
    http.getSampleData()
      .then((data) => {
        $('#mock-json-data').text(JSON.stringify(data))
        console.log(JSON.stringify(data));
      })
  }


}
export { View as default }