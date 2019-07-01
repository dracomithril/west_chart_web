import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import UpdateInfo from '../../components/Chart/UpdateInfo';

Enzyme.configure({ adapter: new Adapter() });
describe('<UpdateInfo/>', () => {
  it('renders without crashing UpdateInfo', () => {
    const wrapper = shallow(
      <UpdateInfo />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders users', () => {
    const since = new Date('2017-03-11T13:46:00.570Z').valueOf();
    const until = new Date('2017-03-11T13:46:00.570Z').valueOf();
    const wrapper = shallow(
      <UpdateInfo since={since} until={until} allCount={50} viewedCount={4} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
