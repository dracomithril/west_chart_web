import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import ChartHeader from './ChartHeader';
import configureStore from '../../configureStore';

const state = {};
const store = configureStore(state);

addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('ChartHeader', module)
  .add('Todo[VR]', () => <ChartHeader />)
  .add('With error days', () => (
    <ChartHeader
      error_days={[
        { color: 'blue', org: '01/03' },
        { color: 'blue', org: '02/03' },
        { color: 'red', org: '03/03' },
        { color: 'red', org: '04/03' },
      ]}
    />
  ));
