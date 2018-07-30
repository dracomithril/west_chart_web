/**
 * Created by XKTR67 on 2017-06-26.
 */
import reducers from "../reducers/reducers";
import { actionTypes } from '../reducers/actionTypes';
import moment from 'moment';

beforeAll(() => {
});
afterAll(() => {
  jest.unmock('moment');
});
beforeEach(function () {
});
afterEach(function () {
});
describe('lastUpdateDate', function () {
  it("should replace current state by new value", function () {
    const date = "2017-06-16T19:54:25.672Z";
    const state = '';
    Object.freeze(state);
    let resp = reducers.lastUpdateDate(state, { type: actionTypes.UPDATE_LAST_UPDATE, date: date });
    expect(resp).toBe(date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const state = undefined;
    Object.freeze(state);
    let resp = reducers.lastUpdateDate(state, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).toBe('');
  });
  //todo  improve to check if it's date string
});
describe('show_wait', function () {
  it('should replace current state by new value', function () {
    const show_wait = false;
    const state = true;
    Object.freeze(state);
    let resp = reducers.show_wait(state, { type: actionTypes.CHANGE_SHOW_WAIT, show: show_wait });
    expect(resp).toBe(show_wait);
  });
  it('should return current state if type don\'t match', function () {
    const date = "zzz";
    const state = undefined;
    Object.freeze(state);
    let resp = reducers.show_wait(state, { type: actionTypes.TOGGLE_HAS_COOKIE, show: date });
    expect(resp).toBe(false);
  });
});
describe('startDate', function () {
  //todo type check
  it("should replace current state by new value", function () {
    const date = moment("2017-06-16T19:54:25.672Z");
    const state = new Date('2017-06-06');
    Object.freeze(state);
    let resp = reducers.startDate(state, { type: actionTypes.UPDATE_START_TIME, date: date });
    expect(resp).toEqual(date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const state = new Date('2017-06-06');
    Object.freeze(state);
    let resp = reducers.startDate(state, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).toBe(state);
  });
});
describe('since', function () {
  it("should replace current state by new value", function () {
    const date = "2017-06-16T19:54:25.672Z";
    const state = '';
    Object.freeze(state);
    let resp = reducers.since(state, { type: actionTypes.UPDATE_SINCE, value: date });
    expect(resp).toBe(date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const state = undefined;
    Object.freeze(state);
    let resp = reducers.since(state, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).toBe(0);
  });
  //todo  improve to check if it's date string
});
describe('until', function () {
  it("should replace current state by new value", function () {
    const date = "2017-06-16T19:54:25.672Z";
    const state = '';
    Object.freeze(state);
    let resp = reducers.until(state, { type: actionTypes.UPDATE_UNTIL, value: date });
    expect(resp).toBe(date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const state = undefined;
    Object.freeze(state);
    let resp = reducers.until(state, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).toBe(0);
  });
  //todo  improve to check if it's date string
});
describe('songsPerDay', function () {
  it("should replace current state by new value", function () {
    const state = '';
    Object.freeze(state);
    let resp = reducers.songsPerDay(state, { type: actionTypes.UPDATE_SONGS_PER_DAY, days: 3 });
    expect(resp).toBe(3);
  });
  it('should return current state if type don\'t match', function () {

    const state = undefined;
    Object.freeze(state);
    let resp = reducers.songsPerDay(state, { type: actionTypes.TOGGLE_HAS_COOKIE, days: 3 });
    expect(resp).toBe(3);
  });
  //todo  improve to check if it's date string
});
describe('showLast', function () {
  it("should replace current state by new value", function () {
    const state = 20;
    Object.freeze(state);
    let resp = reducers.showLast(state, { type: actionTypes.UPDATE_SHOW_LAST, days: 33 });
    expect(resp).toBe(33);
  });
  it('should return current state if type don\'t match', function () {

    const state = undefined;
    Object.freeze(state);
    let resp = reducers.showLast(state, { type: actionTypes.TOGGLE_HAS_COOKIE, days: 3 });
    expect(resp).toBe(31);
  });
  //todo  improve to check if it's date string
});
describe('user', function () {
  it("should return current state if response have error", function () {
    const state = {};
    const user = {
      error: { message: 'error' },
    };
    Object.freeze(state);
    let resp = reducers.user(state, { type: actionTypes.UPDATE_USER, value: user });
    expect(resp).toBe(state);
  });
  it("should return current state if different type used", function () {
    const state = {};
    const user = {
      error: { message: 'error' },
    };
    Object.freeze(state);
    let resp = reducers.user(state, { type: actionTypes.UPDATE_SHOW_LAST, value: user });
    expect(resp).toBe(state);
  });
  it("should return updated user", function () {
    const state = {};
    const user = {
      accessToken: 'zzzzz',
      email: 'email',
      first_name: 'Zuza',
      last_name: 'Graba',
      expiresIn: 34567,
      id: 'zzzz1',
      name: 'Zuza Graba',
      signedRequest: 'dgaskdashd',
      userID: "zzzzz",
      picture_url: 'http://zzzz1',
    };
    Object.freeze(state);
    const { userID, signedRequest, ...expected } = user;
    let resp = reducers.user(state, { type: actionTypes.UPDATE_USER, value: user });
    expect(resp).toEqual(expected);
  });
});
describe('filters', function () {
  it('should return initialized state', function () {
    const action = {};
    const state = undefined;
    const result = reducers.filters(state, action);
    const expected = {
      "create_control": { "checked": true, "days": 7, "id": "create", "type": "counter" },
      "less_control": { "checked": false, "days": 15, "id": "less", "type": "counter" },
      "more_control": { "checked": false, "days": 1, "id": "more", "type": "counter" },
      "update_control": { "checked": false, "days": 7, "id": "update", "type": "counter" },
      "westletter_control": { "checked": false, "id": "westLetter", "type": "text" },
      "woc_control": { "checked": false, "id": "woc", "type": "text" },
    };
    expect(result).toEqual(expected);
  });
  it('should only change selected action control [UPDATE_DAYS]', function () {
    const action = {
      type: actionTypes.UPDATE_DAYS,
      id: "add",
      value: 9,
    };
    const state = undefined;
    const result = reducers.filters(state, action);
    const expected = {
      "create_control": { "checked": true, "days": 7, "id": "create", "type": "counter" },
      "less_control": { "checked": false, "days": 15, "id": "less", "type": "counter" },
      "more_control": { "checked": false, "days": 1, "id": "more", "type": "counter" },
      "update_control": { "checked": false, "days": 7, "id": "update", "type": "counter" },
      "westletter_control": { "checked": false, "id": "westLetter", "type": "text" },
      "woc_control": { "checked": false, "id": "woc", "type": "text" },
    };
    expect(result).toEqual(expected);
  });
  it('should only change selected action control [TOGGLE_FILTER]', function () {
    const action = {
      type: actionTypes.TOGGLE_FILTER,
      id: "less",
      checked: true,
    };
    const state = {
      "create_control": { "checked": true, "days": 7, "id": "create" },
      "less_control": { "checked": false, "days": 15, "id": "less" },
      "more_control": { "checked": false, "days": 1, "id": "more" },
      "update_control": { "checked": false, "days": 7, "id": "update" },
      "woc_control": { "checked": true, "id": "woc_cb" },
      "westletter_control": { "checked": true, "id": "westletter_cb" },
    };
    Object.freeze(state);
    const result = reducers.filters(state, action);
    const expected = {
      "create_control": { "checked": true, "days": 7, "id": "create" },
      "less_control": { "checked": true, "days": 15, "id": "less" },
      "more_control": { "checked": false, "days": 1, "id": "more" },
      "update_control": { "checked": false, "days": 7, "id": "update" },
      "woc_control": { "checked": true, "id": "woc_cb" },
      "westletter_control": { "checked": true, "id": "westletter_cb" },
    };
    expect(result).toEqual(expected);
  });
  it('should return current state if type don\'t match', function () {
    const action = {
      type: actionTypes.UPDATE_USER,
      id: "less",
      checked: true,
    };
    const state = {
      "create_control": { "checked": true, "days": 7, "id": "create" },
      "less_control": { "checked": false, "days": 15, "id": "less" },
      "more_control": { "checked": false, "days": 1, "id": "more" },
      "update_control": { "checked": false, "days": 7, "id": "update" },
      "woc_control": { "checked": true, "id": "woc" },

    };
    Object.freeze(state);
    const result = reducers.filters(state, action);

    const expected = {
      "create_control": { "checked": true, "days": 7, "id": "create" },
      "less_control": { "checked": false, "days": 15, "id": "less" },
      "more_control": { "checked": false, "days": 1, "id": "more" },
      "update_control": { "checked": false, "days": 7, "id": "update" },
      "westletter_control": { "checked": false, "id": "westLetter", "type": "text" },
      "woc_control": { "checked": true, "id": "woc" },
    };
    expect(result).toEqual(expected);
  });
});
describe('spotifyUser', function () {
  it('should be able to update spotifyUser', function () {
    const state = {};
    Object.freeze(state);
    const action = {
      type: actionTypes.UPDATE_SP_USER,
      access_token: 'asdf',
      refresh_token: 'qwer',
      user: {
        id: 'zebra',
        uri: 'spotify::uri::zebra',
      },
    };

    const result = reducers.spotifyUser(state, action);

    const expected = {
      access_token: 'asdf',
      refresh_token: 'qwer',
      id: 'zebra',
      uri: 'spotify::uri::zebra',
    };
    expect(result).toEqual(expected);
  });
  it('should be able to update spotifyUser playlist', function () {
    const state = {
      access_token: 'asdf',
      refresh_token: 'qwer',
      id: 'zebra',
      uri: 'spotify::uri::zebra',
    };
    Object.freeze(state);
    const action = {
      type: actionTypes.UPDATE_SP_USER_PLAYLIST,
      playlists: [{}, {}],
    };

    const result = reducers.spotifyUser(state, action);

    const expected = {
      access_token: 'asdf',
      refresh_token: 'qwer',
      id: 'zebra',
      uri: 'spotify::uri::zebra',
      playlists: [{}, {}],
    };
    expect(result).toEqual(expected);
  });
});
describe('errors', function () {
  it('should be able to add errors to list', function () {
    const state = undefined;
    Object.freeze(state);
    const action = {
      type: actionTypes.ADD_ERROR,
      value: "NEW_ERROR",
    };

    const result = reducers.errors(state, action);

    const expected = [action.value];
    expect(result).toEqual(expected);
  });
  it('should be able to clear errors', function () {
    const state = ["Error_1", "Error_2"];
    Object.freeze(state);
    const action = {
      type: actionTypes.CLEAR_ERRORS,
    };

    const result = reducers.errors(state, action);

    const expected = [];
    expect(result).toEqual(expected);
  });
  it('should return default on diferent acrion', function () {
    const state = ["Error_1", "Error_2"];
    Object.freeze(state);
    const action = {
      type: actionTypes.TOGGLE_FILTER,
    };

    const result = reducers.errors(state, action);

    expect(result).toEqual(state);
  });


});
describe('isPlaylistPrivate', function () {
  it("should replace current state by new value", function () {

    const state = undefined;
    Object.freeze(state);
    const action = { type: actionTypes.TOGGLE_IS_PRIVATE, value: true };
    let resp = reducers.isPlaylistPrivate(state, action);
    expect(resp).toBe(true);
  });
  it('should return current state if type don\'t match', function () {
    const state = false;
    Object.freeze(state);
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    let resp = reducers.isPlaylistPrivate(state, action);
    expect(resp).toBe(state);
  });
});
describe('sp_playlist_info', function () {
  it("should replace current state by new value", function () {

    const state = undefined;
    Object.freeze(state);
    const action = { type: actionTypes.UPDATE_PLAYLIST_INFO, value: { url: "new_url", pl_name: "new_playlist" } };
    let resp = reducers.sp_playlist_info(state, action);
    expect(resp).toBe(action.value);
  });
  it('should return current state if type don\'t match', function () {
    const state = { url: "url", pl_name: "playlist" };
    Object.freeze(state);
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    let resp = reducers.sp_playlist_info(state, action);
    expect(resp).toBe(state);
  });
});
describe('hasAcCookie', function () {
  it("should replace current state by new value", function () {

    const state = undefined;
    Object.freeze(state);
    const action = { type: actionTypes.TOGGLE_HAS_COOKIE, value: true };
    let resp = reducers.hasAcCookie(state, action);
    expect(resp).toBe(true);
  });
  it('should return current state if type don\'t match', function () {
    const state = false;
    Object.freeze(state);
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    let resp = reducers.hasAcCookie(state, action);
    expect(resp).toBe(state);
  });
});

describe('sp_playlist_name', function () {
  it("should replace current state by new value", function () {

    const state = undefined;
    Object.freeze(state);
    const action = { type: actionTypes.UPDATE_PLAYLIST_NAME, value: "new_Name" };
    let resp = reducers.sp_playlist_name(state, action);
    expect(resp).toBe(action.value);
  });
  it('should return current state if type don\'t match', function () {
    const state = "name1";
    Object.freeze(state);
    const action = { type: actionTypes.TOGGLE_FILTER, value: "zebra" };
    let resp = reducers.sp_playlist_name(state, action);
    expect(resp).toBe(state);
  });
});
describe('listSort', function () {
  it("should replace current state by new value", function () {

    const state = undefined;
    Object.freeze(state);
    const action = { type: actionTypes.UPDATE_LIST_SORT, sort: "new_Name" };
    let resp = reducers.listSort(state, action);
    expect(resp).toBe(action.sort);
  });
  it('should return current state if type don\'t match', function () {
    const state = "reaction";
    Object.freeze(state);
    const action = { type: actionTypes.TOGGLE_FILTER, value: "zebra" };
    let resp = reducers.listSort(state, action);
    expect(resp).toBe(state);
  });
});


