/**
 * Created by XKTR67 on 5/25/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment/moment';
import SongsPerDay from './SongsPerDay';
import FilteringOptions from '../FilteringOptions';
import '../components.css';
import './chart.css';
import actionTypes from '../../reducers/actionTypes';
import { weekInfo } from '../../utils/utils';
import { UpdateChart } from '../../utils/chart';
import { errorDaysObjectProps } from '../typeDefinitions';

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

  componentDidMount() {
    const { since, until } = this.state;
    const { store } = this.context;
    this.updateDates(since, until, store.dispatch);
  }

  onDateChange = fieldName => (date) => {
    this.setState({ [fieldName]: moment(date) });
    const { store } = this.context;
    store.dispatch({
      type: actionTypes[`UPDATE_${fieldName.toUpperCase()}`],
      value: date.valueOf(),
    });
  };

  updateDates = (since, until, dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_UNTIL,
      value: until.valueOf(),
    });
    dispatch({
      type: actionTypes.UPDATE_SINCE,
      value: since.valueOf(),
    });
  };

  render() {
    const { store } = this.context;
    const { songsPerDay, user } = store.getState();
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
        <Button
          id="updateChartB"
          variant="contained"
          className={classes.button}
          onClick={() => {
            store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: true });
            UpdateChart(user.accessToken).then((body) => {
              console.info(`chart list witch ${body.chart.length}`);
              store.dispatch({ type: actionTypes.UPDATE_CHART, chart: body.chart });
              store.dispatch({ type: actionTypes.UPDATE_LAST_UPDATE, date: body.lastUpdateDate });
              store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: false });
              return Promise.resolve();
            })
              .catch((err) => {
                console.error('Error in fetch chart.', err.message);
                store.dispatch({ type: actionTypes.ADD_ERROR, value: err });
                store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: false });
              });
          }}
          color="primary"
        >
          Update
        </Button>
        <FilteringOptions siFnce={since} until={until} />
        <SongsPerDay
          errorDays={errorDays}
          songsPerDay={songsPerDay}
          onDaysChange={days => store.dispatch({
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
  store: PropTypes.shape(),
};

ChartHeader.propTypes = {
  classes: PropTypes.shape({ button: PropTypes.string }).isRequired,
  errorDays: PropTypes.arrayOf(errorDaysObjectProps),
};

ChartHeader.defaultProps = {
  errorDays: [],
};

export default withStyles(styles)(ChartHeader);
