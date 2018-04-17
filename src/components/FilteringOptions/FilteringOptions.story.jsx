import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import FilteringOptions from './index';
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
storiesOf('FilteringOptions', module).add('Todo[VR]', () => <FilteringOptions />);
