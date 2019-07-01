import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import ChartPresenterContainer from './ChartPresenter';
import configureStore from '../../configureStore';
import response from '../../___data___/chartData';

const state = {
  filters: {
    woc_control: {
      checked: true,
    },
  },
  show_wait: false,
  facebookUser: {},
  chart: response,
};
const state2 = {
  filters: {
    woc_control: {
      checked: true,
    },
  },
  show_wait: false,
  facebookUser: {},
  chart: [],
  lastUpdateDate: '2017-06-16T19:54:25.672Z',
};

const storeNo = configureStore(state2);
const store = configureStore(state);

storiesOf('ChartPresenter', module)
  .add('no data', () => (
    <Provider store={storeNo}>
      <ChartPresenterContainer />
    </Provider>
  ))
  .addDecorator(story => (
    <Provider store={store}>
      {story()}
    </Provider>
  ))
  .add('with data', () => <ChartPresenterContainer />);
