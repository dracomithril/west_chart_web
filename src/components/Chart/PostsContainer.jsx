// @flow
import React from 'react';
import { TabContainer } from './TabContainer';
import ChartHeaderContainer from './ChartHeader';
import UpdateInfo from './UpdateInfo';
import ChartTableContainer from './ChartTable';
import { WaitForResult } from './WaitForResult';
import type { ChartEntry, ErrorDay } from '../../types';

type Props = {
  errorDays: ErrorDay[],
  viewChart: ChartEntry[],
  show: boolean,
  since: number,
  until: number,
  lastUpdateDateString: string,
  allCount: number,
  viewedCount: number,
  showWait: boolean,
};

export function PostsContainer(props: Props) {
  const {
    until, show, lastUpdateDateString, since, showWait, allCount, viewChart, viewedCount, errorDays,
  } = props;
  return (
    <TabContainer>
      <div className="chart-presenter__tab-content">
        <ChartHeaderContainer errorDays={errorDays} viewChart={viewChart} />
        {show && (
          <UpdateInfo
            since={since}
            until={until}
            lastUpdateDateString={lastUpdateDateString}
            allCount={allCount}
            viewedCount={viewedCount}
          />
        )}
        <ChartTableContainer
          data={viewChart}
          tableInfo={showWait ? <WaitForResult /> : undefined}
        />
      </div>
    </TabContainer>
  );
}

export default PostsContainer;
