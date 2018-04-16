/**
 * Created by XKTR67 on 4/19/2017.
 */
import React from "react";
import PropTypes from "prop-types";
import PickYourDate from "../../components/Chart/PickYourDate";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from "enzyme-to-json";
import configureMockStore from "redux-mock-store";
import { UpdateChart } from '../../utils/utils';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('./../../utils/utils');
const initial_state = require('../___data___/initial_state.json');
const mockStore = configureMockStore([]);
describe('<PickYourDate/>', () => {
  afterAll(() => {
    jest.unmock('./../../utils');
  });
  it('renders without crashing', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <PickYourDate/>, {
        context: { store },
        childContextTypes: { store: PropTypes.object }
      }
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  xit('is able to click btn', () => {
    const store = mockStore(initial_state);
    const wrapper = shallow(
      <PickYourDate/>, {
        context: { store },
        childContextTypes: { store: PropTypes.object }
      }
    );
    let button = wrapper.find('#updateChartB');

    button.simulate('click');
    let actions = store.getActions();
    expect(actions.length).toBe(0);
    expect(UpdateChart.mock.calls.length).toBe(1);
  });
});
