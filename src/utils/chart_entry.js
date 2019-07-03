// @flow
import { getArtist_Title } from './utils';
import { getTrack } from './spotify_utils';
import type {
  ChartEntry, fbEntry, Link, SpotifyTrack,
} from '../types';

function getAttachment({ data = [] } = {}) {
  return data[0] || {};
}

export function getLinkFromMessage(message: string = ''): string {
  const [result] = message.match(/\bhttps?:\/\/\S+/gi) || [];
  return result;
}


const getSpotifyTrackInfo = async (linkFromMessage: string = ''): Promise<SpotifyTrack> => {
  const trackId = /https?:\/\/open\.spotify.com\/track\/(.*)\?(.*)/g.exec(linkFromMessage);
  return trackId ? getTrack(trackId[1]) : {};
};

function getLink(elem, linkFromMessage, spotifyEntry, attachment): Link {
  return {
    url: elem.link || linkFromMessage,
    name: elem.name || spotifyEntry.name,
    title: attachment.type === 'music_aggregation' ? attachment.description : attachment.title || spotifyEntry.name || linkFromMessage,
    type: attachment.type,
  };
}

const createEntry = async (entry: fbEntry): Promise<ChartEntry> => {
  const attachment = getAttachment(entry.attachments);
  const linkFromMessage = getLinkFromMessage(entry.message);
  const spotifyEntry = await getSpotifyTrackInfo(linkFromMessage)
    .catch((err) => {
      console.error(err.message);
      return Promise.resolve({});
    });
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


export default createEntry;
