import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { componentWithStyles as FilteringOptions } from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('<FilteringOptions/>', () => {
  it('renders without crashing FilteringOptions', () => {
    const wrapper = shallow(
      <FilteringOptions />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
