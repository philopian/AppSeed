import $ from 'jquery';

import main from '../main';
import view1 from '../view1';
import view2 from '../view2';
import leaflet from '../leaflet';
import esri from '../esri';
let v = {};

export class Router {
  constructor() {
    // console.log('...ROUTER constructor');
  }

  deconstructor() {
    v.deconstructor();
  }

  loadView(view, nav = false) {
    switch (view) {
      case 'view1':
        v = new view1();
        break;
      case 'view2':
        v = new view2();
        break;
      case 'leaflet':
        v = new leaflet();
        break;
      case 'esri':
        v = new esri();
        break;
      default:
        v = new main();
        view = '/';
        break;
    }
    $(document).find('#view').html(v.html());
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
export { Router as default }