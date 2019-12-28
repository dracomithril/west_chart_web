import Spotify_apiMock from 'spotify-web-api-node';
import { createPlaylistAndAddTracks, getUserAndPlaylists } from '../utils/spotify_utils';
import { user, playlists } from '../___data___/spotify';

jest.mock('spotify-web-api-node');
jest.mock('cookies-js');

describe('[sp_utils]', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.unmock('cookies-js');
    jest.unmock('spotify-web-api-node');
  });
  describe('[createPlaylistAndAddTracks]', () => {
    it('should react if no body from spotify', (done) => {
      Spotify_apiMock.prototype.createPlaylist.mockResolvedValueOnce({});
      createPlaylistAndAddTracks({}, '', false, [])
        .then(() => {
          done(new Error('Should throw error'));
        })
        .catch((err) => {
          expect(err.message).toBe('missing playlist');
          expect(Spotify_apiMock.prototype.createPlaylist).toBeCalled();
          done();
        });
    });
  });
  describe('getUserAndPlaylists', () => {
    it('should obtain user information', async () => {
      Spotify_apiMock.prototype.getUser.mockRejectedValueOnce(new Error('Not found'));
      await expect(getUserAndPlaylists('token', 'alaro1')).rejects.toThrow('Not found');
    });
    it('should get user and invoke getUserPlaylist', async () => {
      Spotify_apiMock.prototype.getUser.mockResolvedValueOnce({ body: user });
      Spotify_apiMock.prototype.getUserPlaylists.mockRejectedValueOnce(new Error('Problem with playlist'));

      await expect(getUserAndPlaylists('token', user.id)).rejects.toThrow('Problem with playlist');
      expect(Spotify_apiMock.prototype.getUserPlaylists).toBeCalledTimes(1);
    });
    it('should be able to obtain user playlists', async () => {
      Spotify_apiMock.prototype.getUser.mockResolvedValueOnce({ body: user });
      Spotify_apiMock.prototype.getUserPlaylists.mockResolvedValueOnce({ body: playlists });

      const result = await getUserAndPlaylists('token', user.id);
      expect(result).toHaveProperty('id', user.id);
      expect(result).toHaveProperty('total', playlists.total);
      expect(result).toHaveProperty('items.length', 1);
    });
  });
});
