import $ from 'jquery';
import foundation from 'foundation-sites'; // eslint-disable-line 

require("../sass/view1.scss");
const html = require("../html/view1.html");

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
    $('#view-1').foundation(); // Allows you to do foundation JS stuff like show modals
  }



  //--Custom Method---------
  justaButtonClick() {
    console.log('...JUST A BUTTON CLICK.....from view1!!!!');
  }

}
export { View as default };