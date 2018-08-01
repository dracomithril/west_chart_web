import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import UserPlaylist from './UserPlaylist';
import configureStore from '../configureStore';

const state = {};
const store = configureStore(state);

addDecorator(story => (
  <Provider store={store}>
    {story()}
  </Provider>
));
storiesOf('UserPlaylist', module)
  .add('Todo[VR]', () => <UserPlaylist />)
  .add('with params', () => {
    const user = {
      items: [
        {
          id: 'zzzzz',
          name: 'zzzz',
          tracks: {
            total: 31,
          },
        },
        {
          id: 'sdasdasd',
          name: 'asdasdasd',
          tracks: {
            total: 132,
          },
        },
      ],
      id: 'draco',
      total: 5,
      pic: '/pic/user-photo-2.jpeg',
    };
    return (
      <UserPlaylist
        user={user}
        onUpdate={action('onUpdate')}
        onDelete={action('onDelete')}
        onSelect={action('onSelect')}
      />
    );
  });
