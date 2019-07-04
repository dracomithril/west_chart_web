import React from 'react';
import { storiesOf } from '@storybook/react';
import { Login as LoginComponent } from './Login';

storiesOf('Login', module)
  .add('Todo[VR]', () => (
    <LoginComponent
      location="/"
      autoLoad={false}
    />
  ));
