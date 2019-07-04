import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { ChartTable } from './ChartTable';

Enzyme.configure({ adapter: new Adapter() });
const { chart: data } = require('../../___data___/response.json');


describe('<ChartTable/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <ChartTable data={[]} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('render with objects', () => {
    const partData = data.slice(0, 5);
    const wrapper = shallow(
      <ChartTable data={partData} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
