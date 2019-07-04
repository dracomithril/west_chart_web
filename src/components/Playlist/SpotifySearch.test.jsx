import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { SpotifySearch } from './SpotifySearch';

Enzyme.configure({ adapter: new Adapter() });
const state = require('../../___data___/initial_state.json');

describe('<SpotifySearch/>', () => {
  it('renders without crashing SpotifySearch', () => {
    const wrapper = shallow(
      <SpotifySearch
        selected={[]}
        spotifyPlaylistInfo={state.spotifyPlaylistInfo}
        spotifyUser={state.spotifyUser}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
