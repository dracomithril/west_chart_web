// @flow
import moment from 'moment';

export const subtractDaysFromDate = (until: string, days: number) => {
  const sinceDate = moment(until).subtract(days, 'days');
  return sinceDate.toDate();
};

export default subtractDaysFromDate;
