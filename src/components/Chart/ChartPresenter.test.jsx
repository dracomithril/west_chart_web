// @flow
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { componentWithStyles as ChartPresenter } from './ChartPresenter';

Enzyme.configure({ adapter: new Adapter() });
describe('<ChartPresenter/>', () => {
  it('renders without crashing ChartPresenter', () => {
    const wrapper = shallow(
      <ChartPresenter viewChart={[]} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
