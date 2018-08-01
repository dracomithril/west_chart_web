import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import FilterOption from './FilterOption';
import configureStore from '../../configureStore';

const state = {
  filters: {
    woc_control: {
      checked: true,
    },
  },
};
const store = configureStore(state);

addDecorator(story => (
  <Provider store={store}>
    {story()}
  </Provider>
));
storiesOf('FilterOption', module)
  .add('Todo[VR]', () => <FilterOption />)
  .add('Checked[VR]', () => (
    <FilterOption
      checked
      onChange={action('checked')}
      descStart="some filter"
      descEnd="days"
      onValueChange={action('value changed')}
    />
  ));
