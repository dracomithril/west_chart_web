import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RowSpotifySearch from './RowSpotifySearch';
import items from '../../___data___/spotifySearchData';

storiesOf('RowSpotifySearch', module)
  .add('No props', () => <RowSpotifySearch />)
  .add('no elem found', () => (
    <RowSpotifySearch
      id="crazy_id"
      artist="Bono"
      title="Everywhere"
      full_title="Bono - Everywhere"
      onUpdateClick={action('Update click')}
      onSwap={action('Swap action')}
      onSearchClick={action('searchClick')}
    />
  ))
  .add('With props', () => (
    <RowSpotifySearch
      artist="Bono"
      id="crazy_id"
      items={items}
      full_title="Bono - Everywhere"
      selected={items[1]}
      title="Everywhere"
      onClearClick={action('clearClick')}
      onSearchClick={action('searchClick')}
      onSwap={action('Swap action')}
      onUpdateClick={action('Update click')}
    />
  ));
