import { getArtist_Title } from './utils';
import { getTrack } from './spotify_utils';

function getAttachment({ data = [] } = {}) {
  return data[0] || {};
}

export function getLinkFromMessage(message = '') {
  const [result] = message.match(/\bhttps?:\/\/\S+/gi) || [];
  return result;
}

const getSpotifyTrackInfo = async (linkFromMessage = '') => {
  const trackId = /https?:\/\/open\.spotify.com\/track\/(.*)\?(.*)/g.exec(linkFromMessage);
  return trackId ? getTrack(trackId[1]) : {};
};

function getLink(elem, linkFromMessage, spotifyEntry, attachment) {
  return {
    url: elem.link || linkFromMessage,
    name: elem.name || spotifyEntry.name,
    title: attachment.type === 'music_aggregation' ? attachment.description : attachment.title || spotifyEntry.name || linkFromMessage,
    type: attachment.type,
  };
}

const createEntry = (elem) => {
  const linkFromMessage = getLinkFromMessage(elem.message);
  const assemble = entry => ({ body: spotifyEntry = {} }) => {
    const attachment = getAttachment(entry.attachments);
    const reactionsNum = entry.reactions.summary.total_count;
    const link = getLink(entry, linkFromMessage, spotifyEntry, attachment);
    const linkEntry = getArtist_Title(link.title);
    const searchElement = {
      artist: linkEntry.artist || ((spotifyEntry.artists || [])[0] || {}).name,
      title: linkEntry.title || spotifyEntry.name,
      full_title: link.title || spotifyEntry.name,
      items: [],
      selected: {},
    };
    return ({
      createdTime: entry.created_time,
      id: entry.id,
      link,
      message: entry.message,
      reactionsNum,
      selected: false,
      source: entry.source,
      type: entry.type,
      updatedTime: entry.updated_time,
      search: searchElement,
    });
  };
  return getSpotifyTrackInfo(linkFromMessage)
    .catch((err) => {
      console.error(err.message);
      return Promise.resolve({});
    })
    .then(assemble(elem));
};
export default createEntry;
