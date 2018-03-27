import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RowSpotifySearch from './RowSpotifySearch';

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
      selected={{
        preview_url: '',
        artists: [{ name: 'Albert' }, { name: 'Ryszard' }],
        external_urls: null,
        name: 'Zocha poaż coś',
      }}
      items={[
        {
          id: 1,
          artists: [
            {
              name: 'Albert',
            },
            {
              name: 'Ryszard',
            },
          ],
          external_urls: null,
          preview_url: '',
          name: 'Zocha pokaż coś',
        },
        {
          id: 2,
          artists: [
            {
              name: 'Albert',
            },
            {
              name: 'Ryszard',
            },
          ],
          external_urls: '',
          preview_url: null,
          name: 'Zocha pokaż coś innego',
        },
      ]}
    />
  ));
