import { clone } from 'lodash';
import actionTypes from './actionTypes';

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
      const l = clone(state);
      const findIndex = l.findIndex(elem => elem.id === action.id);
      if (findIndex >= 0) {
        l[findIndex].selected = action.checked;
        return l;
      }
      return state;
    }
    case actionTypes.TOGGLE_ALL:
      return state.map((elem) => {
        const copy = clone(elem);
        copy.selected = action.value;
        return copy;
      });
    case actionTypes.CLEAR_SELECTED: {
      const entry = clone(state);
      const findIndex = entry.findIndex(elem => elem.id === action.id);
      const entry2 = entry[findIndex];
      entry2.search = updateSearch(entry2.search, action);
      return entry;
    }
    case actionTypes.UPDATE_SINGLE_SEARCH: {
      const entry = clone(state);
      const findIndex = entry.findIndex(elem => elem.id === action.id);
      const entry2 = entry[findIndex];
      entry2.search = updateSearch(entry2.search, action);
      return entry;
    }
    case actionTypes.SWAP_FIELDS: {
      const entry1 = clone(state);
      const findIndex = entry1.findIndex(elem => elem.id === action.id);
      const entry2 = entry1[findIndex];
      entry2.search = updateSearch(entry2.search, action);
      return entry1;
    }
    default:
      return state;
  }
};

export default chart;
