/**
 * Created by XKTR67 on 5/25/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import SongsPerDay from './SongsPerDay';
import FilteringOptions from '../FilteringOptions/index';
import PickYourDate from './PickYourDate2';
import '../components.css';
import './chart.css';
import { action_types } from './../../reducers/action_types';
import { UpdateChart } from '../../utils/utils';
import { chartObjectProps, errorDaysObjectProps } from './../typeDefinitions';

function selectedItem(id) {
  return { type: action_types.TOGGLE_SELECTED, id, checked: true };
}

export default class ChartHeader extends React.Component {
  onDateChange = actionType => date => {
    const { store } = this.context;
    store.dispatch({ type: actionType, date });
  };

  onDaysChange = target => {
    const { store } = this.context;
    store.dispatch({ type: action_types.UPDATE_SHOW_LAST, days: Number(target.value) });
  };

  onChange = target => {
    const { store } = this.context;
    store.dispatch({
      type: action_types.TOGGLE_ENABLE_UNTIL,
      checked: target.checked,
    });
  };

  quickSummary = () => {
    const { store } = this.context;
    UpdateChart(store)
      .then(() => {
        store.dispatch({ type: action_types.TOGGLE_FILTER, id: 'create', checked: true });
        store.dispatch({ type: action_types.UPDATE_DAYS, id: 'create', value: 5 });
        this.props.view_chart.forEach(({ id }) => {
          store.dispatch(selectedItem(id));
        });
        // store.dispatch({type: action_types.TOGGLE_ALL});
        return Promise.resolve();
      })
      .then(() => {
        const start_bt = document.getElementById('start_sp_button');
        start_bt.click();
        const gen_bt = document.getElementById('genName_sp_button');
        gen_bt.click();
        const tab = document.getElementById('chart_tabs-tab-1');
        tab.click();
      });
  };

  render() {
    const { store } = this.context;
    const { enable_until, songs_per_day, sinceDate, untilDate } = store.getState();
    const { error_days } = this.props;
    return (
      <div className="chart-header">
        <div className="chart-header__left_dock">
          <PickYourDate
            since={sinceDate}
            until={untilDate}
            checked={enable_until}
            onChange={this.onChange}
            onDaysChange={this.onDaysChange}
            onSinceDateChange={this.onDateChange(action_types.UPDATE_SINCE_DATE)}
            onUntilDateChange={this.onDateChange(action_types.UPDATE_UNTIL_DATE)}
          />
          <SongsPerDay
            error_days={error_days}
            songs_per_day={songs_per_day}
            onDaysChange={days =>
              store.dispatch({
                type: 'UPDATE_SONGS_PER_DAY',
                days,
              })
            }
          />
        </div>
        <div className="chart-header__group-buttons">
          <ButtonGroup vertical>
            <Button
              id="updateChartB"
              onClick={() => {
                UpdateChart(store);
              }}
              bsStyle="primary"
            >
              Update
            </Button>
            <Button id="quickSummary" onClick={this.quickSummary} bsStyle="success">
              Quick summary
            </Button>
          </ButtonGroup>
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
  error_days: PropTypes.arrayOf(errorDaysObjectProps),
  view_chart: PropTypes.arrayOf(chartObjectProps),
};
