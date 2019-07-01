import moment from 'moment';

/**
 *
 * @param until {Date}
 * @param days {number}
 * @returns {Date}
 */
export const subtractDaysFromDate = (until, days) => {
  const sinceDate = moment(until).subtract(days, 'days');
  return sinceDate.toDate();
};

export default subtractDaysFromDate;
