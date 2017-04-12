require("../sass/esri.scss");
const html = require("../html/esri.html");

export class View {
  constructor() {} // eslint-disable-line

  deconstructor() {}

  html() {
    return html;
  }

  addListerners() {}

  init() {
    // all the code happens in the html file because it used dojo & esri CDN
  }


}
export { View as default };