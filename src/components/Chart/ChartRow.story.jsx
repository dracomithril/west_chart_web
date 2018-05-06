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
      id="abcd"
      checked={false}
      reactionsNum={3}
      from={user1}
      message="sdfsjdgcvgjdcjads"
      link={{ url: 'my_link', title: 'song title' }}
      createdTime="03/16/2018"
    />
  ))
  .add('props one date, no message', () => (
    <ChartRow
      id="abcd1"
      checked={false}
      reactionsNum={3}
      from={user2}
      link={{ url: 'my_link', title: 'really long song title' }}
      createdTime="03/16/2018"
    />
  ))
  .add('props one date, no message, last year', () => (
    <ChartRow
      id="abcd2"
      reactionsNum={3}
      checked={false}
      from={user1}
      link={{ url: 'my_link', title: 'really long song title' }}
      createdTime="03/16/2018"
    />
  ))
  .add('props two dates', () => (
    <ChartRow
      id="abcd4"
      reactionsNum={3}
      from={user2}
      checked={checkedState}
      message="sdfsjdgcvgjdcjads"
      link={{ url: '#', title: 'song title' }}
      createdTime="03/16/2018"
      updatedTime="03/17/2018"
      onChange={target => {
        checkedState = target.checked;
        action('select toggled');
      }}
    />
  ))
  .add('props one date, no from, no message, last year', () => (
    <ChartRow
      id="abcd2"
      reactionsNum={3}
      checked={false}
      story="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      link={{ url: 'my_link', title: 'really long song title' }}
      createdTime="03/16/2018"
    />
  ));
