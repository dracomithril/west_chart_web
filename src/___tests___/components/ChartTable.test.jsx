import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountToJson, shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { ChartTable } from '../../components/Chart/ChartTable2';

jest.mock('moment', () => () => ({ format: () => '2018–01–30T12:34:56+00:00', year: () => '2018' }));

Enzyme.configure({ adapter: new Adapter() });
const initial_state = require('../___data___/initial_state.json');
const data = require('../___data___/response.json').chart;

const mockStore = configureMockStore([]);

describe('<ChartTable/>', () => {
  afterAll(() => {
    jest.unmock('moment');
  });
  it('renders without crashing', () => {
    const wrapper = shallow(
      <ChartTable data={[]} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('render with objects', () => {
    const store = mockStore(initial_state);
    const wrapper = mount(
      <ChartTable data={data} />, {
        context: { store },
        childContextTypes: { store: PropTypes.shape() },
      },
    );
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
