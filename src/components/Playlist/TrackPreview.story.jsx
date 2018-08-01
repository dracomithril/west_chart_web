import React from 'react';
import { storiesOf } from '@storybook/react';
import TrackPreview from './TrackPreview';
import items from '../../___data___/spotifySearchData';

storiesOf('TrackPreview', module)
  .add('Todo[VR]', () => <TrackPreview />)
  .add('no preview', () => <TrackPreview {...items[0]} />)
  .add('with preview', () => <TrackPreview {...items[1]} />);
