import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { Component as LoginAlert } from '../../components/LoginAlert/index';

Enzyme.configure({ adapter: new Adapter() });
const state = require('../___data___/initial_state.json');

describe('<Login/>', () => {
  it('renders without crashing Login', () => {
    const wrapper = shallow(
      <LoginAlert
        location={{ state: { frm: 'some_path' } }}
        spotifyUser={state.spotifyUser}
        facebookUser={state.user}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
