import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import SpotifySearch from './SpotifySearch';
import configureStore from '../../configureStore';
import selected from './../../___tests___/data/serach-list.json';

const state = {
  search_list: selected.list,
  sp_playlist_info: {
    url: null,
    preview_url: null,
  },
  sp_user: {
    id: 'draco',
    access_token: 'what_eva',
  },
};
const emptyStore = configureStore();
const store = configureStore(state);

// addDecorator(story => <Provider store={store}>{story()}</Provider>);
storiesOf('SpotifySearch', module)
  // .addDecorator(story => <Provider store={emptyStore}>{story()}</Provider>)
  .add('empty store', () => (
    <Provider store={emptyStore}>
      <SpotifySearch />
    </Provider>
  ))
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('More elements', () => <SpotifySearch selected={[]} />);
