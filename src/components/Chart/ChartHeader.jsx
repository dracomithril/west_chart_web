/**
 * Created by XKTR67 on 5/25/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import moment from 'moment/moment';
import SongsPerDay from './SongsPerDay';
import FilteringOptions from '../FilteringOptions';
import '../components.css';
import './chart.css';
import { actionTypes } from './../../reducers/actionTypes';
import { UpdateChart, weekInfo } from '../../utils/utils';
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class ChartHeader extends React.Component {
  constructor(props) {
    super(props);
    const { monday, friday } = weekInfo();
    this.state = {
      since: monday,
      until: friday,
    };
  }

  onDateChange = fieldName => date => {
    this.setState({ [fieldName]: moment(date) });
  };

  quickSummary = () => {
    const { store } = this.context;
    const { since, until } = this.state;
    UpdateChart(store, since, until)
      .then(() => {
        store.dispatch({ type: actionTypes.TOGGLE_FILTER, id: 'create', checked: true });
        store.dispatch({ type: actionTypes.UPDATE_DAYS, id: 'create', value: 5 });
        this.props.viewChart.forEach(({ id }) => {
          store.dispatch(selectedItem(id));
        });
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
    const { songsPerDay } = store.getState();
    const { since, until } = this.state;
    const { errorDays, classes } = this.props;
    return (
      <div className="chart-header">
        <div style={{ display: 'flex' }}>
          <TextField
            id="date"
            label="starting from"
            type="date"
            value={since.format('YYYY-MM-DD')}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={({ target }) => {
              this.onDateChange('since')(target.value);
            }}
          />
          <TextField
            id="date"
            label="until"
            type="date"
            className={classes.textField}
            value={until.format('YYYY-MM-DD')}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={({ target }) => {
              this.onDateChange('until')(target.value);
            }}
          />
        </div>
        <div className={classes.container}>
          <Button
            id="updateChartB"
            variant="raised"
            className={classes.button}
            onClick={() => {
              UpdateChart(store, since, until);
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
    );
  }
}

ChartHeader.contextTypes = {
  store: PropTypes.object,
};

ChartHeader.propTypes = {
  classes: PropTypes.shape({ button: PropTypes.string }).isRequired,
  errorDays: PropTypes.arrayOf(errorDaysObjectProps),
  viewChart: PropTypes.arrayOf(chartObjectProps),
};

ChartHeader.defaultProps = {
  errorDays: [],
  viewChart: [],
};

export default withStyles(styles)(ChartHeader);
