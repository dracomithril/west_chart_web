import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import LoginComponent from './Login';
import configureStore from '../../configureStore';

const store = configureStore();

storiesOf('Login', module)
  .addDecorator(story => (
    <Provider store={store}>
      {story()}
    </Provider>
  ))
  .add('Todo[VR]', () => <LoginComponent from="/" />);
