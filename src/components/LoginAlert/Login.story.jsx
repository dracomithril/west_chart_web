import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Login from './Login';
import configureStore from '../../configureStore';

const store = configureStore();

storiesOf('Login', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Todo[VR]', () => <Login from="/" />);
