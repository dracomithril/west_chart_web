/**
 * Created by Gryzli on 28.01.2017.
 */

import qs from 'querystring';
import { groupBy } from 'lodash';

import { action_types } from '../reducers/action_types';

import filters_def, { subtractDaysFromDate } from './filters_def';

export { subtractDaysFromDate };
const cookies_name = {
  access_token: 'wcs_sp_user_ac',
  refresh_token: 'wcs_sp_user_refresh_token',
};
Object.freeze(cookies_name);
/**
 *
 * @param store
 * @returns {{view_chart: (*), error_days: Array.<*>}}
 * @private
 */

export const sorting = {
  /**
   * descending
   * @param array
   */
  reaction: array => {
    array.sort((a, b) => b.reactions_num - a.reactions_num);
  },
  /**
   * ascending
   * @param array
   */
  who: array => {
    array.sort((a, b) => {
      if (a.from_user < b.from_user) return -1;
      if (a.from_user > b.from_user) return 1;
      return 0;
    });
  },
  /**
   * ascending
   * @param array
   */
  when: array => {
    array.sort((a, b) => (a.added_time ? a.added_time.getTime() : 0) - (b.added_time ? b.added_time.getTime() : 0));
  },
  /**
   * ascending
   * @param array
   */
  what: array => {
    array.sort((a, b) => {
      if (a.link.name < b.link.name) return -1;
      if (a.link.name > b.link.name) return 1;
      return 0;
    });
  },
};
/**
 * @param chart {Array}
 * @param filters
 * @param until
 * @param songs_per_day
 * @return {{view_chart, error_days: any[], westLetters}}
 */
export const filterChart = (chart, filters, until, songs_per_day) => {
  const news_letter_filter = filters_def.text[1];
  const westLetters = chart.filter(
    elem => (elem.message !== undefined ? elem.message.toLowerCase().includes(news_letter_filter.text) : false),
  );

  const filters_defaults = [...filters_def.control, ...filters_def.text];
  const filtersToUse = filters_defaults.map(e => {
    const filter = filters[e.input.name];
    return { check: e.check, valueName: e.valueName, until, ...filter };
  });

  const view_chart = chart.filter(elem => filtersToUse.every(filter => filter.check(elem, filter)));
  const songs_per_day2 = groupBy(view_chart, elem => new Date(elem.created_time).toDateString());
  const error_days = Object.keys(songs_per_day2)
    .filter(elem => songs_per_day2[elem].length !== songs_per_day)
    .map(elem => {
      const { length } = songs_per_day2[elem];
      return {
        count: length,
        color: length > songs_per_day ? 'red' : 'blue',
        org: elem,
      };
    });
  return { view_chart, error_days, westLetters };
};
export const mapUser = (response = {}) => ({
  accessToken: response.accessToken,
  email: response.email,
  first_name: response.first_name,
  expiresIn: response.expiresIn,
  id: response.id,
  name: response.name,
  signedRequest: response.signedRequest,
  userID: response.userID,
  picture_url: ((response.picture || {}).data || {}).url,
});

export const getChartFromServer = query_params => {
  const url = `/api/fb/get_chart?${qs.stringify(query_params)}`;
  console.time('client-obtain-chart');
  return fetch(url)
    .then(resp => {
      console.info('obtained chart list');
      console.timeEnd('client-obtain-chart');
      return resp.status === 200 ? resp.json() : Promise.reject(resp);
    })
    .then(({ chart, ...other }) =>
      Promise.resolve({
        ...other,
        chart: chart.map(chartEntry => {
          const entry = getArtist_Title(chartEntry.link.title);
          return {
            ...chartEntry,
            search: {
              artist: entry.artist,
              title: entry.title,
              full_title: chartEntry.link.title,
              items: [],
              selected: {},
            },
          };
        }),
      }),
    );
};

export const getArtist_Title = name => {
  // const regex_drop_trash = /^(.*?)(?:[.\s][([](?:[A-Za-z,\s]*)[)\]])?(?:\sft.\s[a-zA-Z\s]*)?(?:[-\sa-zA-Z]*)$/g;
  const sp_regex = /^(.*?)(?:,\s.*s.*by)\s(.*?)(?:\son.*[Ss]potify)$/g;
  const split_track = /^(.*?)\s?[-|]+\s?(.*?)$/g;
  const clean_up_req = /^([\dA-Za-z'\s-]*)(?:.[([](?:[A-Za-z,\s]*)[)\]])?(?:\sft.\s[a-zA-Z\s]*)?(?:[-\sa-zA-Z]*)$/g;
  const sp = sp_regex.exec(name);
  const def_ret = { artist: null, title: name };
  if (sp && sp[1] && sp[2]) {
    return { title: sp[1], artist: sp[2] };
  }
  const z = split_track.exec(name);
  if (z && z[1] && z[2]) {
    return {
      artist: z[1],
      title: (track => {
        const t = clean_up_req.exec(track);
        return t && t[1] !== '' ? t[1] : track;
      })(z[2]),
    };
  }

  return def_ret;
};
/**
 *
 * @param enable_until {null}
 * @param start_date {Date}
 * @param show_last {Number}
 * @param user {string}
 * @returns {{days: *, since: number, until: number, access_token: (string|*)}}
 */
const getQueryParams = (enable_until, start_date, show_last, user) => {
  const until = start_date.toDate();
  const since = subtractDaysFromDate(until, show_last);
  const since2 = Math.round(since.getTime() / 1000.0);
  const until2 = Math.round(until.getTime() / 1000.0);
  return {
    days: show_last,
    since: since2,
    until: until2,
    access_token: user.accessToken,
  };
};

const weekNumber = date => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};
/**
 *
 * @param date
 * @return {{monday: Date, friday: Date, sunday: Date, weekNumber: number}}
 */
export const weekInfo = date => {
  const dayOfWeek = date.getDay();

  /**
   *
   * @param dateToChange {Date}
   * @param move {Number} how many days to add
   * @return {Date} Date after change
   */
  const moveFor = (dateToChange, move) =>
    new Date(new Date(dateToChange.getTime()).setDate(dateToChange.getDate() + move));

  const diff = 0 - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = moveFor(date, diff);
  const friday = moveFor(monday, 4);
  const sunday = moveFor(monday, 6);

  return {
    monday,
    friday,
    sunday,
    weekNumber: weekNumber(date),
  };
};
export const getFbPictureUrl = id => `https://graph.facebook.com/${id}/picture?height=50`;

export const UpdateChart = store => {
  store.dispatch({ type: action_types.CHANGE_SHOW_WAIT, show: true });
  const { user, start_date, show_last } = store.getState();
  const query_params = getQueryParams(null, start_date, show_last, user);
  store.dispatch({ type: 'UPDATE_SINCE', date: query_params.since * 1000 });
  store.dispatch({ type: 'UPDATE_UNTIL', date: query_params.until * 1000 });
  return getChartFromServer(query_params)
    .then(body => {
      console.info(`chart list witch ${body.chart.length}`);
      store.dispatch({ type: action_types.UPDATE_CHART, chart: body.chart });
      store.dispatch({ type: action_types.UPDATE_LAST_UPDATE, date: body.last_update });
      store.dispatch({ type: action_types.CHANGE_SHOW_WAIT, show: false });
      return Promise.resolve();
    })
    .catch(err => {
      console.error('Error in fetch chart.');
      store.dispatch({ type: action_types.ADD_ERROR, value: err });
      store.dispatch({ type: action_types.CHANGE_SHOW_WAIT, show: false });
    });
};
