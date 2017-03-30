import $ from 'jquery';

require("../sass/view2.scss");
const html = require("../html/view2.html");

export class View {
  constructor() {
    $(document).on('click', '#just-a-button', this.justaButtonClick);
  }
  deconstructor() {
    $(document).off('click', '#just-a-button', this.justaButtonClick);
  }

  html() {
    return html;
  }

  init() {
    $('#view-2').foundation();
  }


  //--Custom Method---------
  justaButtonClick() {
    console.log('...JUST A BUTTON CLICK.....from view2  !!!!');
  }
}
export { View as default };