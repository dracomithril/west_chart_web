/**
 * Created by michal.grezel on 21.10.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { getFbPictureUrl, weekInfo } from '../utils/utils';
import { chartObjectProps } from './typeDefinitions';

export default class WestLetter extends React.Component {
  componentDidMount() {
    console.info('component WestLetter did mount');
  }

  componentWillUnmount() {
    console.info('component WestLetter unmounted');
  }

  render() {
    const { data, week } = this.props;
    const show = data.map((elem) => {
      const create_date = new Date(elem.createdTime);
      const { from } = elem;
      return (
        <div style={{ padding: 2, display: 'block', border: '1px black solid' }} key={elem.id}>
          <input type="checkbox" />
          <span hidden>
            {elem.id}
          </span>
          {from ? <Avatar title={from.name} src={getFbPictureUrl(from.id)} /> : (
            <div>
              {elem.story}
            </div>
          )}
          <div>
            <span>
              {create_date.toLocaleDateString()}
            </span>
            <br />
            <span>
              week:
              {week.weekNumber}
            </span>
            <br />
            <span>
is added
            </span>
          </div>
        </div>
      );
    });
    return (
      <div className="west-letter">
        <div className="west-letter__beta">
          <h1>
This site is still in beta version
          </h1>
          😃 Soon we will be able to track WestLetters in each week 😃
        </div>

        <h4>
          We have
          {' '}
          {week.weekNumber}
          {' '}
week of
          {' '}
          {week.year}
        </h4>
        <div style={{ display: 'inline-flex' }}>
          {show}
        </div>
      </div>
    );
  }
}
WestLetter.propTypes = {
  data: PropTypes.arrayOf(chartObjectProps),
  week: PropTypes.shape({
    monday: PropTypes.object,
    friday: PropTypes.object,
    sunday: PropTypes.object,
    weekNumber: PropTypes.number,
    year: PropTypes.number,
  }),
};
WestLetter.defaultProps = {
  data: [],
  week: weekInfo(),
};
WestLetter.contextTypes = {
  store: PropTypes.shape(),
};
