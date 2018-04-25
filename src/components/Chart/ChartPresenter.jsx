/**
 * Created by Gryzli on 06.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebook, faSpotify } from '@fortawesome/fontawesome-free-brands';
import { faList, faTable } from '@fortawesome/fontawesome-free-solid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

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

function TabContainer(props) {
  return (
    <Typography component="div" style={{ paddingTop: 4 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
const options = {
  posts: 'posts',
  playlist: 'playlist',
  summary: 'summary',
  westLetter: 'westLetter',
};
const tabs = [
  {
    label: 'Posts',
    value: options.posts,
    icon: <FontAwesomeIcon icon={faFacebook} />,
  },
  {
    label: 'Playlist',
    value: options.playlist,
    icon: <FontAwesomeIcon icon={faSpotify} />,
  },
  {
    label: 'Summary',
    value: options.summary,
    icon: <FontAwesomeIcon icon={faList} />,
  },
  {
    label: 'West Letter',
    value: options.westLetter,
    icon: <FontAwesomeIcon icon={faTable} />,
  },
];

class ChartPresenter extends React.Component {
  state = {
    value: options.posts,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { store } = this.context;
    const { value } = this.state;

    const { listSort, chart, filters, until, songsPerDay, since, lastUpdateDate } = store.getState();
    const defaultValue = {
      viewChart: [],
      errorDays: null,
      westLetters: [],
    };
    const tabsView = tabs.map(elem => <BottomNavigationAction key={elem.label} {...elem} />);
    const { viewChart, errorDays, westLetters } =
      chart.length > 0 ? filterChart(chart, filters, until, songsPerDay) : defaultValue;
    const selected = viewChart.filter(elem => elem.selected);
    sorting[listSort](selected);
    const show = !!lastUpdateDate && !!since && !!until;
    return (
      <div className={this.props.classes.root}>
        <div style={{ borderBottom: '1px solid' }}>
          <BottomNavigation value={value} showLabels onChange={this.handleChange}>
            {tabsView}
          </BottomNavigation>
        </div>
        {value === options.posts && (
          <TabContainer>
            <div className="chart-presenter__tab-content">
              <ChartHeader errorDays={errorDays} viewChart={viewChart} />
              {show && (
                <UpdateInfo
                  lastUpdateDate={lastUpdateDate}
                  until={until}
                  since={since}
                  total={chart.length}
                  filtered={viewChart.length}
                />
              )}
              <ChartTable data={viewChart} />
            </div>
          </TabContainer>
        )}
        {value === options.playlist && (
          <TabContainer>
            <SpotifySearch selected={selected} />
          </TabContainer>
        )}
        {value === options.summary && (
          <TabContainer>
            <Summary selected={selected} />
          </TabContainer>
        )}
        {value === options.westLetter && (
          <TabContainer>
            <WestLetter data={westLetters} />
          </TabContainer>
        )}
      </div>
    );
  }
}

ChartPresenter.contextTypes = {
  store: PropTypes.object,
};
ChartPresenter.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
};
export default withStyles(styles)(ChartPresenter);
