import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import Footer from './Footer';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([]);
describe('<Footer/>', () => {
  it('renders without crashing Footer', () => {
    process.env.REACT_APP_VERSION = '0.6.3';
    const store = mockStore({});
    const wrapper = shallow(
      <Footer />, {
        context: { store },
        childContextTypes: { store: PropTypes.shape() },
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
