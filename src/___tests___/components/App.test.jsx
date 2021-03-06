import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import App from '../../App';

Enzyme.configure({ adapter: new Adapter() });
const initial_state = require('../___data___/initial_state.json');

const middlewares = [];
const mockStore = configureMockStore(middlewares);
describe('<App/>', () => {
  it('renders without crashing', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <App />, {
        context: { store },
        childContextTypes: { store: PropTypes.shape() },
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
