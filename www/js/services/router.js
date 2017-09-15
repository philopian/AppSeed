/*eslint new-cap: 0, object-shorthand: 0 */
import $ from 'jquery';

import main from '../main';
import view1 from '../view1';
import view2 from '../view2';
import leaflet from '../leaflet';
import reduxExample from '../redux-example';
import store from './store';
let v = {};

export class Router {
  constructor() {
    this.state = store.getState();
    store.subscribe(() => {
      this.state = store.getState();
    });
  }

  deconstructor() {
    v.deconstructor();
  }

  loadView(view, nav = false) {
    try { this.deconstructor(); } catch (e) {} // eslint-disable-line no-empty
    switch (view) {
      //===(DON'T DELETE THIS LINE!!!!)===========
      case 'reduxexample':
        v = new reduxExample();
        break;
      case 'view1':
        v = new view1();
        break;
      case 'view2':
        v = new view2();
        break;
      case 'leaflet':
        v = new leaflet();
        break;
      default:
        v = new main();
        view = '/';
        break;
    }
    store.dispatch({
      type: 'UPDATE_CURRENT_VIEW',
      payload: view
    });
    $(document).find('#view').html(v.html());
    v.addListeners();
    if (!nav) {
      this.addPath(view);
    }
    v.init();
    return v;
  }

  addPath(path) {
    window.history.pushState({
      path: path
    }, '', path);
  }
}
export { Router as default };