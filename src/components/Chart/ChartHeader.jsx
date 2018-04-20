/**
 * Created by XKTR67 on 5/25/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import SongsPerDay from './SongsPerDay';
import FilteringOptions from '../FilteringOptions/index';
import PickYourDate from './PickYourDate2';
// import '../components.css';
// import './chart.css';
import { actionTypes } from './../../reducers/actionTypes';
import { UpdateChart } from '../../utils/utils';
import { chartObjectProps, errorDaysObjectProps } from './../typeDefinitions';

function selectedItem(id) {
  return { type: actionTypes.TOGGLE_SELECTED, id, checked: true };
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    display: 'none',
  },
});

class ChartHeader extends React.Component {
  onDateChange = actionType => date => {
    const { store } = this.context;
    store.dispatch({ type: actionType, date });
  };

  quickSummary = () => {
    const { store } = this.context;
    UpdateChart(store)
      .then(() => {
        store.dispatch({ type: actionTypes.TOGGLE_FILTER, id: 'create', checked: true });
        store.dispatch({ type: actionTypes.UPDATE_DAYS, id: 'create', value: 5 });
        this.props.viewChart.forEach(({ id }) => {
          store.dispatch(selectedItem(id));
        });
        // store.dispatch({type: actionTypes.TOGGLE_ALL});
        return Promise.resolve();
      })
      .then(() => {
        const startSpotifyButton = document.getElementById('start_sp_button');
        startSpotifyButton.click();
        const generatePlaylistName = document.getElementById('genName_sp_button');
        generatePlaylistName.click();
        const tab = document.getElementById('chart_tabs-tab-1');
        tab.click();
      });
  };

  render() {
    const { store } = this.context;
    const { songsPerDay, sinceDate, untilDate } = store.getState();
    const { errorDays, classes } = this.props;
    return (
      <div className="chart-header">
        <div className="chart-header__left_dock">
          <PickYourDate
            since={sinceDate}
            until={untilDate}
            onSinceDateChange={this.onDateChange(actionTypes.UPDATE_SINCE_DATE)}
            onUntilDateChange={this.onDateChange(actionTypes.UPDATE_UNTIL_DATE)}
          />
          <SongsPerDay
            errorDays={errorDays}
            songsPerDay={songsPerDay}
            onDaysChange={days =>
              store.dispatch({
                type: 'UPDATE_SONGS_PER_DAY',
                days,
              })
            }
          />
        </div>
        <div className={classes.container}>
          <Button
            id="updateChartB"
            variant="raised"
            className={classes.button}
            onClick={() => {
              UpdateChart(store);
            }}
            color="primary"
          >
            Update
          </Button>
          <Button
            id="quickSummary"
            variant="raised"
            onClick={this.quickSummary}
            className={classes.button}
            color="secondary"
          >
            Quick summary
          </Button>
        </div>
        <FilteringOptions />
      </div>
    );
  }
}

ChartHeader.contextTypes = {
  store: PropTypes.object,
};

ChartHeader.propTypes = {
  classes: PropTypes.shape({ button: PropTypes.object }).isRequired,
  errorDays: PropTypes.arrayOf(errorDaysObjectProps),
  viewChart: PropTypes.arrayOf(chartObjectProps),
};

ChartHeader.defaultProps = {
  errorDays: [],
  viewChart: [],
};

export default withStyles(styles)(ChartHeader);
