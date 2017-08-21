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
import SimpleButton from '../www/react/components/SimpleButton.jsx';
storiesOf('Component List', module)
  .addDecorator(withKnobs)
  .add('Hello Banner',
    withInfo('')(() =>
      <HelloBanner />
    )
  )
  .addDecorator(withKnobs)
  .add('SimpleButton - default',
    withInfo('')(() =>
      <SimpleButton />
    )
  )
  .addDecorator(withKnobs)
  .add('SimpleButton - message',
    withInfo('')(() => {
      const name = text('Name', 'phil');
      return (<SimpleButton message={name} />)
    })
  )

;