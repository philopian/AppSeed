import $ from 'jquery';
import R from './services/router';


const banner = `
   ÛÛÛÛÛÛÛÛÛ                       ÛÛÛÛÛÛÛÛÛ                      ÛÛÛÛÛ
  ÛÛÛ°°°°°ÛÛÛ                     ÛÛÛ°°°°°ÛÛÛ                    °°ÛÛÛ 
 °ÛÛÛ    °ÛÛÛ ÛÛÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛ °ÛÛÛ    °°°   ÛÛÛÛÛÛ  ÛÛÛÛÛÛ  ÛÛÛÛÛÛÛ 
 °ÛÛÛÛÛÛÛÛÛÛÛ°°ÛÛÛ°°ÛÛÛ°°ÛÛÛ°°ÛÛÛ°°ÛÛÛÛÛÛÛÛÛ  ÛÛÛ°°ÛÛÛÛÛÛ°°ÛÛÛÛÛÛ°°ÛÛÛ 
 °ÛÛÛ°°°°°ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ °°°°°°°°ÛÛÛ°ÛÛÛÛÛÛÛ°ÛÛÛÛÛÛÛ°ÛÛÛ °ÛÛÛ 
 °ÛÛÛ    °ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛ ÛÛÛ    °ÛÛÛ°ÛÛÛ°°° °ÛÛÛ°°° °ÛÛÛ °ÛÛÛ 
 ÛÛÛÛÛ   ÛÛÛÛÛ°ÛÛÛÛÛÛÛ  °ÛÛÛÛÛÛÛ °°ÛÛÛÛÛÛÛÛÛ °°ÛÛÛÛÛÛ°°ÛÛÛÛÛÛ°°ÛÛÛÛÛÛÛÛ
°°°°°   °°°°° °ÛÛÛ°°°   °ÛÛÛ°°°   °°°°°°°°°   °°°°°°  °°°°°°  °°°°°°°° 
              °ÛÛÛ      °ÛÛÛ                                           
              ÛÛÛÛÛ     ÛÛÛÛÛ                                          
             °°°°°     °°°°°                                           


`;
console.log(banner);




require("../sass/index.scss");
// require("../sass/globals.scss");
const html = require("../index.html"); // eslint-disable-line no-unused-vars
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