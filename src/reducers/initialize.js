import moment from 'moment';

function getFacebookUser() {
  const facebookUserString = sessionStorage.getItem('facebook_user');
  let facebookUser;
  try {
    const user = JSON.parse(facebookUserString);
    facebookUser = user ? { user } : {};
  } catch (e) {
    facebookUser = {};
  }
  return facebookUser;
}

function getStartDate() {
  const untilDate = moment();
  const sinceDate = untilDate.subtract(31, 'days');
  return {
    start_date: moment(),
    untilDate,
    sinceDate,
  };
}

export function initialize() {
  return {
    ...getFacebookUser(),
    ...getStartDate(),
  };
}

export default initialize;
