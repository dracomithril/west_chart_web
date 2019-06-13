import moment from 'moment';
import reducers_jank_jard from "../../reducers/reducers_jank_jard";
import actionTypes from '../../reducers/actionTypes';

beforeAll(() => {
});
afterAll(() => {
  jest.unmock('moment');
});
beforeEach(function () {
});
afterEach(function () {
});

const defaultState = reducers_jank_jard(undefined,{id:'something'});
describe('lastUpdateDate', function () {
  Object.freeze(defaultState);
  it("should replace current state by new value", function () {
    const date = "2017-06-16T19:54:25.672Z";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_LAST_UPDATE, date: date });
    expect(resp).toHaveProperty('lastUpdateDate', date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).toHaveProperty('lastUpdateDate');
  });
  //todo  improve to check if it's date string
});
describe('show_wait', function () {
  it('should replace current state by new value', function () {
    const show_wait = false;
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.CHANGE_SHOW_WAIT, show: show_wait });
    expect(resp).toHaveProperty('show_wait',false);
  });
  it('should return current state if type don\'t match', function () {
    const date = "zzz";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, show: date });
    expect(resp).toHaveProperty('show_wait',false);
  });
});
describe('startDate', function () {
  //todo type check
  it("should replace current state by new value", function () {
    const date = moment("2017-06-16T19:54:25.672Z");
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_START_TIME, date: date });
    expect(resp).toHaveProperty('startDate',date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).not.toHaveProperty('startDate',date);
  });
});
describe('since', function () {
  it("should replace current state by new value", function () {
    const date = "2017-06-16T19:54:25.672Z";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_SINCE, value: date });
    expect(resp).toHaveProperty('since',date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).toHaveProperty('since',0);
  });
  //todo  improve to check if it's date string
});
describe('until', function () {
  it("should replace current state by new value", function () {
    const date = "2017-06-16T19:54:25.672Z";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_UNTIL, value: date });
    expect(resp).toHaveProperty('until',date);
  });
  it('should return current state if type don\'t match', function () {
    const date = "2017-06-16T19:54:25.672Z";
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, date: date });
    expect(resp).toHaveProperty('until',0);
  });
  //todo  improve to check if it's date string
});
describe('songsPerDay', function () {
  it("should replace current state by new value", function () {
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_SONGS_PER_DAY, days: 3 });
    expect(resp).toHaveProperty('songsPerDay',3);
  });
  it('should return current state if type don\'t match', function () {

    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, days: 3 });
    expect(resp).toHaveProperty('songsPerDay',3);
  });
  //todo  improve to check if it's date string
});
describe('showLast', function () {
  it("should replace current state by new value", function () {
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_SHOW_LAST, days: 33 });
    expect(resp).toHaveProperty('showLast',33);
  });
  it('should return current state if type don\'t match', function () {

    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, days: 3 });
    expect(resp).toHaveProperty('showLast',31);
  });
  //todo  improve to check if it's date string
});
describe('user', function () {
  it("should return current state if response have error", function () {
    const user = {
      error: { message: 'error' },
    };
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_USER, value: user });
    expect(resp).toHaveProperty('user',{});
  });
  it("should return current state if different type used", function () {
    const user = {
      error: { message: 'error' },
    };
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_SHOW_LAST, value: user });
    expect(resp).toHaveProperty('user',{});
  });
  it("should return updated user", function () {
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
    const { userID, signedRequest, ...expected } = user;
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_USER, value: user });
    expect(resp).toHaveProperty('user',expected);
  });
});
describe('spotifyUser', function () {
  it('should be able to update spotifyUser', function () {
    const action = {
      type: actionTypes.UPDATE_SP_USER,
      access_token: 'asdf',
      refresh_token: 'qwer',
      user: {
        id: 'zebra',
        uri: 'spotify::uri::zebra',
      },
    };

    const result = reducers_jank_jard(defaultState, action);

    const expected = {
      access_token: 'asdf',
      refresh_token: 'qwer',
      id: 'zebra',
      uri: 'spotify::uri::zebra',
    };
    expect(result).toHaveProperty('spotifyUser',expected);
  });
  it('should be able to update spotifyUser playlist', function () {
    const action = {
      type: actionTypes.UPDATE_SP_USER_PLAYLIST,
      playlists: [{}, {}],
    };

    const result = reducers_jank_jard(defaultState, action);

    const expected = {
      playlists: [{}, {}],
    };
    expect(result).toHaveProperty('spotifyUser',expected);
  });
});
describe('errors', function () {
  it('should be able to add errors to list', function () {
    const action = {
      type: actionTypes.ADD_ERROR,
      value: "NEW_ERROR",
    };

    const result = reducers_jank_jard(defaultState, action);

    const expected = [action.value];
    expect(result).toHaveProperty('errors',expected);
  });
  it('should be able to clear errors', function () {
    const action = {
      type: actionTypes.CLEAR_ERRORS,
    };

    const result = reducers_jank_jard(defaultState, action);

    const expected = [];
    expect(result).toHaveProperty('errors',expected);
  });
  it('should return default on different action', function () {
    const action = {
      type: actionTypes.TOGGLE_FILTER,
    };

    const result = reducers_jank_jard(defaultState, action);

    expect(result).toHaveProperty('errors',defaultState.errors);
  });


});
describe('isPlaylistPrivate', function () {
  it("should replace current state by new value", function () {

    const action = { type: actionTypes.TOGGLE_IS_PRIVATE, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('isPlaylistPrivate',true);
  });
  it('should return current state if type don\'t match', function () {
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('isPlaylistPrivate',defaultState.isPlaylistPrivate);
  });
});
describe('sp_playlist_info', function () {
  it("should replace current state by new value", function () {

    const action = { type: actionTypes.UPDATE_PLAYLIST_INFO, value: { url: "new_url", pl_name: "new_playlist" } };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('sp_playlist_info',action.value);
  });
  it('should return current state if type don\'t match', function () {
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('sp_playlist_info',defaultState.sp_playlist_info);
  });
});
describe('hasAcCookie', function () {
  it("should replace current state by new value", function () {
    const action = { type: actionTypes.TOGGLE_HAS_COOKIE, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('hasAcCookie',true);
  });
  it('should return current state if type don\'t match', function () {
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('hasAcCookie',defaultState.hasAcCookie);
  });
});

describe('sp_playlist_name', function () {
  it("should replace current state by new value", function () {

    const action = { type: actionTypes.UPDATE_PLAYLIST_NAME, value: "new_Name" };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('sp_playlist_name',action.value);
  });
  it('should return current state if type don\'t match', function () {
    const action = { type: actionTypes.TOGGLE_FILTER, value: "zebra" };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('sp_playlist_name',defaultState.sp_playlist_name);
  });
});
describe('listSort', function () {
  it("should replace current state by new value", function () {

    const action = { type: actionTypes.UPDATE_LIST_SORT, sort: "new_Name" };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('listSort',action.sort);
  });
  it('should return current state if type don\'t match', function () {
    const action = { type: actionTypes.TOGGLE_FILTER, value: "zebra" };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('listSort',defaultState.listSort);
  });
});


