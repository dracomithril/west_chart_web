import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .add('no props', () => <Checkbox id="checkbox1" />)
  .add('disabled', () => <Checkbox id="checkbox2" disabled />)
  .add('on color change blue', () => <Checkbox id="checkbox1" color="blue" />)
  .add('react on change', () => (
    <Checkbox id="checkbox1" color="blue" onChange={action('on change')}>
      Text
    </Checkbox>
  ));
