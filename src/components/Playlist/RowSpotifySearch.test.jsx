import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import RowSpotifySearch from './RowSpotifySearch';

Enzyme.configure({ adapter: new Adapter() });
const initial_state = require('../../___data___/initial_state.json');

const mockStore = configureMockStore([]);
describe('<RowSpotifySearch/>', () => {
  it('renders without crashing RowSpotifySearch', () => {
    const store = mockStore(initial_state);
    const newVar = {
      id: 0, items: [], selected: [], search_id: 0,
    };
    const wrapper = shallow(
      <RowSpotifySearch search_elem={newVar} />, {
        context: { store },
        childContextTypes: { store: PropTypes.shape() },
      },
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
