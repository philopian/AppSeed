import { configure } from '@storybook/react';

function loadStories() {
  require("babel-polyfill");
  require('../www/sass/global.scss');
  // require('../www/react/components/SimpleButton/storybook.js');
  // require('../www/react/components/StyleComponents/storybook.js');
  // require("../www/react/components/UserList/storybook.js");
} // DONT'T DELETE THIS

configure(loadStories, module);