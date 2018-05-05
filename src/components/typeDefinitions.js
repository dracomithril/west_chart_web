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

export const errorDaysObjectProps = PropTypes.shape({
  count: PropTypes.number,
  color: PropTypes.string,
  org: PropTypes.string,
});

export default { chartObjectProps, errorDaysObjectProps };
