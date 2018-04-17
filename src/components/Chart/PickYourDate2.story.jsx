import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';
import { Provider } from 'react-redux';
import PickYourDate from './PickYourDate2';
import configureStore from '../../configureStore';

const state = {};
const store = configureStore(state);

addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('PickYourDate2', module)
  .add('Todo[VR]', () => <PickYourDate />)
  .add('Basic use[VR]', () => {
    const until = moment('20180316');
    const since = moment(until).subtract(14, 'days');
    return <PickYourDate since={since} until={until} onDateChange={action('Change date')} />;
  });
