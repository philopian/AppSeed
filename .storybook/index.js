import React from 'react';
import { storiesOf, configure, setAddon } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

const componentsDirectoryPath = '../www/react/components/';

//===(IMPORTS - DON'T DELETE THIS LINE!!!!)===========
import ClassComponent from '../www/react/components/ClassComponent.jsx';
import FunctionCompoment from '../www/react/components/FunctionCompoment.jsx';
storiesOf('Atoms', module)
  .addDecorator(withKnobs)
  .add('ClassComponent',
    withInfo('')(() =>
      <ClassComponent />
    )
  )
  .addDecorator(withKnobs)
  .add('FunctionCompoment - default',
    withInfo('')(() =>
      <FunctionCompoment />
    )
  )
  .addDecorator(withKnobs)
  .add('FunctionCompoment - message',
    withInfo('')(() => {
      const name = text('Name', 'phil');
      return (<FunctionCompoment message={name} />)
    })
  )

//===(COMPONENT HOOK - DON'T DELETE THIS LINE!!!!)===========
;