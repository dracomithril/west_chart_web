import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Header from './index';
import configureStore from '../../configureStore';

const store = configureStore({
  user: {
    picture_url: '/pic/concerned_deadpool.jpg',
    name: 'Deadpool',
    first_name: 'Wade',
  },
  sp_user: {
    id: 'unicorn',
  },
});

storiesOf('Header', module).add('Todo[VR]', () => (
  <Provider store={store}>
    <Header />
  </Provider>
));
