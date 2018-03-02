import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
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

addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('Header', module).add('Todo[VR]', () => <Header />);
