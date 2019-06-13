/**
 * Created by XKTR67 on 10/21/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import NewsLetter from "../../components/WestLetter";

const initial_state = require('../___data___/initial_state.json');
const westLettersState = require('../___data___/WestLetter.json');

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([]);
describe('<WestLetter/>', () => {
  it('renders without crashing ChartPresenter', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <NewsLetter data={[]} week={{weekNumber:31, year:2018}} />, {
        context: { store },
        childContextTypes: { store: PropTypes.object },
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();

  });
  it('renders users', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <NewsLetter data={westLettersState} week={{weekNumber:31, year:2018}} />, {
        context: { store },
        childContextTypes: { store: PropTypes.shape() },
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
