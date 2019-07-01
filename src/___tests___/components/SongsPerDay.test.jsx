import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import SongsPerDay from '../../components/Chart/SongsPerDay';

Enzyme.configure({ adapter: new Adapter() });
const initial_state = require('../___data___/initial_state.json');

const mockStore = configureMockStore([]);
describe('<SongsPerDay/>', () => {
  it('renders without crashing SongsPerDay', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <SongsPerDay errorDays={[]} />, {
        context: { store },
        childContextTypes: { store: PropTypes.shape() },
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
