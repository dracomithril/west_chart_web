/**
 * Created by Gryzli on 06.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFacebook, faSpotify } from '@fortawesome/fontawesome-free-brands';
import { faList, faTable } from '@fortawesome/fontawesome-free-solid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class ChartPresenter extends React.Component {
  state = {
    value: 0,
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
    const { viewChart, errorDays, westLetters } =
      chart.length > 0 ? filterChart(chart, filters, until, songsPerDay) : defaultValue;
    const selected = viewChart.filter(elem => elem.selected);
    sorting[listSort](selected);
    const show = !!lastUpdateDate && !!since && !!until;
    return (
      <div className={this.props.classes}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Posts" icon={<FontAwesomeIcon icon={faFacebook} />} />
            <Tab label="Playlist" icon={<FontAwesomeIcon icon={faSpotify} />} />
            <Tab label="Summary" icon={<FontAwesomeIcon icon={faList} />} />
            <Tab label="Item Four" icon={<FontAwesomeIcon icon={faTable} />} />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <div className="chart-presenter__tab-content">
              <ChartHeader errorDays={errorDays} viewChart={viewChart} />
              <div>
                {show && (
                  <UpdateInfo
                    lastUpdateDate={lastUpdateDate}
                    until={until}
                    since={since}
                    total={chart.length}
                    filtered={viewChart.length}
                  />
                )}
              </div>
              <ChartTable data={viewChart} />
            </div>
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <SpotifySearch selected={selected} />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <Summary selected={selected} />
          </TabContainer>
        )}
        {value === 3 && (
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
  classes: PropTypes.shape({ root: PropTypes.object }).isRequired,
};
export default withStyles(styles)(ChartPresenter);
