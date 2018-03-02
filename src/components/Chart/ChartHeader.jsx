/**
 * Created by XKTR67 on 5/25/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Label, OverlayTrigger, Popover } from 'react-bootstrap';
import SongsPerDay from './SongsPerDay';
import FilteringOptions from '../FilteringOptions/index';
import PickYourDate from './PickYourDate';
import '../components.css';
import { action_types } from './../../reducers/action_types';
import { UpdateChart } from '../../utils/utils';

const ChartButtons = ({ since, until, last_update, onGetDataClick, onQuickSummaryClick }) => {
  const show_popover = until && until && last_update;
  const PopoverInfo = () => {
    const options = { weekday: 'short', month: '2-digit', day: 'numeric' };
    const last_update_date = last_update
      ? new Date(last_update).toLocaleString('pl-PL')
      : 'No data';
    return (
      <Popover id="update_info">
        <span>since: </span>
        <Label bsStyle="success">
          {since !== '' ? new Date(since).toLocaleDateString('pl-PL', options) : 'null'}
        </Label>
        <span> to </span>
        <Label bsStyle="danger">
          {until !== '' ? new Date(until).toLocaleDateString('pl-PL', options) : 'null'}
        </Label>
        <br />
        <small id="updateDate">{` Last update: ${last_update_date}`}</small>
      </Popover>
    );
  };
  const UseOverlay = Component =>
    show_popover ? (
      <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={<PopoverInfo />} />
    ) : (
      Component
    );
  return (
    <div className="chartButtons">
      {UseOverlay(
        <ButtonGroup vertical>
          <Button id="updateChartB" onClick={onGetDataClick} bsStyle="primary">
            Update
          </Button>
          <Button id="quickSummary" onClick={onQuickSummaryClick} bsStyle="success">
            Quick summary
          </Button>
        </ButtonGroup>,
      )}
    </div>
  );
};
ChartButtons.propTypes = {
  since: PropTypes.number,
  until: PropTypes.number,
  last_update: PropTypes.string,
  onGetDataClick: PropTypes.func,
  onQuickSummaryClick: PropTypes.func,
};

function selectedItem(id) {
  return { type: action_types.TOGGLE_SELECTED, id, checked: true };
}

export default class ChartHeader extends React.Component {
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
        const tab = document.getElementById('chart_playlist_tab');
        tab.click();
      });
  };

  render() {
    const { store } = this.context;
    const {
      since,
      until,
      enable_until,
      last_update,
      songs_per_day,
      start_date,
      show_last,
    } = store.getState();
    const { error_days } = this.props;
    const onDateChange = date => {
      store.dispatch({ type: action_types.UPDATE_START_TIME, date });
    };
    const onDaysChange = target => {
      store.dispatch({ type: action_types.UPDATE_SHOW_LAST, days: Number(target.value) });
    };

    const onChange = target =>
      store.dispatch({
        type: action_types.TOGGLE_ENABLE_UNTIL,
        checked: target.checked,
      });
    return (
      <div className="chartHeader">
        <div className="dock1">
          <PickYourDate
            checked={enable_until}
            start_date={start_date}
            show_last={show_last}
            onChange={onChange}
            onDaysChange={onDaysChange}
            onDateChange={onDateChange}
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
        <ChartButtons
          since={since}
          last_update={last_update}
          until={until}
          onQuickSummaryClick={this.quickSummary}
          onGetDataClick={() => UpdateChart(store)}
        />
        <FilteringOptions />
      </div>
    );
  }
}
ChartHeader.contextTypes = {
  store: PropTypes.object,
};
ChartHeader.propTypes = {
  error_days: PropTypes.array,
  view_chart: PropTypes.array,
};
