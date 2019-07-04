// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { containerWithStyles as ChartHeader } from './ChartHeader';

Enzyme.configure({ adapter: new Adapter() });
const initial_state = require('../../___data___/initial_state.json');

const mockStore = configureMockStore([]);
describe('<ChartHeader/>', () => {
  it('renders without crashing ChartHeader', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <ChartHeader errorDays={[]} />, {
        context: { store },
        childContextTypes: { store: PropTypes.shape() },
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
