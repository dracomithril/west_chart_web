/**
 * Created by Gryzli on 28.01.2017.
 */

import { groupBy } from 'lodash';
import moment from 'moment';

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
    array.sort((a, b) => b.reactionsNum - a.reactionsNum);
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
  if (name == null) {
    return { artist: null, title: null };
  }
  const spRegex = /^(.*?)(?:,\s.*s.*by)\s(.*?)(?:\son.*[Ss]potify)$/g;
  const removeBrackets = /\W?[([].*[)\]]\W?/g;
  const splitTrack = /^(.*?)\s?[-|]+\s?(.*?)\s?(?:\.?)?\s?(?:ft\.?\s)?(\w+\s?\w+)?$/g;
  const noBrackets = name.replace(removeBrackets, ' ');
  const sp = spRegex.exec(name);
  if (sp !== null) {
    return { title: sp[1], artist: sp[2] };
  }
  const z = splitTrack.exec(noBrackets);
  if (z && z[1] && (z[2] || z[3])) {
    return {
      artist: z[1].trim(),
      title: z[2].trim() || z[3].trim(),
    };
  }
  return { artist: null, title: name };
};

/**
 *
 * @return {{monday: Date, friday: Date, sunday: Date, weekNumber: number}}
 */
export const weekInfo = () => {
  const today = moment();
  const number = today.day();
  const isNewWeek = number >= 0 && number < 5;
  const monday = moment(today).day(isNewWeek ? -6 : 1);
  const friday = moment(today).day(isNewWeek ? -2 : 5);
  const sunday = moment(today).day(isNewWeek ? -7 : 0);
  const weekNumber = today.week();
  return {
    monday,
    friday,
    sunday,
    weekNumber,
    year: today.year(),
  };
};
export const getFbPictureUrl = id => `https://graph.facebook.com/${id}/picture?height=50`;
