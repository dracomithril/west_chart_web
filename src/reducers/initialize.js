import moment from 'moment';

function getFacebookUser() {
  if (!window.sessionStorage) return {};
  try {
    const facebookUserString = window.sessionStorage.getItem('facebook_user');
    const user = JSON.parse(facebookUserString);
    return user ? { facebookUser: user } : {};
  } catch (e) {
    return {};
  }
}

function getStartDate() {
  const untilDate = moment();
  const sinceDate = moment(untilDate).subtract(14, 'days');
  return {
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
