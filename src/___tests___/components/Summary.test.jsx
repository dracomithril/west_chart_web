import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { Summary } from '../../components/Summary';

const state = require('../___data___/initial_state.json');

Enzyme.configure({ adapter: new Adapter() });

describe('<Summary/>', () => {
  it('renders without crashing Summary', () => {
    const wrapper = shallow(
      <Summary selected={[]} spotifyPlaylistInfo={state.spotifyPlaylistInfo} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
