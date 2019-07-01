import { groupBy } from 'lodash';
import moment from 'moment';
import filters_def from './filters_def';

const filterChart = (chart, filters, since, until, songsPerDay) => {
  const news_letter_filter = filters_def.text[1];
  const westLetters = chart.filter(elem => (elem.message !== undefined
    ? elem.message.toLowerCase().includes(news_letter_filter.text) : false));

  const filters_defaults = [...filters_def.control, ...filters_def.text];
  const filtersToUse = filters_defaults.map((e) => {
    const filter = filters[e.input.name];
    return {
      check: e.check,
      valueName: e.valueName,
      until,
      ...filter,
    };
  });

  const viewChart = chart
    .filter(elem => moment(elem.createdTime).isBetween(since, until))
    .filter(elem => filtersToUse.every(filter => filter.check(elem, filter)));
  const songsPerDay2 = groupBy(viewChart, elem => new Date(elem.createdTime).toDateString());
  const errorDays = Object.keys(songsPerDay2)
    .filter(elem => songsPerDay2[elem].length !== songsPerDay)
    .map((elem) => {
      const { length } = songsPerDay2[elem];
      return {
        count: length,
        color: length > songsPerDay ? 'red' : 'blue',
        org: elem,
      };
    });
  return { viewChart, errorDays, westLetters };
};

export default filterChart;
