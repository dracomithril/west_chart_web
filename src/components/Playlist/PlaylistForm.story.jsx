import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import PlaylistFormContainer from './PlaylistForm';
import configureStore from '../../configureStore';

const state = {};
const store = configureStore(state);

addDecorator(story => (
  <Provider store={store}>
    {story()}
  </Provider>
));
storiesOf('PlaylistForm', module).add('Todo[VR]', () => <PlaylistFormContainer />);
