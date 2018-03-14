import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import SongsPerDay from './SongsPerDay';
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
storiesOf('SongsPerDay', module)
  .add('Todo[VR]', () => <SongsPerDay songs_per_day={4} onDaysChange={action('days changed')} />)
  .add('With errors', () => (
    <SongsPerDay
      songs_per_day={3}
      error_days={[
        { color: 'blue', org: '01/03' },
        { color: 'blue', org: '02/03' },
        { color: 'red', org: '03/03' },
        { color: 'red', org: '04/03' },
      ]}
      onDaysChange={action('days changed')}
    />
  ))
  .add('No errors', () => <SongsPerDay songs_per_day={3} error_days={[]} onDaysChange={action('days changed')} />);
