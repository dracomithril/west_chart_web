import Spotify_apiMock from 'spotify-web-api-node';
import { createPlaylistAndAddTracks } from '../utils/spotify_utils';

jest.mock('spotify-web-api-node');
jest.mock('cookies-js');

describe('[sp_utils]', () => {
  beforeAll(() => {
  });
  afterAll(() => {
    jest.unmock('cookies-js');
    jest.unmock('spotify-web-api-node');
  });
  describe('[createPlaylistAndAddTracks]', () => {
    it('should react if no body from spotify', (done) => {
      Spotify_apiMock.prototype.createPlaylist.mockResolvedValue({});
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
});
