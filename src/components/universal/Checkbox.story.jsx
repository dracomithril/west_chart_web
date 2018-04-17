import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .add('no props', () => <Checkbox />)
  .add('disabled', () => <Checkbox disabled />)
  .add('on color change blue', () => <Checkbox color="blue" />)
  .add('react on change', () => (
    <Checkbox color="blue" onChange={action('on change')}>
      Text
    </Checkbox>
  ));
