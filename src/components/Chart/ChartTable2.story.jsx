import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import ChartTable from './ChartTable2';
import configureStore from '../../configureStore';
import chart from '../../___data___/chartData';

const state = {
  filters: {
    woc_control: {
      checked: true,
    },
  },
  show_wait: false,
  user: {},
  chart,
};
const store = configureStore(state);

storiesOf('ChartTable2', module)
  .addDecorator(story => (
    <Provider store={store}>
      {story()}
    </Provider>
  ))
  .add('No data', () => <ChartTable data={[]} />)
  .add('with elements', () => <ChartTable data={chart} />);
