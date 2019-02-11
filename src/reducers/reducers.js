/**
 * Created by michal.grezel on 05.04.2017.
 */

import moment from 'moment';
import { actionTypes } from './actionTypes';

const Joi = require('joi-browser');

const _ = require('lodash');

const showDays = 7;
const userSchema = Joi.object().keys({
  id: Joi.string(),
  email: Joi.string(),
  name: Joi.string(),
  first_name: Joi.string(),
  accessToken: Joi.string(),
  expiresIn: Joi.number(),
  signedRequest: Joi.string().strip(),
  last_name: Joi.string(),
  picture_url: Joi.string(),
  userID: Joi.any().strip(),
});

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
const updateSearch = (searchElem = {}, action) => {
  const search = { ...searchElem };
  switch (action.type) {
    case actionTypes.CLEAR_SELECTED: {
      delete search.selected;
      return search;
    }
    case actionTypes.UPDATE_SINGLE_SEARCH: {
      search[action.field] = action.value;
      if (action.field === 'items') {
        search.selected = [...action.value].shift();
      }
      return search;
    }
    case actionTypes.SWAP_FIELDS: {
      const { artist, title } = searchElem;
      search.artist = title;
      search.title = artist;
      return search;
    }
    default: {
      return searchElem;
    }
  }
};
/**
 * @typedef {Object} ChartEntry
 * @property {String} createdTime
 * @property {Object} from
 * @property {String} from.first_name
 * @property {String} from.last_name
 * @property {String} from.name
 * @property {String} from.id
 * @property {String} from.picture_url
 * @property {String} id
 * @property {Number} likes_num
 * @property {Object} link
 * @property {String} link.url
 * @property {String} link.name
 * @property {String} link.title
 * @property {String} link.type
 * @property {String} message
 * @property {Number} reactionsNum
 * @property {Boolean} selected
 * @property {String} source
 * @property {String} type
 * @property {String} updatedTime
 * @property {Object} search
 * @property {String} search.artist
 * @property {String} search.title
 * @property {String} search.full_title
 * @property {Object[]} search.items
 * @property {Object} search.selected
 * @example
 * {
      "createdTime": "2018-03-09T09:21:49+0000",
      "from": {
        "first_name": "Christian",
        "last_name": "Kaller",
        "name": "Christian Kaller",
        "id": "10154923867264727"
      },
      "full_picture": "https://external.xx.fbcdn.net/safe_image.php?d=AQBhzCxlqHvNUO8L&w=1920&h=1080&url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FqdXihu6qB1s%2Fmaxresdefault.jpg&crop&_nc_hash=AQBh_gQc8-zL-A-a",
      "id": "1707149242852457_2147664518800925",
      "likes_num": 3,
      "link": {
        "url": "https://www.youtube.com/watch?v=qdXihu6qB1s",
        "name": "Ariana Grande - Focus (SJUR & Dunisco ft. Jessie Chen Cover)",
        "title": "Ariana Grande - Focus (SJUR & Dunisco ft. Jessie Chen Cover)",
        "type": "share"
      },
      "message": "https://www.youtube.com/watch?v=qdXihu6qB1s",
      "reactionsNum": 3,
      "selected": false,
      "source": "https://www.youtube.com/embed/qdXihu6qB1s?autoplay=1",
      "type": "video",
      "updatedTime": "2018-03-09T21:35:53+0000"
      "search": {
          "artist": "Ariana Grande",
          "title": "Focus",
          "full_title": "Ariana Grande - Focus (SJUR & Dunisco ft. Jessie Chen Cover)",
          "items": [],
          "selected": {},
      }
    },
 */
/**
 *
 * @param state {ChartEntry[]}
 * @param action
 * @return {*}
 */
const chart = (state = [], action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CHART:
      return [...action.chart];
    case actionTypes.TOGGLE_SELECTED: {
      const l = _.clone(state);
      const findIndex = l.findIndex(elem => elem.id === action.id);
      if (findIndex >= 0) {
        l[findIndex].selected = action.checked;
        return l;
      }
      return state;
    }
    case actionTypes.TOGGLE_ALL:
      return state.map((elem) => {
        const copy = _.clone(elem);
        copy.selected = action.value;
        return copy;
      });
    case actionTypes.CLEAR_SELECTED: {
      const entry = _.clone(state);
      const findIndex = entry.findIndex(elem => elem.id === action.id);
      const entry2 = entry[findIndex];
      entry2.search = updateSearch(entry2.search, action);
      return entry;
    }
    case actionTypes.UPDATE_SINGLE_SEARCH: {
      const entry = _.clone(state);
      const findIndex = entry.findIndex(elem => elem.id === action.id);
      const entry2 = entry[findIndex];
      entry2.search = updateSearch(entry2.search, action);
      return entry;
    }
    case actionTypes.SWAP_FIELDS: {
      const entry1 = _.clone(state);
      const findIndex = entry1.findIndex(elem => elem.id === action.id);
      const entry2 = entry1[findIndex];
      entry2.search = updateSearch(entry2.search, action);
      return entry1;
    }
    default:
      return state;
  }
};
const listSort = (state = 'reaction', action) => (action.type === actionTypes.UPDATE_LIST_SORT ? action.sort : state);

const sp_playlist_name = (state = '', action) => (action.type === actionTypes.UPDATE_PLAYLIST_NAME ? action.value : state);
/**
 *
 * @param state {string}
 * @param action {object}
 * @returns {string}
 */
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
 * @param state
 * @param action
 * @returns {number}
 */
const showLast = (state = 31, action) => (action.type === actionTypes.UPDATE_SHOW_LAST
  ? action.days : state);

/**
 *
 * @param control {Object}
 * @param action {Action}
 * @returns {*}
 */
const control_state = (control, action) => {
  if (control.id === action.id) {
    switch (action.type) {
      case actionTypes.TOGGLE_FILTER:
        return Object.assign({}, control, { checked: action.checked });
      case actionTypes.UPDATE_DAYS:
        return Object.assign({}, control, { days: action.value });
      default:
        return control;
    }
  } else {
    return control;
  }
};
const filters = (state = {}, action) => ({
  create_control: control_state(
    state.create_control || {
      checked: true,
      id: 'create',
      days: showDays,
      type: 'counter',
    },
    action,
  ),
  update_control: control_state(
    state.update_control || {
      checked: false,
      id: 'update',
      days: showDays,
      type: 'counter',
    },
    action,
  ),
  // todo less & more should be count or value it shows how many reaction was for post
  less_control: control_state(
    state.less_control || {
      checked: false,
      id: 'less',
      days: 15,
      type: 'counter',
    },
    action,
  ),
  more_control: control_state(
    state.more_control || {
      checked: false,
      id: 'more',
      days: 1,
      type: 'counter',
    },
    action,
  ),
  woc_control: control_state(state.woc_control || { checked: false, id: 'woc', type: 'text' }, action),
  westletter_control: control_state(
    state.westletter_control || { checked: false, id: 'westLetter', type: 'text' },
    action,
  ),
});
const errors = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_ERROR:
      return _.takeRight([action.value, ...state], 3);
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
  ? action.value : state);
export const reducers = {
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
};
export default reducers;
