import React from 'react';
import { storiesOf } from '@storybook/react';
import UserInfo from './UserInfo';

const spotifyUser = {
  id: 'deadpool',
};
const facebookUser = {
  picture_url: '/pic/concerned_deadpool.jpg',
  first_name: 'Deadpool',
};
storiesOf('UserInfo', module).add('Todo[VR]', () => (
  <UserInfo sp_user={spotifyUser} fb_user={facebookUser} />
));
