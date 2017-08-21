import React from 'react';
import { storiesOf, configure, setAddon } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

/************************************************************************
import YOUR_COMPONENT from '../src/components/YOUR_COMPONENT.jsx';
storiesOf('HEADER_TITLE', module)
  .addDecorator(withKnobs)
  .add('SUB_TITLE',
    withInfo('')(() =>
      <YOUR_COMPONENT />
    )
  );
*************************************************************************/


import HelloBanner from '../www/react/components/HelloBanner.jsx';
storiesOf('Component List', module)
  .addDecorator(withKnobs)
  .add('Hello Banner',
    withInfo('')(() =>
      <HelloBanner />
    )
  );