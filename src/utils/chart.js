import getChartEntry from './chart_entry';

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

const formatChartEntries = async (data = []) => Promise.all(data.map(getChartEntry));

const formatResponse = (chart) => {
  const cache = {
    chart,
    lastUpdateDate: new Date().toISOString(),
  };
  return Promise.resolve(cache);
};

export const UpdateChart = accessToken => obtainList(facebookGroup, accessToken)
  .then(formatChartEntries)
  .then(formatResponse);

export default UpdateChart;
