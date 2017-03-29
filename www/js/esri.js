require("../sass/esri.scss");
var html = require("../html/esri.html");

export class View {
  constructor() {
    console.log('...ESRI constructor');

  }
  deconstructor() {
    console.log('...ESRI deconstructor');

  }
  html() {
    return html;
  }


  init() {}


}
export { View as default }