import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import Summary from './Summary';
import configureStore from '../configureStore';
import chart from '../___data___/chartData';

const state = {};
const store = configureStore(state);

addDecorator(story => (
  <Provider store={store}>
    {story()}
  </Provider>
));
storiesOf('Summary', module)
  .add('Todo[VR]', () => <Summary />)
  .add('With selected', () => <Summary selected={chart} />);
