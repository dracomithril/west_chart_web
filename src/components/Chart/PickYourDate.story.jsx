import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';
import { Provider } from 'react-redux';
import PickYourDate from './PickYourDate';
import configureStore from '../../configureStore';

const state = {};
const store = configureStore(state);

addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('PickYourDate', module)
  .add('Todo[VR]', () => <PickYourDate />)
  .add('Basic use[VR]', () => (
    <PickYourDate show_last={31} onDateChange={action('Change date')} start_date={moment()} />
  ));
