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
      search_id={2}
    />
  ))
  .add('With props', () => (
    <RowSpotifySearch
      id="crazy_id"
      artist="Bono"
      title="Everywhere"
      full_title="Bono - Everywhere"
      onUpdateClick={action('Update click')}
      onSwap={action('Swap action')}
      onSearchClick={action('searchClick')}
      onClearClick={action('clearClick')}
      search_id={1}
      selected={items[1]}
      items={items}
    />
  ));
