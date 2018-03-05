/**
 * Created by Gryzli on 06.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Label, Tab, Tabs } from 'react-bootstrap';
import Summary from '../Summary';
import ChartTable from './ChartTable';
import ChartHeader from './ChartHeader';
import SpotifySearch from '../SpotifySearch';
import WestLetter from '../WestLetter';
import { filterChart, sorting } from '../../utils/utils';

const UpdateInfo = ({ last_update, since, until, filtered, total }) => {
  const options = { weekday: 'short', month: '2-digit', day: 'numeric' };
  const show = last_update && since && until;
  const last_update_date = last_update ? new Date(last_update).toLocaleString('pl-PL') : 'No data';
  return (
    show && (
      <div className="update-info">
        <span>since: </span>
        <Label bsStyle="success">
          {since !== '' ? new Date(since).toLocaleDateString('pl-PL', options) : 'null'}
        </Label>
        <span> to </span>
        <Label bsStyle="danger">
          {until !== '' ? new Date(until).toLocaleDateString('pl-PL', options) : 'null'}
        </Label>
        <br />
        <span id="updateDate">{` Last update: ${last_update_date}`}</span>
        We did get <span>{total}</span> and filtered <span>{filtered}</span>
      </div>
    )
  );
};
UpdateInfo.propTypes = {
  last_update: PropTypes.string,
  since: PropTypes.string,
  until: PropTypes.string,
  total: PropTypes.number,
  filtered: PropTypes.number,
};

const ChartPresenter = (props, { store }) => {
  const { list_sort, chart, filters, until, songs_per_day, since, last_update } = store.getState();
  const defaultValue = {
    view_chart: [],
    error_days: null,
    westLetters: [],
  };
  const { view_chart, error_days, westLetters } =
    chart.length > 0 ? filterChart(chart, filters, until, songs_per_day) : defaultValue;
  const selected = view_chart.filter(elem => elem.selected);
  sorting[list_sort](selected);
  return (
    <div>
      <Tabs defaultActiveKey={0} id="chart_tabs">
        <Tab eventKey={0} title={<i className="fab fa-facebook">Posts</i>}>
          <ChartHeader error_days={error_days} view_chart={view_chart} />
          <div>
            <UpdateInfo
              last_update={last_update}
              until={until}
              since={since}
              total={chart.length}
              filtered={view_chart.length}
            />
          </div>
          <ChartTable data={view_chart} />
        </Tab>
        <Tab
          eventKey={1}
          title={
            <i className="fab fa-spotify" id="chart_playlist_tab">
              Playlist
            </i>
          }
        >
          <SpotifySearch selected={selected} />
        </Tab>
        <Tab eventKey={2} title={<i className="fas fa-list">Summary</i>}>
          <Summary selected={selected} />
        </Tab>
        <Tab eventKey={3} title={<i className="fas fa-table">West Letters</i>}>
          <WestLetter data={westLetters} />
        </Tab>
      </Tabs>
    </div>
  );
};
ChartPresenter.contextTypes = {
  store: PropTypes.object,
};
export default ChartPresenter;
