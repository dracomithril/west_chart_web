import reducers_jank_jard from '../../reducers/reducers_jank_jard';
import actionTypes from '../../reducers/actionTypes';

afterAll(() => {
  jest.unmock('moment');
});

const defaultState = reducers_jank_jard(undefined, { id: 'something' });
describe('lastUpdateDate', () => {
  Object.freeze(defaultState);
  it('should replace current state by new value', () => {
    const date = '2017-06-16T19:54:25.672Z';
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.UPDATE_LAST_UPDATE,
      date,
    });
    expect(resp).toHaveProperty('lastUpdateDate', date);
  });
  it('should return current state if type don\'t match', () => {
    const date = '2017-06-16T19:54:25.672Z';
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.TOGGLE_HAS_COOKIE,
      date,
    });
    expect(resp).toHaveProperty('lastUpdateDate');
  });
  // todo  improve to check if it's date string
});
describe('show_wait', () => {
  it('should replace current state by new value', () => {
    const show_wait = false;
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.CHANGE_SHOW_WAIT,
      show: show_wait,
    });
    expect(resp).toHaveProperty('show_wait', false);
  });
  it('should return current state if type don\'t match', () => {
    const date = 'zzz';
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.TOGGLE_HAS_COOKIE,
      show: date,
    });
    expect(resp).toHaveProperty('show_wait', false);
  });
});

describe('since', () => {
  it('should replace current state by new value', () => {
    const date = '2017-06-16T19:54:25.672Z';
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_SINCE, value: date });
    expect(resp).toHaveProperty('since', date);
  });
  it('should return current state if type don\'t match', () => {
    const date = '2017-06-16T19:54:25.672Z';
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.TOGGLE_HAS_COOKIE,
      date,
    });
    expect(resp).toHaveProperty('since', 0);
  });
  // todo  improve to check if it's date string
});
describe('until', () => {
  it('should replace current state by new value', () => {
    const date = '2017-06-16T19:54:25.672Z';
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_UNTIL, value: date });
    expect(resp).toHaveProperty('until', date);
  });
  it('should return current state if type don\'t match', () => {
    const date = '2017-06-16T19:54:25.672Z';
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.TOGGLE_HAS_COOKIE,
      date,
    });
    expect(resp).toHaveProperty('until', 0);
  });
  // todo  improve to check if it's date string
});
describe('songsPerDay', () => {
  it('should replace current state by new value', () => {
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.UPDATE_SONGS_PER_DAY,
      days: 3,
    });
    expect(resp).toHaveProperty('songsPerDay', 3);
  });
  it('should return current state if type don\'t match', () => {
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, days: 3 });
    expect(resp).toHaveProperty('songsPerDay', 3);
  });
  // todo  improve to check if it's date string
});
describe('showLast', () => {
  it('should replace current state by new value', () => {
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_SHOW_LAST, days: 33 });
    expect(resp).toHaveProperty('showLast', 33);
  });
  it('should return current state if type don\'t match', () => {
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.TOGGLE_HAS_COOKIE, days: 3 });
    expect(resp).toHaveProperty('showLast', 31);
  });
  // todo  improve to check if it's date string
});
describe('user', () => {
  it('should return current state if response have error', () => {
    const user = {
      error: { message: 'error' },
    };
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_USER, value: user });
    expect(resp).toHaveProperty('user', {});
  });
  it('should return current state if different type used', () => {
    const user = {
      error: { message: 'error' },
    };
    const resp = reducers_jank_jard(defaultState, {
      type: actionTypes.UPDATE_SHOW_LAST,
      value: user,
    });
    expect(resp).toHaveProperty('user', {});
  });
  it('should return updated user', () => {
    const user = {
      accessToken: 'zzzzz',
      email: 'email',
      first_name: 'Zuza',
      last_name: 'Graba',
      expiresIn: 34567,
      id: 'zzzz1',
      name: 'Zuza Graba',
      signedRequest: 'dgaskdashd',
      userID: 'zzzz1',
      picture_url: 'http://zzzz1',
    };
    const expected = {
      accessToken: 'zzzzz',
      email: 'email',
      firstName: 'Zuza',
      id: 'zzzz1',
      lastName: 'Graba',
      name: 'Zuza Graba',
      pictureUrl: 'http://zzzz1',
      userID: 'zzzz1',
    };
    const resp = reducers_jank_jard(defaultState, { type: actionTypes.UPDATE_USER, value: user });
    expect(resp).toHaveProperty('user', expected);
  });
});
describe('spotifyUser', () => {
  it('should be able to update spotifyUser', () => {
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
    expect(result).toHaveProperty('spotifyUser', expected);
  });
  it('should be able to update spotifyUser playlist', () => {
    const action = {
      type: actionTypes.UPDATE_SP_USER_PLAYLIST,
      playlists: [{}, {}],
    };

    const result = reducers_jank_jard(defaultState, action);

    const expected = {
      playlists: [{}, {}],
    };
    expect(result).toHaveProperty('spotifyUser', expected);
  });
});
describe('errors', () => {
  it('should be able to add errors to list', () => {
    const action = {
      type: actionTypes.ADD_ERROR,
      value: 'NEW_ERROR',
    };

    const result = reducers_jank_jard(defaultState, action);

    const expected = [action.value];
    expect(result).toHaveProperty('errors', expected);
  });
  it('should be able to clear errors', () => {
    const action = {
      type: actionTypes.CLEAR_ERRORS,
    };

    const result = reducers_jank_jard(defaultState, action);

    const expected = [];
    expect(result).toHaveProperty('errors', expected);
  });
  it('should return default on different action', () => {
    const action = {
      type: actionTypes.TOGGLE_FILTER,
    };

    const result = reducers_jank_jard(defaultState, action);

    expect(result).toHaveProperty('errors', defaultState.errors);
  });
});
describe('isPlaylistPrivate', () => {
  it('should replace current state by new value', () => {
    const action = { type: actionTypes.TOGGLE_IS_PRIVATE, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('isPlaylistPrivate', true);
  });
  it('should return current state if type don\'t match', () => {
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('isPlaylistPrivate', defaultState.isPlaylistPrivate);
  });
});
describe('spotifyPlaylistInfo', () => {
  it('should replace current state by new value', () => {
    const action = {
      type: actionTypes.UPDATE_PLAYLIST_INFO,
      value: { url: 'new_url', pl_name: 'new_playlist' },
    };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('spotifyPlaylistInfo', action.value);
  });
  it('should return current state if type don\'t match', () => {
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('spotifyPlaylistInfo', defaultState.spotifyPlaylistInfo);
  });
});
describe('hasAcCookie', () => {
  it('should replace current state by new value', () => {
    const action = { type: actionTypes.TOGGLE_HAS_COOKIE, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('hasAcCookie', true);
  });
  it('should return current state if type don\'t match', () => {
    const action = { type: actionTypes.TOGGLE_FILTER, value: true };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('hasAcCookie', defaultState.hasAcCookie);
  });
});

describe('sp_playlist_name', () => {
  it('should replace current state by new value', () => {
    const action = { type: actionTypes.UPDATE_PLAYLIST_NAME, value: 'new_Name' };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('sp_playlist_name', action.value);
  });
  it('should return current state if type don\'t match', () => {
    const action = { type: actionTypes.TOGGLE_FILTER, value: 'zebra' };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('sp_playlist_name', defaultState.sp_playlist_name);
  });
});
describe('listSort', () => {
  it('should replace current state by new value', () => {
    const action = { type: actionTypes.UPDATE_LIST_SORT, sort: 'new_Name' };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('listSort', action.sort);
  });
  it('should return current state if type don\'t match', () => {
    const action = { type: actionTypes.TOGGLE_FILTER, value: 'zebra' };
    const resp = reducers_jank_jard(defaultState, action);
    expect(resp).toHaveProperty('listSort', defaultState.listSort);
  });
});
