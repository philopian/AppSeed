require("../sass/view1.scss");
var html = require("../html/view1.html");

import $ from 'jquery';
import foundation from 'foundation-sites';
export class View {
  constructor() {
    // console.log('...view2 constructor');
    $(document).on('click', '#just-a-button', this.justaButtonClick)
  }

  deconstructor() {
    $(document).off('click', '#just-a-button', this.justaButtonClick)
  }

  html() {
    return html;
  }

  init() {
    $('#view-1').foundation(); // Allows you to do foundation JS stuff like show modals
  }

  loadJs() {

  }


  justaButtonClick() {
    console.log('...JUST A BUTTON CLICK.....from view1!!!!');
  }



}
export { View as default }