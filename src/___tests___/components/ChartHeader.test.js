/**
 * Created by Gryzli on 18.06.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ChartHeader from '../../components/Chart/ChartHeader';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
const initial_state = require('../___data___/initial_state.json');
const mockStore = configureMockStore([]);
describe('<ChartHeader/>', () => {
  it('renders without crashing ChartPresenter', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <ChartHeader errorDays={[]}/>, {
        context: { store },
        childContextTypes: { store: PropTypes.object }
      }
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();

  });

});
