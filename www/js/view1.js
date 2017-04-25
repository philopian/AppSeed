import $ from 'jquery';
import { foundation } from 'foundation'; // eslint-disable-line 

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
    $('#view-1').foundation(); // Allows you to do foundation JS stuff like show modals
  }

  //--Custom Method---------
  justaButtonClick(e) {
    this.printMessage(`..the (${$(e.target).text()}) button was clicked `);
  }

  printMessage(message) {
    console.log(`${message} ... from view1`);
  }

}
export { View as default };