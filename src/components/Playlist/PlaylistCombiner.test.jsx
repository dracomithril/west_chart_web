import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { PlaylistCombiner } from './PlaylistCombiner';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('./../../utils/spotify_utils');
const state = require('../../___data___/initial_state.json');

xdescribe('<PlaylistCombiner/>', () => {
  it('renders without crashing PlaylistCombiner', (done) => {
    state.spotifyUser.id = 'smoczek';

    const wrapper = shallow(
      <PlaylistCombiner spotifyUser={state.spotifyUser} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    done();
  });
});
