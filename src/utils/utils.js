/**
 * Created by Gryzli on 28.01.2017.
 */

import qs from 'querystring';
import { groupBy } from 'lodash';

import { actionTypes } from '../reducers/actionTypes';

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
 * @returns {{viewChart: (*), errorDays: Array.<*>}}
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
      if (a.from.name < b.from.name) return -1;
      if (a.from.name > b.from.name) return 1;
      return 0;
    });
  },
  /**
   * ascending
   * @param array
   */
  when: array => {
    array.sort((a, b) => (a.createdTime ? a.createdTime.getTime() : 0) - (b.createdTime ? b.createdTime.getTime() : 0));
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
 * @param songsPerDay
 * @return {{viewChart: any[], errorDays: any[], westLetters: any[]}}
 */
export const filterChart = (chart, filters, until, songsPerDay) => {
  const news_letter_filter = filters_def.text[1];
  const westLetters = chart.filter(
    elem => (elem.message !== undefined ? elem.message.toLowerCase().includes(news_letter_filter.text) : false),
  );

  const filters_defaults = [...filters_def.control, ...filters_def.text];
  const filtersToUse = filters_defaults.map(e => {
    const filter = filters[e.input.name];
    return { check: e.check, valueName: e.valueName, until, ...filter };
  });

  const viewChart = chart.filter(elem => filtersToUse.every(filter => filter.check(elem, filter)));
  const songsPerDay2 = groupBy(viewChart, elem => new Date(elem.createdTime).toDateString());
  const errorDays = Object.keys(songsPerDay2)
    .filter(elem => songsPerDay2[elem].length !== songsPerDay)
    .map(elem => {
      const { length } = songsPerDay2[elem];
      return {
        count: length,
        color: length > songsPerDay ? 'red' : 'blue',
        org: elem,
      };
    });
  return { viewChart, errorDays, westLetters };
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

/**
 * @returns {{days: *, since: number, until: number, access_token: (string|*)}}
 * @param since
 * @param until
 * @param accessToken
 */
const getQueryParams = (since, until, accessToken) => ({
  since: since.unix(),
  until: until.unix(),
  access_token: accessToken,
});

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
  store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: true });
  const { user, sinceDate, untilDate } = store.getState();
  const query_params = getQueryParams(sinceDate, untilDate, user.accessToken);
  return getChartFromServer(query_params)
    .then(body => {
      console.info(`chart list witch ${body.chart.length}`);
      store.dispatch({ type: actionTypes.UPDATE_CHART, chart: body.chart });
      store.dispatch({ type: actionTypes.UPDATE_LAST_UPDATE, date: body.lastUpdateDate });
      store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: false });
      return Promise.resolve();
    })
    .catch(err => {
      console.error('Error in fetch chart.');
      store.dispatch({ type: actionTypes.ADD_ERROR, value: err });
      store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: false });
    });
};
