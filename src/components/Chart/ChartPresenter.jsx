/**
 * Created by Gryzli on 06.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from 'react-bootstrap';
import Summary from '../Summary';
import ChartTable from './ChartTable';
import ChartHeader from './ChartHeader';
import SpotifySearch from '../Playlist/SpotifySearch';
import WestLetter from '../WestLetter';
import { filterChart, sorting } from '../../utils/utils';
import UpdateInfo from './UpdateInfo';

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
  const show = !!last_update && !!since && !!until;
  return (
    <div>
      <Tabs defaultActiveKey={0} id="chart_tabs">
        <Tab eventKey={0} title={<i className="fab fa-facebook">Posts</i>}>
          <div className="chart-presenter__tab-content">
            <ChartHeader error_days={error_days} view_chart={view_chart} />
            <div>
              {show && (
                <UpdateInfo
                  last_update={last_update}
                  until={until}
                  since={since}
                  total={chart.length}
                  filtered={view_chart.length}
                />
              )}
            </div>
            <ChartTable data={view_chart} />
          </div>
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