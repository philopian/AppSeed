import $ from 'jquery';

require("../sass/view2.scss");
const html = require("../html/view2.html");

export class View {
  constructor() {
    this.someProperty = "This is a class property!";
  }

  deconstructor() {
    $('#just-a-button').off("click", this.justaButtonClick.bind(this));
  }

  html() {
    return html;
  }

  addListerners() {
    $('#just-a-button').on("click", this.justaButtonClick.bind(this));
  }

  init() {
    $('#view-2').foundation();
  }


  //--Custom Method---------
  justaButtonClick(e) {
    this.printMessage(`..the (${$(e.target).text()}) button was clicked `);
  }

  printMessage(message) {
    console.log(`${message} ... from view2`);
  }
}
export { View as default };