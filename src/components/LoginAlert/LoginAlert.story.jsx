import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import LoginAlerts from './index';
import configureStore from '../../configureStore';

const store = configureStore();

storiesOf('LoginAlerts', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Todo[VR]', () => <LoginAlerts from="/" />);
