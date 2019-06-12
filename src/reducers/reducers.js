/**
 * Created by michal.grezel on 05.04.2017.
 */

import moment from 'moment';
import Joi from 'joi-browser';
import { combineReducers } from 'redux';
import { takeRight } from 'lodash';
import actionTypes from './actionTypes';
import filters from './filters';
import chart from './chart';
import userSchema from './userSchema';

/**
 * @typedef {Object} FacebookUserObject
 * @property {string} id
 * @property {string} email
 * @property {string} accessToken
 * @property {String} name
 * @property {String} first_name
 * @property {String} last_name
 * @property {String} picture_url
 */
/**
 * @param {FacebookUserObject} state
 * @param action
 * @returns {*}
 */
const user = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER: {
      const { error, value } = Joi.validate(action.value, userSchema);
      return error === null ? value : state;
    }
    case actionTypes.SIGN_OUT_USER:
      return {};
    case actionTypes.UPDATE_USER_LS:
      return Object.assign({}, state, action.value);
    default:
      return state || {};
  }
};

const spotifyUser = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SP_USER: {
      return Object.assign({}, state, action.user, {
        access_token: action.access_token,
        refresh_token: action.refresh_token,
      });
    }
    case actionTypes.SIGN_OUT_USER:
      return {};
    case actionTypes.UPDATE_SP_USER_PLAYLIST:
      return {
        ...state,
        playlists: action.playlists,
      };
    case actionTypes.UPDATE_SP_USER_LS:
      return Object.assign({}, state, action.value);
    default: {
      return state || {};
    }
  }
};
const listSort = (state = 'reaction', action) => (action.type === actionTypes.UPDATE_LIST_SORT ? action.sort : state);

const sp_playlist_name = (state = '', action) => (action.type === actionTypes.UPDATE_PLAYLIST_NAME ? action.value : state);

const lastUpdateDate = (state = '', action) => (action.type === actionTypes.UPDATE_LAST_UPDATE
  ? action.date : state);

const startDate = (state = moment(), { type, date }) => (type === actionTypes.UPDATE_START_TIME
  ? moment(date) : state);

const sinceDate = (state = moment(), { type, date }) => (type === actionTypes.UPDATE_SINCE_DATE
  ? moment(date) : state);

const untilDate = (state = moment(), { type, date }) => (type === actionTypes.UPDATE_UNTIL_DATE
  ? moment(date) : state);

const since = (state = 0, action) => (action.type === actionTypes.UPDATE_SINCE
  ? action.value : state);
const until = (state = 0, action) => (action.type === actionTypes.UPDATE_UNTIL
  ? action.value : state);
const show_wait = (state = false, action) => (action.type === actionTypes.CHANGE_SHOW_WAIT
  ? action.show : state);

const songsPerDay = (state = 3, action) => (action.type === actionTypes.UPDATE_SONGS_PER_DAY
  ? action.days : state);
/**
 * shows days from now or from selected date
 */
const showLast = (state = 31, action) => (action.type === actionTypes.UPDATE_SHOW_LAST
  ? action.days || state : state);

const errors = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_ERROR:
      return takeRight([action.value, ...state], 3);
    case actionTypes.CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

const isPlaylistPrivate = (state = false, action) => (action.type === actionTypes.TOGGLE_IS_PRIVATE
  ? action.value : state);
const sp_playlist_info = (state = { url: null, pl_name: '' }, action) => (action.type === actionTypes.UPDATE_PLAYLIST_INFO ? action.value : state);
const hasAcCookie = (state = false, action) => (action.type === actionTypes.TOGGLE_HAS_COOKIE
  ? action.value || state : state);

export const reducers = combineReducers({
  filters,
  user,
  chart,
  lastUpdateDate,
  startDate,
  showLast,
  since,
  sinceDate,
  until,
  untilDate,
  listSort,
  songsPerDay,
  spotifyUser,
  sp_playlist_name,
  show_wait,
  isPlaylistPrivate,
  sp_playlist_info,
  errors,
  hasAcCookie,
});
export default reducers;
