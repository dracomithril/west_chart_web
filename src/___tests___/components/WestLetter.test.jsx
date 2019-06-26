import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import { WestLetter } from '../../components/WestLetter';

const westLettersState = require('../___data___/WestLetter.json');

Enzyme.configure({ adapter: new Adapter() });
describe('<WestLetter/>', () => {
  it('renders without crashing WestLetter', () => {
    const wrapper = shallow(
      <WestLetter data={[]} week={{ weekNumber: 31, year: 2018 }} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders users', () => {
    const wrapper = shallow(
      <WestLetter data={westLettersState} week={{ weekNumber: 31, year: 2018 }} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
