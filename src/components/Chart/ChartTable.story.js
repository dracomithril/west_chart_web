import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import ChartTable from './ChartTable';
import configureStore from '../../configureStore';
import response from './../../___tests___/data/response.json';

const state = {
  filters: {
    woc_control: {
      checked: true,
    },
  },
  show_wait: false,
  user: {},
  ...response,
};
const store = configureStore(state);

storiesOf('ChartTable', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Todo[VR]', () => <ChartTable data={[]} />)
  .add('with elements [VR]', () => <ChartTable data={response.chart} />);
