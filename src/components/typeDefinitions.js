import PropTypes from 'prop-types';

export const chartObjectProps = PropTypes.shape({
  created_time: PropTypes.string,
  from: PropTypes.object,
  full_picture: PropTypes.string,
  id: PropTypes.string,
  likes_num: PropTypes.number,
  link: PropTypes.object,
  message: PropTypes.string,
  reactionsNum: PropTypes.number,
  selected: PropTypes.bool,
  source: PropTypes.string,
  type: PropTypes.string,
  updated_time: PropTypes.string,
  search: PropTypes.object,
});

export const trackObjectProps = PropTypes.shape({
  id: PropTypes.string,
  artists: PropTypes.arrayOf(PropTypes.shape({
    external_urls: PropTypes.shape({ spotify: PropTypes.string }),
    href: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    uri: PropTypes.string,
  })),
  preview_url: PropTypes.string,
  external_urls: PropTypes.object,
  name: PropTypes.string,
});

export const errorDaysObjectProps = PropTypes.shape({
  count: PropTypes.number,
  color: PropTypes.string,
  org: PropTypes.string,
});

export default { chartObjectProps, errorDaysObjectProps, trackObjectProps };
