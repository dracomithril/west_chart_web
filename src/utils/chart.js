/*
 * Created by Gryzli on 24.01.2017.
 */
import path from 'path';
import querystring from 'querystring';
import urlRegex from 'url-regex';
import { getArtist_Title } from './utils';
import { getTrack } from './spotify_utils';

import { facebookGroup } from '../config';
import { actionTypes } from '../reducers/actionTypes';


const url = require('url');

const apiVer = process.env.FB_API_VERSION || 'v3.0';
const limit = 100;
const fieldsArr = [
  'story',
  'from{first_name,last_name,name,id}',
  'link',
  'caption',
  'icon',
  'created_time',
  'source',
  'name',
  'type',
  'message',
  'attachments',
  'full_picture',
  'updated_time',
  'likes.limit(1).summary(true)',
  'reactions.limit(1).summary(true)',
  'comments.limit(50).summary(true){message,from}',
];
const fields = fieldsArr.join(',');

const getFbPictureUrl = id => `https://graph.facebook.com/${id}/picture?height=50`;

/**
 *
 * @param since {string}
 * @param until {string}
 * @param groupId {string}
 * @param accessToken {string}
 */
function obtainList(since, until, groupId, accessToken) {
  const address = 'https://graph.facebook.com';

  const query = {
    fields,
    limit,
    access_token: accessToken,
    since,
    until,
  };
  const pathname = path.resolve('/', apiVer, groupId, 'feed');
  const addr = url.resolve(address, pathname);
  const urlObject = url.parse(addr);
  urlObject.port = '443';
  urlObject.protocol = 'https';
  urlObject.search = querystring.stringify(query);

  // todo modify to use reject errors resolveWithFullResponse: false
  return fetch(url.format(urlObject))
    .then(res => (res.ok ? res.json() : { body: { data: [] } }))
    .catch((err) => {
      console.error(`error obtaining chart list. statusCode: ${err.statusCode} body: ${err.sub_error}`);
      return Promise.reject(err);
    });
}

function getAttachment(elem) {
  return ((elem.attachments || {}).data || []).length > 0 ? elem.attachments.data[0] : {};
}

function getFrom(elem) {
  if (elem.from) {
    const { id } = elem.from;
    return { ...elem.from, picture_url: getFbPictureUrl(id) };
  }
  return {};
}

function getLinkFromMessage(elem) {
  const linkFromMessage = (elem.message || '').match(urlRegex());
  return linkFromMessage !== null ? linkFromMessage[0] : linkFromMessage;
}

const getSpotifyTrackInfo = async (linkFromMessage) => {
  const trackId = /https?:\/\/open\.spotify.com\/track\/(.*)\?(.*)/g.exec(linkFromMessage || '');
  return trackId ? getTrack(trackId[1]) : {};
};

function getLink(elem, linkFromMessage, body, attachment) {
  return {
    url: elem.link || linkFromMessage,
    name: elem.name || body.name,
    title: attachment.type === 'music_aggregation' ? attachment.description : attachment.title || body.name || linkFromMessage,
    type: attachment.type,
  };
}

const formatResponse = async ({ data }) => Promise.all(data.map((elem) => {
  const attachment = getAttachment(elem);
  const from = getFrom(elem);
  const story = (elem.story || '').replace(/\sshared.*West.*Chart./, '');
  const linkFromMessage = getLinkFromMessage(elem);
  const reactionsNum = elem.reactions.summary.total_count;
  const assemble = ({ body = {} }) => {
    const link = getLink(elem, linkFromMessage, body, attachment);
    const entry = getArtist_Title(link.title);
    const searchElement = {
      artist: entry.artist || ((body.artists || [])[0] || {}).name,
      title: entry.title || body.name,
      full_title: link.title || body.name,
      items: [],
      selected: {},
    };
    return ({
      createdTime: elem.created_time,
      from,
      story,
      id: elem.id,
      link,
      message: elem.message,
      reactionsNum,
      selected: false,
      source: elem.source,
      type: elem.type,
      updatedTime: elem.updated_time,
      search: searchElement,
    });
  };
  return getSpotifyTrackInfo(linkFromMessage)
    .catch((err) => {
      console.error(err.message);
      return Promise.resolve({});
    })
    .then(assemble);
}));

/**
 *
 * @param since {string}
 * @param until {string}
 * @param access_token {string}
 */
function fbChart(since, until, access_token) {
  return obtainList(since, until, facebookGroup, access_token)
    .then(formatResponse)
    .then((body) => {
      const cache = {
        chart: body,
        lastUpdateDate: new Date().toISOString(),
      };
      return Promise.resolve(cache);
    });
}

export const UpdateChart = (store, since, until) => {
  store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: true });
  const { user } = store.getState();
  return fbChart(since.unix(), until.unix(), user.accessToken)
    .then((body) => {
      console.info(`chart list witch ${body.chart.length}`);
      store.dispatch({ type: actionTypes.UPDATE_CHART, chart: body.chart });
      store.dispatch({ type: actionTypes.UPDATE_LAST_UPDATE, date: body.lastUpdateDate });
      store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: false });
      return Promise.resolve();
    })
    .catch((err) => {
      console.error('Error in fetch chart.', err.message);
      store.dispatch({ type: actionTypes.ADD_ERROR, value: err });
      store.dispatch({ type: actionTypes.CHANGE_SHOW_WAIT, show: false });
    });
};

export default UpdateChart;
