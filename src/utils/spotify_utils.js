// @flow
import Spotify from 'spotify-web-api-node';
import { hostname } from '../config';
import { cookieAccessToken, cookieRefreshToken } from './consts';
import type { PlaylistInfoType } from '../types';
import { login, obtainCredentials, refreshAuth } from '../providers/wcs_api';
import type { SpotifyUser } from '../types/spotify';

const spotifyApi = new Spotify();
const Cookies = require('cookies-js');
const { drop, take, difference } = require('lodash');

const noCredentials = new Error('No credentials found');

export const addTrucksToPlaylist = (userId: string, playlistId: string, tracks: string[]) => {
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
      .addTracksToPlaylist(playlistId, el)
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

  return spotifyApi.addTracksToPlaylist(playlistId, tracks);
};

type SpotifyAccess = {
  userData: SpotifyUser,
  accessToken: string
};
/**
 * @param access_token
 */
const validateCredentials = async (access_token: string): Promise<SpotifyAccess> => {
  spotifyApi.setAccessToken(access_token);
  return spotifyApi.getMe().then((data) => {
    console.info('you logged as :', data.body.id);
    return Promise.resolve({ userData: data.body, accessToken: access_token });
  });
};

export const addTrucksToPlaylistNoRepeats = (
  userId: string,
  playlistId: string,
  tracks: string [],
  accessToken: string,
) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getPlaylist(userId, playlistId, { limit: 100 })
    .then(({ body: playlist }) => {
    // todo is there more  tracks in playlist?
      const pl_tracks = playlist.tracks.items.map(item => item.track.uri);
      const diffTracks = difference(tracks, pl_tracks);
      const spotify_url = playlist.external_urls.spotify;
      console.info(`Created playlist! name: ${playlist.name} url: ${spotify_url}`);
      const playlist_info = { url: spotify_url, name: playlist.name };
      return addTrucksToPlaylist(userId, playlist.id, diffTracks).then((data) => {
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
  accessToken: string,
  userId: string,
  spotifyPlaylistName: string,
  isPlaylistPrivate: boolean,
  tracks: string[],
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
      const playlist_info: PlaylistInfoType = { url: spotifyUrl, name: playlist.name };
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

export const getUserAndPlaylists = async (accessToken: string, user: string) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi
    .getUser(user)
    .then(({ body: userInfo = {} }) => {
      const new_user = {
        pic: (userInfo.images[0] || {}).url,
        id: userInfo.id,
      };
      return spotifyApi.getUserPlaylists(userInfo.id, { limit: 50 })
        .then(({ body }) => {
          const userPlaylists = body.items.filter(el => el.owner.id === new_user.id);
          return {
            ...new_user,
            items: userPlaylists,
            all: body.items,
            total: body.total,
          };
        });
    })
    .then((userInfo) => {
      const { id, items, all } = userInfo;
      const message = `user: ${id} have ${items.length}(his own)/ total ${all.length}`;
      console.info(message);
      return userInfo;
    })
    .catch((err) => {
      const error = err.message === 'Not Found' ? new Error(`No user named ${user}`) : err;
      console.info('Something went wrong!', err);
      return Promise.reject(error);
    });
};

export const getTracks = (accessToken: string, user: string, playlistName: string) => {
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi.getPlaylist(user, playlistName)
    .then(({ body }) => {
      const tracks = body.tracks.items.map(item => item.track.uri);
      console.info('Some information about this playlist', body);
      return Promise.resolve(tracks);
    });
};

export const getTrack = (trackId: string) => spotifyApi.getTrack(trackId);

/**
 * serach for matching music in spotify library
 * @param artist {string}
 * @param title {string}
 * @param search_id
 */
export const searchForMusic = ({ artist, title, id }: {
  artist?: string, title?: string, id: string
}) => spotifyApi
  .searchTracks(`${artist || ''} ${title || ''}`)
  .catch((resp) => {
    Cookies.expire(cookieAccessToken);
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
 * @param refreshToken
 * @return {Promise<Spotify_credentials>}
 */
const refresh_auth = (refreshToken: string): Promise<SpotifyAccess> => {
  console.info('refreshing token');
  return refreshAuth(refreshToken)
    .then((authToken) => {
      Cookies.set(cookieAccessToken, authToken, { expires: 360000 });
      return validateCredentials(authToken);
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
const getCookies = async (): Promise<SpotifyAccess> => {
  const accessToken = Cookies.get(cookieAccessToken);
  const refresh_token = Cookies.get(cookieRefreshToken);
  if (accessToken) {
    return validateCredentials(accessToken)
      .catch(() => {
        Cookies.expire(accessToken);
        return refresh_token
          ? refresh_auth(refresh_token)
          : Promise.reject(noCredentials);
      });
  }
  if (refresh_token) {
    return refresh_auth(refresh_token);
  }
  return Promise.reject(noCredentials);
};

export const loginToSpotify = (address: string) => login()
  .then((url) => {
    if (address) {
      Cookies.set('spotify_redirect_to', address, {
        expires: 60000,
        domain: hostname || undefined,
      });
    }
    return Promise.resolve(url);
  });

export const obtain_credentials = () => obtainCredentials()
  .then((body) => {
    const { access_token, refresh_token } = body;
    return validateCredentials(access_token).then(({ accessToken, userData }) => {
      accessToken && Cookies.set(accessToken, accessToken, { expires: 360000 });
      refresh_token && Cookies.set(cookieRefreshToken, refresh_token);
      return Promise.resolve({ accessToken, userData });
    });
  });

export const getCredentials = async (): Promise<SpotifyAccess> => getCookies()
  .catch(() => obtain_credentials())
  .catch(() => Promise.reject(noCredentials));

const spotifyUtils = {
  createPlaylistAndAddTracks,
  searchForMusic,
  loginToSpotify,
  getCredentials,
  addTrucksToPlaylistNoRepeats,
  getUserAndPlaylists,
  getTracks,
};
export default spotifyUtils;
