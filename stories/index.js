import React from 'react';
import { storiesOf, configure, setAddon } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';



//===(IMPORTS - DON'T DELETE THIS LINE!!!!)===========
import ReactBanner from '../www/react/components/ReactBanner.jsx';
import SimpleBanner from '../www/react/components/SimpleBanner.jsx';
storiesOf('Atoms', module)
  .addDecorator(withKnobs)
  .add('ReactBanner',
    withInfo('')(() =>
      <ReactBanner />
    )
  )
  .addDecorator(withKnobs)
  .add('SimpleBanner - default',
    withInfo('')(() =>
      <SimpleBanner />
    )
  )
  .addDecorator(withKnobs)
  .add('SimpleBanner - message',
    withInfo('')(() => {
      const name = text('Name', 'phil');
      return (<SimpleBanner message={name} />)
    })
  )

//===(COMPONENT HOOK - DON'T DELETE THIS LINE!!!!)===========
;