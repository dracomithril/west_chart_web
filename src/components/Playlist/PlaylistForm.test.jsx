import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { PlaylistForm } from './PlaylistForm';

jest.mock('./../../utils/spotify_utils');
Enzyme.configure({ adapter: new Adapter() });
const data = require('../../___data___/response.json').chart;
const state = require('../../___data___/initial_state.json');

const sp_utils = require('../../utils/spotify_utils');

describe('<PlaylistForm/>', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <PlaylistForm spotifyUserId={state.spotifyUser.id} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('start_click', (done) => {
    const onStart = sinon.spy();
    sp_utils.searchForMusic.mockReturnValue(Promise.resolve({ id: 'zzz', value: {} }));
    const wrapper = shallow(
      <PlaylistForm selected={data} onStartClick={onStart} spotifyUserId={state.spotifyUser.id} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    const start_b = wrapper.find('#start_sp_button');
    start_b.simulate('click');
    sinon.assert.calledOnce(onStart);
    done();
  });
  it('createPlaylistAndAddTracks', () => {
    const onCreate = sinon.spy();
    sp_utils.createPlaylistAndAddTracks.mockReturnValue(Promise.resolve({ mock: 'mock' }));
    // const state = Object.assign({}, state, { sp_playlist_name: 'test_list_zzzz' });
    const wrapper = shallow(
      <PlaylistForm
        selected={data}
        onCreatePlaylistClick={onCreate}
        spotifyUserId={state.spotifyUser.id}
      />,
    );

    const elem = wrapper.find('#play_list_is_private');
    const getElemByIdStub = sinon.stub();
    getElemByIdStub.withArgs('play_list_is_private').returns(elem);
    // document.getElementById = getElemByIdStub;
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    const start_b = wrapper.find('#crt_pl_button');
    start_b.simulate('click');
    sinon.assert.calledOnce(onCreate);
  });
});
