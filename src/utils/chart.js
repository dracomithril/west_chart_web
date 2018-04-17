/*
 * Created by Gryzli on 24.01.2017.
 */
import { URL } from 'url';
import path from 'path';
import querystring from 'querystring';

const apiVer = process.env.FB_API_VERSION || '';
const limit = 100;
// let EventEmitter = require('events').EventEmitter;
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

// since=2017-01-15&until=2017-01-16
/**
 *
 * @param since {string}
 * @param until {string}
 * @param groupId {string}
 * @param accessToken {string}
 */
function obtainList(since, until, groupId, accessToken) {
  return new Promise((resolve, reject) => {
    const address = 'https://graph.facebook.com';

    const query = {
      fields,
      limit,
      access_token: accessToken,
      since,
      until,
    };
    const pathname = path.resolve('/', apiVer, groupId, 'feed');

    const urlObject = new URL(pathname, address);
    urlObject.port = '443';
    urlObject.protocol = 'https';
    urlObject.search = querystring.stringify(query);

    // todo modify to use reject errors resolveWithFullResponse: false
    fetch(urlObject.toString())
      .then(resolve)
      .catch(err => {
        console.error(`error obtaining chart list. statusCode: ${err.statusCode} body: ${err.sub_error}`);
        reject(err);
      });
  });
}

function filterChartAndMap(body) {
  return new Promise(resolve => {
    const map = body.map(elem => {
      const attachment = ((elem.attachments || {}).data || []).length > 0 ? elem.attachments.data[0] : {};

      const link = {
        url: elem.link,
        name: elem.name,
        title: attachment.type === 'music_aggregation' ? attachment.description : attachment.title,
        type: attachment.type,
      };
      const from = { ...elem.from, picture_url: getFbPictureUrl(elem.from.id) };
      return {
        created_time: elem.created_time,
        from,
        full_picture: elem.full_picture,
        id: elem.id,
        likes_num: elem.likes.summary.total_count,
        link,
        message: elem.message,
        reactions_num: elem.reactions.summary.total_count,
        selected: false,
        source: elem.source,
        type: elem.type,
        updated_time: elem.updated_time,
      };
    });
    resolve(map);
  });
}

/**
 *
 * @param show_days {number}
 * @param since {string}
 * @param until {string}
 * @param access_token {string}
 * @param groupId {string}
 */
function UpdateChart(show_days, since, until, access_token, groupId) {
  return obtainList(since, until, groupId, access_token)
    .then(filterChartAndMap)
    .then(body => {
      const cache = {
        chart: body,
        last_update: new Date().toISOString(),
      };
      return Promise.resolve(cache);
    });
}

module.exports = UpdateChart;
