import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import NotFound from './index';
import configureStore from '../../configureStore';

const store = configureStore();

addDecorator(story => (
  <Provider store={store}>
    {story()}
  </Provider>
));
storiesOf('NotFound', module).add('Todo[VR]', () => <NotFound />);
