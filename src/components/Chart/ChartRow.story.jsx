import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChartRow from './ChartRow';
import { user1, user2 } from '../../___data___/chartData';

let checkedState = true;

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
      checked={false}
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
      updatedTime="03/17/2018"
      onChange={target => {
        checkedState = target.checked;
        action('select toggled');
      }}
    />
  ));
