import $ from 'jquery';
import store from './services/store';

require("../sass/redux-example.scss");
const html = require("../html/redux-example.html");
let state = {};

export class View {
  constructor() {
    // REDUX
    state = store.getState();
    store.subscribe(() => {
      // Subscribe to state (when state changes do something with this value)
      state = store.getState();
      $('#state-thing').text(state.thing);
    });

    // Add click handlers
    $(document).on('click', '#just-a-button', this.justaButtonClick);
  }


  deconstructor() {
    // Remove click handlers
    $(document).off('click', '#just-a-button', this.justaButtonClick);
  }

  html() {
    return html;
  }

  addListerners() {}

  init() {
    $('#state-thing').text(state.thing);
  }


  //--Custom Method---------
  justaButtonClick() {
    // Update the store value "thing"
    store.dispatch({
      type: "UPDATE_SOMETHING",
      payload: state.thing + 1,
    });
  }
}
export { View as default };