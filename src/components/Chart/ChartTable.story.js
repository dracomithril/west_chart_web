import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import ChartTable from './ChartTable';
import configureStore from '../../configureStore';

const state = {
  filters: {
    woc_control: {
      checked: true,
    },
  },
};
const store = configureStore(state);

addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('ChartTable', module).add('Todo[VR]', () => <ChartTable data={[]} />);
