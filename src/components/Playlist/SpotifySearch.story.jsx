import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import SpotifySearchContainer from './SpotifySearch';
import configureStore from '../../configureStore';
import selected from '../../___data___/serach-list.json';

const state = {
  spotifyPlaylistInfo: {
    url: null,
    preview_url: null,
  },
  spotifyUser: {
    id: 'draco',
    access_token: 'what_eva',
  },
};
const emptyStore = configureStore();
const store = configureStore(state);

storiesOf('SpotifySearch', module)
  .add('empty store', () => (
    <Provider store={emptyStore}>
      <SpotifySearchContainer />
    </Provider>
  ))
  .addDecorator(story => (
    <Provider store={store}>
      {story()}
    </Provider>
  ))
  .add('More elements', () => <SpotifySearchContainer selected={selected.list} />);
