import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import RowSpotifySearch from './RowSpotifySearch';

Enzyme.configure({ adapter: new Adapter() });

describe('<RowSpotifySearch/>', () => {
  it('renders without crashing RowSpotifySearch', () => {
    const newVar = {
      id: 0, items: [], selected: [], search_id: 0,
    };
    const wrapper = shallow(
      <RowSpotifySearch search_elem={newVar} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
