/**
 * Created by XKTR67 on 4/19/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import SongsPerDay from './../../components/SongsPerDay';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
const initial_state = require('../data/initial_state.json');

const mockStore = configureMockStore([]);
describe('<SongsPerDay/>', () => {
  it('renders without crashing', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <SongsPerDay error_days={[]}/>, {
        context: { store },
        childContextTypes: { store: PropTypes.object }
      }
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();

  });
});
