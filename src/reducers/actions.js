import actionTypes from './actionTypes';

export function updateSince(since) {
  return {
    type: actionTypes.UPDATE_SINCE,
    value: since.valueOf(),
  };
}

export function updateUntil(until) {
  return {
    type: actionTypes.UPDATE_UNTIL,
    value: until.valueOf(),
  };
}

export function updateSongsParDay(days) {
  return {
    type: 'UPDATE_SONGS_PER_DAY',
    days,
  };
}

export function updateChartAction(value = []) {
  return { type: actionTypes.UPDATE_CHART, chart: value };
}

export function showWait(state = true) {
  return { type: actionTypes.CHANGE_SHOW_WAIT, show: state };
}

export function updateLastUpdate(body) {
  return { type: actionTypes.UPDATE_LAST_UPDATE, date: body.lastUpdateDate };
}
