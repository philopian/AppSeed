require("../sass/view2.scss");
var html = require("../html/view2.html");

import $ from 'jquery';
import foundation from 'foundation-sites';
export class View {
  constructor() {
    $(document).on('click', '#just-a-button', this.justaButtonClick)
  }
  deconstructor() {
    $(document).off('click', '#just-a-button', this.justaButtonClick)
  }


  html() {
    return html;
  }

  init() {
    $('#view-2').foundation();
  }

  justaButtonClick() {
    console.log('...JUST A BUTTON CLICK.....from view2  !!!!');
  }


}
export { View as default }