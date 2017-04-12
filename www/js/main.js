import http from './services/http';

require("../sass/main.scss");
const html = require("../html/main.html");

export class View {
  constructor() {} // eslint-disable-line

  deconstructor() {}

  html() {
    return html;
  }

  addListerners() {}

  init() {
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