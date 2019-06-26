import PropTypes from 'prop-types';
import React from 'react';
import { TabContainer } from './TabContainer';
import ChartHeaderContainer from './ChartHeader';
import UpdateInfo from './UpdateInfo';
import ChartTableContainer from './ChartTable2';
import { WaitForResult } from './WaitForResult';

export function PostsContainer(props) {
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

PostsContainer.propTypes = {
  errorDays: PropTypes.arrayOf(PropTypes.shape()),
  viewChart: PropTypes.arrayOf(PropTypes.shape),
  show: PropTypes.bool,
  since: PropTypes.number,
  until: PropTypes.number,
  lastUpdateDateString: PropTypes.string,
  allCount: PropTypes.number,
  viewedCount: PropTypes.number,
  showWait: PropTypes.bool,
};

export default PostsContainer;
