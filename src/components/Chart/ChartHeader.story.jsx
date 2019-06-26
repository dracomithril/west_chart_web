import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { actions } from '@storybook/addon-actions';
import { containerWithStyles as ChartHeader } from './ChartHeader';
import configureStore from '../../configureStore';

const state = {};
const store = configureStore(state);

addDecorator(story => (
  <Provider store={store}>
    {story()}
  </Provider>
));
const eventFromNames = actions('changeDays', 'updateChart', 'updateUntilDate', 'updateSinceDate');
storiesOf('ChartHeader', module)
  .add('Todo[VR]', () => <ChartHeader {...eventFromNames} />)
  .add('With error days', () => (
    <ChartHeader
      songsPerDay={3}
      user={{}}
      {...eventFromNames}
      errorDays={[
        { color: 'blue', org: '01/03' },
        { color: 'blue', org: '02/03' },
        { color: 'red', org: '03/03' },
        { color: 'red', org: '04/03' },
      ]}
    />
  ));
