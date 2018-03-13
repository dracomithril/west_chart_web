/**
 * Created by XKTR67 on 5/11/2017.
 */
import Spotify from 'spotify-web-api-node';
import config from './../config';

const spotifyApi = new Spotify();
const Cookies = require('cookies-js');
const _ = require('lodash');

export const addTrucksToPlaylist = (user_id, playlist_id, tracks) => {
  if (tracks.length === 0) {
    return Promise.reject(new Error('nothing was updated. Tracks count is 0'));
  } else if (tracks.length > 100) {
    /**
     *
     * @param array {Array}
     * @param count {number}
     * @returns {Array}
     */
    const sliceCount = (array, count) => {
      if (array.length > count) {
        const t1 = _.take(array, count);
        const d1 = _.drop(array, count);
        if (d1.length > 100) {
          const sliceCount2 = sliceCount(d1, count);
          return [t1, ...sliceCount2];
        }
        return [t1, d1];
      }
      return tracks;
    };

    const tz = sliceCount(tracks, 100);
    const actions = tz.map(el => spotifyApi.addTracksToPlaylist(user_id, playlist_id, el));
    return Promise.all(actions)
      .then((/* d5 */) => {
        // console.info(d5.length);
        console.info('all adding done?');
      })
      .catch(e => {
        console.error(e);
      });
  }

  return spotifyApi.addTracksToPlaylist(user_id, playlist_id, tracks);
};

export const addTrucksToPlaylistNoRepeats = (user_id, playlist_id, tracks, accessToken) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getPlaylist(user_id, playlist_id, { limit: 100 }).then(({ body }) => {
    // todo is there more  tracks in playlist?
    const pl_tracks = body.tracks.items.map(item => item.track.uri);
    const dif_tracks = _.difference(tracks, pl_tracks);
    const spotify_url = body.external_urls.spotify;
    const playlist_name = body.name;
    console.info(`Created playlist! name: ${playlist_name} url: ${spotify_url}`);
    const playlist_info = { url: spotify_url, pl_name: playlist_name };
    return addTrucksToPlaylist(user_id, body.id, dif_tracks).then(data => {
      console.info('Added tracks to playlist! ', data);
      return Promise.resolve(playlist_info);
    });
  });
};
/**
 *
 * @param accessToken
 * @param userId
 * @param sp_playlist_name
 * @param isPlaylistPrivate
 * @param tracks
 */
export const createPlaylistAndAddTracks = (
  accessToken,
  userId,
  sp_playlist_name,
  isPlaylistPrivate,
  tracks,
) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi
    .createPlaylist(userId, sp_playlist_name, { public: !isPlaylistPrivate })
    .then(({ body }) => {
      if (body) {
        const spotify_url = body.external_urls.spotify;
        const playlist_name = body.name;
        console.info(`Created playlist! name: ${playlist_name} url: ${spotify_url}`);
        const playlist_info = { url: spotify_url, pl_name: playlist_name };
        const playlist_id = body.id;
        // todo there is some problem if there is more then 100 tracks
        return addTrucksToPlaylist(userId, playlist_id, tracks).then(data => {
          console.info('Added tracks to playlist! ', data);
          return Promise.resolve(playlist_info);
        });
      }

      return Promise.reject(new Error('missing body'));
    })
    .catch(err => {
      console.error('Something went wrong!', err);
      return Promise.reject(err);
    });
};

export const getUserAndPlaylists = (accessToken, user) => {
  spotifyApi.setAccessToken(accessToken);
  let new_user;
  return spotifyApi
    .getUser(user)
    .then(data => {
      const user_id = (data.body || {}).id;
      new_user = {
        pic: (data.body.images[0] || {}).url,
        id: user_id,
      };
      // that.setState({users: updateUsers(user_id, new_user)});
      return spotifyApi.getUserPlaylists(user_id, { limit: 50 });
    })
    .then(playlist_data => {
      new_user.items = playlist_data.body.items.filter(el => el.owner.id === new_user.id);
      new_user.total = playlist_data.body.total;
      const message = `user: ${new_user.id} have ${new_user.items.length}(his own)/ total ${
        playlist_data.body.items.length
      }`;
      console.info(message);
      return Promise.resolve(new_user);
    })
    .catch(err => {
      const error = err.message === 'Not Found' ? new Error(`No user named ${user}`) : err;
      console.info('Something went wrong!', err);
      return Promise.reject(error);
    });
};
export const getTracks = (accessToken, user, playlist_name) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getPlaylist(user, playlist_name).then(data => {
    const tracks = data.body.tracks.items.map(item => item.track.uri);
    console.info('Some information about this playlist', data.body);
    return Promise.resolve(tracks);
  });
};
/**
 * serach for matching music in spotify library
 * @param artist {string}
 * @param title {string}
 * @param search_id
 * @param accessToken
 * @param store
 */
export const searchForMusic = ({ artist, title, search_id }, accessToken) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi
    .searchTracks(`${artist} ${title}`)
    .then(data =>
      Promise.resolve({
        value: data.body.tracks.items,
        id: search_id,
      }),
    )
    .catch(e => {
      console.error('error obtaining track', e.message);
    });
};

const acToken = 'wcs_sp_user_ac';
const rfToken = 'wcs_sp_user_refresh_token';
export const getCredentials = () => {
  const ac = Cookies.get(acToken);
  const refresh_token = Cookies.get(rfToken);
  const noCredentials = new Error('No credentials found');
  if (ac) {
    return validateCredentials(ac).catch(() => {
      Cookies.expire(acToken);
      return refresh_token ? refresh_auth(refresh_token) : Promise.reject(noCredentials);
    });
  } else if (refresh_token) {
    return refresh_auth(refresh_token);
  }
  return Promise.reject(noCredentials);
};

const headers = new Headers({
  'Content-Type': 'application/json',
});
export const loginToSpotifyAlpha = () =>
  fetch(config.api.spotify.login, {
    credentials: 'include',
    mode: 'no-cors',
    redirect: 'fallow',
    headers,
  })
    .then(() =>
      fetch(config.api.spotify.obtainCredentials, {
        credentials: 'include',
        mode: 'cors',
        headers,
      }),
    )
    .then(response => {
      console.info('response ok:', response.ok);
      return response.json();
    })
    .then(body => {
      const { access_token, refresh_token } = body;
      access_token && Cookies.set(acToken, access_token, { expires: 360000 });
      refresh_token && Cookies.set(rfToken, refresh_token);
      if (access_token || refresh_token)
        return Promise.resolve({ accessToken: access_token, refreshToken: refresh_token });
      return Promise.resolve();
    });

const refresh_auth = refresh_token => {
  console.info('refreshing token');
  return fetch(config.api.spotify.refreshToken, {
    method: 'POST',
    // mode: 'cors',
    body: JSON.stringify({ refresh_token }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => response.text())
    .then(auth_token => {
      Cookies.set(acToken, auth_token, { expires: 360000 });
      return validateCredentials(auth_token);
    });
};
/**
 * @param access_token
 */
const validateCredentials = access_token => {
  spotifyApi.setAccessToken(access_token);
  return spotifyApi.getMe().then(data => {
    console.info('you logged as :', data.body.id);
    return Promise.resolve({ user: data.body, access_token });
  });
};

const exports = {
  createPlaylistAndAddTracks,
  searchForMusic,
  loginToSpotifyAlpha,
  getCredentials,
  addTrucksToPlaylistNoRepeats,
  getUserAndPlaylists,
  getTracks,
};
export default exports;
