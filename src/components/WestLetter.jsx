// @flow
import React from 'react';
import moment from 'moment';
import { getFormattedDate, weekInfo } from '../utils/utils';
import type { ChartEntry } from '../types';

type Props = {
  data?: ChartEntry[],
  week?: {
    monday: moment,
    friday: moment,
    sunday: moment,
    weekNumber: number,
    year: number,
  },
};

export function WestLetter({ data = [], week = weekInfo() }: Props) {
  const show = data.map((elem) => {
    const {
      createdTime, id,
    } = elem;
    return (
      <div style={{ padding: 2, display: 'block', border: '1px black solid' }} key={id}>
        <input type="checkbox" />
        <span hidden>
          {id}
        </span>
        <div>
          <span>
            {getFormattedDate(createdTime)}
          </span>
          <br />
          <span>
              week:
            {week.weekNumber}
          </span>
          <br />
          <span>
is added
          </span>
        </div>
      </div>
    );
  });
  return (
    <div className="west-letter">
      <div className="west-letter__beta">
        <h1>
          This site is still in beta version
        </h1>
        😃 Soon we will be able to track WestLetters in each week 😃
      </div>

      <h4>
        We have
        {' '}
        {week.weekNumber}
        {' '}
        week of
        {' '}
        {week.year}
      </h4>
      <div style={{ display: 'inline-flex' }}>
        {show}
      </div>
    </div>
  );
}

export default WestLetter;
