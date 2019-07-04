// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { ChartTable } from './ChartTable';
import chart from '../../___data___/chartData';

storiesOf('ChartTable2', module)
  .add('No data', () => <ChartTable />)
  .add('with elements', () => <ChartTable data={chart} />);
