import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { Provider } from 'react-redux';
import ChartRow from './ChartRow';
// import configureStore from '../../configureStore';
import { user1, user2 } from '../../___data___/chartData';

// const state = {};
// const store = configureStore(state);
let checkedState = true;
// addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('ChartRow', module)
  .add('no props', () => <ChartRow />)
  .add('props one date', () => (
    <ChartRow
      reactions_num={3}
      from={user1}
      message="sdfsjdgcvgjdcjads"
      link={{ url: 'my_link', title: 'song title' }}
      created_time="03/16/2018"
    />
  ))
  .add('props one date, no message', () => (
    <ChartRow
      reactions_num={3}
      from={user2}
      link={{ url: 'my_link', title: 'really long song title' }}
      created_time="03/16/2018"
    />
  ))
  .add('props one date, no message, last year', () => (
    <ChartRow
      reactions_num={3}
      from={user1}
      link={{ url: 'my_link', title: 'really long song title' }}
      created_time="03/16/2017"
    />
  ))
  .add('props two dates', () => (
    <ChartRow
      reactions_num={3}
      from={user2}
      message="sdfsjdgcvgjdcjads"
      link={{ url: '#', title: 'song title' }}
      checked={checkedState}
      created_time="03/16/2018"
      updated_time="03/17/2018"
      onChange={target => {
        checkedState = target.checked;
        action('select toggled');
      }}
    />
  ));
