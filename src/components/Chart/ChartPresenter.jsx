import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faList, faTable } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import SummaryComponent from '../Summary';
import SpotifySearchComponent from '../Playlist/SpotifySearch';
import WestLetterComponent from '../WestLetter';
import filterChart from '../../utils/filtering';
import sorting from '../../utils/sorting';
import { TabContainer } from './TabContainer';
import { PostsContainer } from './PostsContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

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

export class ChartPresenter extends React.Component {
  state = {
    selectedTab: tabOptions.posts,
  };

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { selectedTab } = this.state;
    const {
      classes, listSort, chart, filters, until, songsPerDay, since, lastUpdateDate, show_wait,
    } = this.props;

    const { viewChart, errorDays, westLetters } = chart.length > 0
      ? filterChart(chart, filters, since, until, songsPerDay)
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
          <SpotifySearchComponent selected={selectedPosts} />
        </TabContainer
      >),
      [tabOptions.summary]: (
        <TabContainer>
          <SummaryComponent selected={selectedPosts} />
        </TabContainer>),
      [tabOptions.westLetter]: (
        <TabContainer>
          <WestLetterComponent data={westLetters} />
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

ChartPresenter.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
  listSort: PropTypes.string,
  chart: PropTypes.arrayOf(PropTypes.shape()),
  filters: PropTypes.shape(),
  until: PropTypes.number,
  songsPerDay: PropTypes.number,
  since: PropTypes.number,
  lastUpdateDate: PropTypes.string,
  show_wait: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {
    listSort, chart, filters, until, songsPerDay, since, lastUpdateDate, show_wait,
  } = state;
  return {
    listSort, chart, filters, until, songsPerDay, since, lastUpdateDate, show_wait,
  };
};

export const componentWithStyles = withStyles(styles)(ChartPresenter);
export default connect(mapStateToProps)(componentWithStyles);
