require("../sass/esri.scss");
const html = require("../html/esri.html");

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

  init() {
    // all the code happens in the html file because it used dojo & esri CDN
  }


}
export { View as default };