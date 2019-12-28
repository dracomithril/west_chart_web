import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import FilterOption from './FilterOption';

Enzyme.configure({ adapter: new Adapter() });
describe('<FilteringOption/>', () => {
  const elem = {
    control: { name: 'date_create_control', id: 'create' },
    input: { max: 31, name: 'create_control' },
    valueName: 'createdTime',
    description: { start: 'created in last ', end: ' days' },
    type: 'countDays',
  };
  it('renders without crashing FilteringOption', () => {
    const wrapper = shallow(
      <FilterOption
        id={elem.control.id}
        name={elem.control.name}
        descEnd={elem.description.end}
        descStart={elem.description.start}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should be able to change state of woc checkbox', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <FilterOption
        id={elem.control.id}
        name={elem.control.name}
        descEnd={elem.description.end}
        descStart={elem.description.start}
        onChange={onChange}
        checked
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    const findWhere = wrapper.findWhere(n => n.props().id === 'create_checkbox');
    const wocCheckbox = findWhere.first();
    const props = wocCheckbox.props();
    expect(props.checked).toBeTruthy();
    wocCheckbox.simulate('change', { currentTarget: { id: 'create', checked: false } });
    expect(onChange).toBeCalledTimes(1);
  });
});
