// @flow
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import SongsPerDay from './SongsPerDay';
import FilteringOptions from '../FilteringOptions';
import '../components.css';
import './chart.css';
import actionTypes from '../../reducers/actionTypes';
import { weekInfo } from '../../utils/utils';
import { UpdateChart } from '../../utils/chart';
import {
  showWait,
  updateChartAction,
  updateLastUpdate,
  updateSince,
  updateSongsParDay,
  updateUntil,
} from '../../reducers/actions';
import FilterDate from './FilterDate';
import type { ErrorDay } from '../../types';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

type Props = {
  songsPerDay?: number,
  changeDays(): string,
  accessToken: string,
  classes: Object,
  errorDays?: ErrorDay[],
  updateChart(string): mixed,
  updateSinceDate(moment): mixed,
  updateUntilDate(moment): mixed,
}

type State = {
  since: moment,
  until: moment,
}

export class ChartHeader extends React.Component<Props, State> {
  static defaultProps = {
    errorDays: [],
  };

  constructor(props: Props) {
    super(props);
    const { monday, friday } = weekInfo();
    this.state = {
      since: monday,
      until: friday,
    };
  }

  componentDidMount() {
    const { since, until } = this.state;
    const { updateSinceDate, updateUntilDate } = this.props;
    updateSinceDate(since);
    updateUntilDate(until);
  }

  onDateChange = (fieldName: string) => (date: string) => {
    this.setState({ [fieldName]: moment(date) });
    const { updateUntilDate, updateSinceDate } = this.props;
    const handlers = {
      since: updateSinceDate,
      until: updateUntilDate,
    };
    handlers[fieldName](moment(date));
  };

  render() {
    const { since, until } = this.state;
    const {
      errorDays, songsPerDay, accessToken, classes, changeDays, updateChart,
    } = this.props;
    return (
      <div className="chart-header">
        <FilterDate
          since={since}
          onSinceChange={({ target }) => {
            this.onDateChange('since')(target.value);
          }}
          until={until}
          onUntilChange={({ target }) => {
            this.onDateChange('until')(target.value);
          }}
        />
        <Button
          id="updateChartB"
          variant="contained"
          className={classes.button}
          onClick={() => updateChart(accessToken)}
          color="primary"
        >
          Update
        </Button>
        <FilteringOptions />
        <SongsPerDay
          errorDays={errorDays}
          songsPerDay={songsPerDay}
          onDaysChange={changeDays}
        />
      </div>
    );
  }
}

const mapStateToProps = (state /* , ownProps */) => {
  const {
    songsPerDay, facebookUser,
  } = state;
  return {
    songsPerDay, accessToken: facebookUser.accessToken,
  };
};

const mapDispatchToProps = dispatch => ({
  changeDays: (value) => { dispatch(updateSongsParDay(value)); },
  updateSinceDate: (value) => { dispatch(updateSince(value)); },
  updateUntilDate: (value) => { dispatch(updateUntil(value)); },
  updateChart: (accessToken: string) => {
    dispatch(showWait(true));
    dispatch(updateChartAction());
    UpdateChart(accessToken)
      .then((body) => {
        console.info(`chart list witch ${body.chart.length}`);
        dispatch(updateChartAction(body.chart));
        dispatch(updateLastUpdate(body));
        dispatch(showWait(false));
        return Promise.resolve();
      })
      .catch((err) => {
        console.error('Error in fetch chart.', err.message);
        dispatch({ type: actionTypes.ADD_ERROR, value: err });
        dispatch(showWait(false));
      });
  },
});


export const containerWithStyles = withStyles(styles)(ChartHeader);
export default connect(mapStateToProps, mapDispatchToProps)(containerWithStyles);
