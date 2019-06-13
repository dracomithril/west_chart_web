/**
 * Created by michal.grezel on 06.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faList, faTable } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import {
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import Summary from '../Summary';
import ChartTable from './ChartTable2';
import ChartHeader from './ChartHeader';
import SpotifySearch from '../Playlist/SpotifySearch';
import WestLetter from '../WestLetter';
import { filterChart, sorting } from '../../utils/utils';
import UpdateInfo from './UpdateInfo';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ paddingTop: 4 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const WaitForResult = ({ text = 'Please wait' }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', flexFlow: 'column-reverse',
  }}
  >
    <span style={{ padding: 10 }}>{text}</span>
    <CircularProgress />
  </div>
);
WaitForResult.propTypes = {
  text: PropTypes.string,
};

const tabOptions = {
  posts: 'posts',
  playlist: 'playlist',
  summary: 'summary',
  westLetter: 'westLetter',
};
const tabs = [
  {
    label: 'Posts',
    value: tabOptions.posts,
    icon: <FontAwesomeIcon icon={faFacebook} />,
  },
  {
    label: 'Playlist',
    value: tabOptions.playlist,
    icon: <FontAwesomeIcon icon={faSpotify} />,
  },
  {
    label: 'Summary',
    value: tabOptions.summary,
    icon: <FontAwesomeIcon icon={faList} />,
  },
  {
    label: 'West Letter',
    value: tabOptions.westLetter,
    icon: <FontAwesomeIcon icon={faTable} />,
  },
];
const options = { weekday: 'short', month: '2-digit', day: 'numeric' };
const defaultValue = {
  viewChart: [],
  errorDays: [],
  westLetters: [],
};

function PostsContainer(props) {
  const {
    until, show, lastUpdateDateString, since, showWait, allCount, viewChart, viewedCount, errorDays,
  } = props;
  return (
    <TabContainer>
      <div className="chart-presenter__tab-content">
        <ChartHeader errorDays={errorDays} viewChart={viewChart} />
        {show && (
        <UpdateInfo
          since={since}
          until={until}
          lastUpdateDateString={lastUpdateDateString}
          allCount={allCount}
          viewedCount={viewedCount}
        />
        )}
        <ChartTable
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

class ChartPresenter extends React.Component {
  state = {
    selectedTab: tabOptions.posts,
  };

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { store } = this.context;
    const { selectedTab } = this.state;
    const { classes } = this.props;

    const {
      listSort, chart, filters, until, songsPerDay, since, lastUpdateDate, show_wait,
    } = store.getState();

    const { viewChart, errorDays, westLetters } = chart.length > 0
      ? filterChart(chart, filters, until, songsPerDay)
      : defaultValue;
    const selectedPosts = viewChart.filter(elem => elem.selected);
    sorting[listSort](selectedPosts);
    const show = !!lastUpdateDate && !!since && !!until;
    const lastUpdateDateString = lastUpdateDate ? new Date(lastUpdateDate).toLocaleString('pl-PL', options) : 'No data';
    const allCount = chart.length;
    const viewedCount = viewChart.length;
    const selectableTabs = {
      [tabOptions.posts]:
  ((
    <PostsContainer
      errorDays={errorDays}
      viewChart={viewChart}
      show={show}
      since={since}
      until={until}
      lastUpdateDateString={lastUpdateDateString}
      allCount={allCount}
      viewedCount={viewedCount}
      showWait={show_wait}
    />
  )),
      [tabOptions.playlist]: (
        <TabContainer>
          <SpotifySearch selected={selectedPosts} />
        </TabContainer
      >),
      [tabOptions.summary]: (
        <TabContainer>
          <Summary selected={selectedPosts} />
        </TabContainer>),
      [tabOptions.westLetter]: (
        <TabContainer>
          <WestLetter data={westLetters} />
        </TabContainer>),
    };
    return (
      <div className={classes.root}>
        <div style={{ borderBottom: '1px solid' }}>
          <BottomNavigation value={selectedTab} showLabels onChange={this.handleChange}>
            {tabs.map(elem => <BottomNavigationAction key={elem.label} {...elem} />)}
          </BottomNavigation>
        </div>
        {selectableTabs[selectedTab]}
      </div>
    );
  }
}

ChartPresenter.contextTypes = {
  store: PropTypes.shape(),
};
ChartPresenter.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
};
export default withStyles(styles)(ChartPresenter);
