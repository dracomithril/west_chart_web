/*
 * Created by michal.grezel on 24.01.2017.
 */
import { getArtist_Title } from './utils';
import { getTrack } from './spotify_utils';

import { facebookGroup } from '../config';

const limit = 50;
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

function obtainList(groupId, accessToken) {
  const query = {
    fields,
    limit,
    access_token: accessToken,
  };
  if (window.FB) {
    return new Promise(((resolve, reject) => {
      window.FB.api(`/${groupId}/feed`, query, (response) => {
        if (response.error) {
          reject(response.error);
        }
        resolve(response.data);
      });
    }));
  }
  console.error('No FB SDK');
  return [];
}

function getAttachment(elem) {
  return ((elem.attachments || {}).data || []).length > 0 ? elem.attachments.data[0] : {};
}

function getFrom(from) {
  return from ? { ...from, picture_url: getFbPictureUrl(from.id) } : {};
}

export function getLinkFromMessage(message = '') {
  const [result] = message.match(/\bhttps?:\/\/\S+/gi) || [];
  return result;
}

const getSpotifyTrackInfo = async (linkFromMessage = '') => {
  const trackId = /https?:\/\/open\.spotify.com\/track\/(.*)\?(.*)/g.exec(linkFromMessage);
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

const formatResponse = async (data = []) => Promise.all(data.map((elem) => {
  const attachment = getAttachment(elem);
  const from = getFrom(elem.from);
  const story = (elem.story || '').replace(/\sshared.*West.*Chart./, '');
  const linkFromMessage = getLinkFromMessage(elem.message);
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

export const UpdateChart = accessToken => obtainList(facebookGroup, accessToken)
  .then(formatResponse)
  .then((chart) => {
    const cache = {
      chart,
      lastUpdateDate: new Date().toISOString(),
    };
    return Promise.resolve(cache);
  });

export default UpdateChart;
