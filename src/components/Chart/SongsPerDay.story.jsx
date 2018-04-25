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
  .add('Todo[VR]', () => <SongsPerDay songsPerDay={4} onDaysChange={action('days changed')} />)
  .add('With errors', () => (
    <SongsPerDay
      songsPerDay={3}
      errorDays={[
        { color: 'blue', org: '01/03/2018' },
        { color: 'blue', org: '02/03/2018' },
        { color: 'red', org: '03/03/2018' },
        { color: 'red', org: '04/03/2018' },
      ]}
      onDaysChange={action('days changed')}
    />
  ))
  .add('No errors', () => <SongsPerDay songsPerDay={3} errorDays={[]} onDaysChange={action('days changed')} />);
