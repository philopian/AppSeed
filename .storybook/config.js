import { configure, setAddon } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function loadStories() {
  require('./index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);