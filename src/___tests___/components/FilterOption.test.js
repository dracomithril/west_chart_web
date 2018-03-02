/**
 * Created by XKTR67 on 4/19/2017.
 */
import React from "react";
import FilterOption from "./../../components/FilteringOptions/FilterOption";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallowToJson} from "enzyme-to-json";
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });
describe('<FilteringOption/>', () => {
  let elem = {
    control: { name: "date_create_control", id: 'create' },
    input: { max: 31, name: "create_control" },
    valueName: "created_time",
    description: { start: 'created in last ', end: ' days' },
    type: 'countDays'
  };
  it('renders without crashing ChartPresenter', () => {
    const wrapper = shallow(
      <FilterOption id={elem.control.id}
                    name={elem.control.name}
                    desc_end={elem.description.end}
                    desc_start={elem.description.start}
      />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();

  });
  it('should be able to change state of woc checkbox', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <FilterOption id={elem.control.id}
                    name={elem.control.name}
                    desc_end={elem.description.end}
                    desc_start={elem.description.start}
                    onChange={onChange}
                    checked={true}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    const findWhere = wrapper.findWhere(n => n.props().id === 'create_checkbox');
    const wocCheckbox = findWhere.first();
    const props = wocCheckbox.props();
    expect(props.checked).toBeTruthy();
    wocCheckbox.simulate('change', { target: { id: 'create', checked: false } });
    sinon.assert.calledOnce(onChange);
  })

});
