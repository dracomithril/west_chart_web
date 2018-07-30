/**
 * Created by Gryzli on 06.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebook, faSpotify } from '@fortawesome/fontawesome-free-brands';
import { faList, faTable } from '@fortawesome/fontawesome-free-solid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Summary from '../Summary';
import ChartTable from './ChartTable2';
import ChartHeader from './ChartHeader';
import SpotifySearch from '../Playlist/SpotifySearch';
import WestLetter from '../WestLetter';
import { filterChart, sorting } from '../../utils/utils';

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
class ChartPresenter extends React.Component {
  state = {
    value: tabOptions.posts,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { store } = this.context;
    const { value } = this.state;
    const { classes } = this.props;

    const { listSort, chart, filters, until, songsPerDay, since, lastUpdateDate } = store.getState();

    const tabsView = tabs.map(elem => <BottomNavigationAction key={elem.label} {...elem} />);
    const { viewChart, errorDays, westLetters } =
      chart.length > 0 ? filterChart(chart, filters, until, songsPerDay) : defaultValue;
    const selected = viewChart.filter(elem => elem.selected);
    sorting[listSort](selected);
    const show = !!lastUpdateDate && !!since && !!until;
    const lastUpdateDateString = lastUpdateDate ? new Date(lastUpdateDate).toLocaleString('pl-PL', options) : 'No data';
    return (
      <div className={classes.root}>
        <div style={{ borderBottom: '1px solid' }}>
          <BottomNavigation value={value} showLabels onChange={this.handleChange}>
            {tabsView}
          </BottomNavigation>
        </div>
        {value === tabOptions.posts && (
          <TabContainer>
            <div className="chart-presenter__tab-content">
              <ChartHeader errorDays={errorDays} viewChart={viewChart} />
              {show && (
                <div className="update-info">
                  <div id="time-frame" className="update-info__time-frame">
                    {'since: '}
                    <span style={{ color: 'blue' }}>
                      {since !== '' ? new Date(since).toLocaleDateString('pl-PL', options) : 'null'}
                    </span>
                    {' to '}
                    <span style={{ color: 'red' }}>
                      {until !== '' ? new Date(until).toLocaleDateString('pl-PL', options) : 'null'}
                    </span>
                  </div>
                  <span id="updateDate" className="update-info__span">{` Last update: ${lastUpdateDateString}`}</span>
                  <span className="update-info__span">
                    We did get {chart.length} and filtered {viewChart.length}
                  </span>
                </div>
              )}
              <ChartTable data={viewChart} />
            </div>
          </TabContainer>
        )}
        {value === tabOptions.playlist && (
          <TabContainer>
            <SpotifySearch selected={selected} />
          </TabContainer>
        )}
        {value === tabOptions.summary && (
          <TabContainer>
            <Summary selected={selected} />
          </TabContainer>
        )}
        {value === tabOptions.westLetter && (
          <TabContainer>
            <WestLetter data={westLetters} />
          </TabContainer>
        )}
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
