import Spotify from 'spotify-web-api-node';
import { api, hostname } from '../config';

const spotifyApi = new Spotify();
const Cookies = require('cookies-js');
const { drop, take, difference } = require('lodash');

const acToken = 'client-sp_user_access_token';
const rfToken = 'client-sp_user_refresh_token';
const noCredentials = new Error('No credentials found');

export const addTrucksToPlaylist = (user_id, playlist_id, tracks) => {
  if (tracks.length === 0) {
    return Promise.reject(new Error('nothing was updated. Tracks count is 0'));
  }
  if (tracks.length > 100) {
    /**
     *
     * @param array {Array}
     * @param count {number}
     * @returns {Array}
     */
    const sliceCount = (array, count) => {
      if (array.length > count) {
        const t1 = take(array, count);
        const d1 = drop(array, count);
        if (d1.length > 100) {
          const sliceCount2 = sliceCount(d1, count);
          return [t1, ...sliceCount2];
        }
        return [t1, d1];
      }
      return tracks;
    };
    const tz = sliceCount(tracks, 100);
    const actions = tz.map(el => spotifyApi
      .addTracksToPlaylist(playlist_id, el)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      }));
    return Promise.all(actions)
      .then((d5) => {
        console.info(d5.length);
        console.info('all adding done?', d5);
      })
      .catch((e) => {
        console.error('Promise all adding tracks', e);
      });
  }

  return spotifyApi.addTracksToPlaylist(playlist_id, tracks);
};

/**
 * @param access_token
 */
const validateCredentials = (access_token) => {
  spotifyApi.setAccessToken(access_token);
  return spotifyApi.getMe().then((data) => {
    console.info('you logged as :', data.body.id);
    return Promise.resolve({ userData: data.body, accessToken: access_token });
  });
};

export const addTrucksToPlaylistNoRepeats = (user_id, playlist_id, tracks, accessToken) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getPlaylist(user_id, playlist_id, { limit: 100 }).then(({ body: playlist }) => {
    // todo is there more  tracks in playlist?
    const pl_tracks = playlist.tracks.items.map(item => item.track.uri);
    const diffTracks = difference(tracks, pl_tracks);
    const spotify_url = playlist.external_urls.spotify;
    console.info(`Created playlist! name: ${playlist.name} url: ${spotify_url}`);
    const playlist_info = { url: spotify_url, name: playlist.name };
    return addTrucksToPlaylist(user_id, playlist.id, diffTracks).then((data) => {
      console.info('Added tracks to playlist! ', data);
      return Promise.resolve(playlist_info);
    });
  });
};
/**
 *
 * @param accessToken
 * @param userId
 * @param spotifyPlaylistName
 * @param isPlaylistPrivate
 * @param tracks
 */
export const createPlaylistAndAddTracks = (
  accessToken,
  userId,
  spotifyPlaylistName,
  isPlaylistPrivate,
  tracks,
) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi
    .createPlaylist(userId, spotifyPlaylistName, { public: !isPlaylistPrivate })
    .then(({ body: playlist }) => {
      if (!playlist) {
        return Promise.reject(new Error('missing playlist'));
      }
      const spotifyUrl = playlist.external_urls.spotify;
      console.info(`Created playlist! name: ${playlist.name} url: ${spotifyUrl}`, playlist);
      const playlist_info = { url: spotifyUrl, name: playlist.name };
      const playlist_id = playlist.id;
      // todo there is some problem if there is more then 100 tracks
      return addTrucksToPlaylist(userId, playlist_id, tracks).then((data) => {
        console.info('Added tracks to playlist! ', data);
        return Promise.resolve(playlist_info);
      });
    })
    .catch((err) => {
      console.error('Something went wrong!', err);
      return Promise.reject(err);
    });
};

export const getUserAndPlaylists = (accessToken, user) => {
  spotifyApi.setAccessToken(accessToken);
  let new_user;
  return spotifyApi
    .getUser(user)
    .then(({ body: userInfo = {} }) => {
      new_user = {
        pic: (userInfo.images[0] || {}).url,
        id: userInfo.id,
      };
      return spotifyApi.getUserPlaylists(userInfo.id, { limit: 50 });
    })
    .then(({ body }) => {
      new_user.items = body.items.filter(el => el.owner.id === new_user.id);
      new_user.total = body.total;
      const message = `user: ${new_user.id} have ${new_user.items.length}(his own)/ total ${body.items.length}`;
      console.info(message);
      return Promise.resolve(new_user);
    })
    .catch((err) => {
      const error = err.message === 'Not Found' ? new Error(`No user named ${user}`) : err;
      console.info('Something went wrong!', err);
      return Promise.reject(error);
    });
};
export const getTracks = (accessToken, user, playlist_name) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getPlaylist(user, playlist_name).then((data) => {
    const tracks = data.body.tracks.items.map(item => item.track.uri);
    console.info('Some information about this playlist', data.body);
    return Promise.resolve(tracks);
  });
};

export const getTrack = trackId => spotifyApi.getTrack(trackId);
/**
 * serach for matching music in spotify library
 * @param artist {string}
 * @param title {string}
 * @param search_id
 */
export const searchForMusic = ({ artist, title, id }) => spotifyApi
  .searchTracks(`${artist} ${title}`)
  .catch((resp) => {
    Cookies.expire(acToken);
    return Promise.reject(resp);
  })
  .then(data => Promise.resolve({
    value: data.body.tracks.items,
    id,
  }))
  .catch((e) => {
    console.error('error obtaining track', e.message);
  });
/**
 * @param refresh_token
 * @return {Promise<Spotify_credentials>}
 */
const refresh_auth = (refresh_token) => {
  console.info('refreshing token');
  return fetch(api.spotify.refreshToken, {
    method: 'POST',
    // mode: 'cors',
    body: JSON.stringify({ refresh_token }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => response.text())
    .then((auth_token) => {
      Cookies.set(acToken, auth_token, { expires: 360000 });
      return validateCredentials(auth_token);
    });
};

/**
 * @typedef {Object} Spotify_credentials
 * @property {String} accessToken
 */
/**
 * obtains cookies for spotify
 * @return {Promise<Spotify_credentials>}
 */
const getCookies = () => {
  const accessToken = Cookies.get(acToken);
  const refresh_token = Cookies.get(rfToken);
  if (accessToken) {
    return validateCredentials(accessToken).catch(() => {
      Cookies.expire(acToken);
      return refresh_token ? refresh_auth(refresh_token) : Promise.reject(noCredentials);
    });
  }
  if (refresh_token) {
    return refresh_auth(refresh_token);
  }
  return Promise.reject(noCredentials);
};

export const loginToSpotifyAlpha = from => fetch(api.spotify.login, {
  credentials: 'include',
  redirect: 'follow',
  accept: 'application/json',
})
  .then(response => (response.ok ? response.text() : Promise.reject(new Error(' No url to fallow'))))
  .then((url) => {
    console.info(url);
    if (from) {
      Cookies.set('spotify_redirect_to', from, {
        expires: 60000,
        domain: hostname || undefined,
      });
    }
    return Promise.resolve(url);
  });

export const obtain_credentials = () => fetch(api.spotify.obtainCredentials, {
  method: 'GET',
  credentials: 'include',
  accept: 'application/json',
})
  .then((response) => {
    console.info('response ok:', response.ok);
    return response.ok ? response.json() : Promise.reject(new Error(`Error in request ${response.url}`));
  })
  .then((body) => {
    const { access_token, refresh_token } = body;
    return validateCredentials(access_token).then(({ accessToken, userData }) => {
      accessToken && Cookies.set(acToken, accessToken, { expires: 360000 });
      refresh_token && Cookies.set(rfToken, refresh_token);
      return Promise.resolve({ accessToken, userData });
    });
  });

export const getCredentials = () => getCookies()
  .catch(() => obtain_credentials())
  .catch(() => Promise.reject(noCredentials));

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
