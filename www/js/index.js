import $ from 'jquery';
import R from './services/router';

require("../sass/index.scss");
require("../sass/globals.scss");
const router = new R();

// Router: based on the URL path load the appropiate route
let v = {}; // eslint-disable-line no-unused-vars
let path = document.location.pathname;
if (path === '') {
  v = router.loadView('main'); // intial load
} else {
  path = path.replace('/', '');
  v = router.loadView(path);
}

// Handle back/forward buttons
window.onpopstate = (event) => {
  try {
    if (event.state.path === '/') {
      router.loadView('main', true);
    } else {
      router.loadView(event.state.path, true);
    }
  } catch (e) {} // eslint-disable-line no-empty
};

// Links to load views
$(document).on('click', '.router', (e) => {
  const view = $(e.target).data('router');
  v = router.loadView(view, false);
});