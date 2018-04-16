/**
 * Created by Gryzli on 21.10.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getFbPictureUrl, weekInfo } from '../utils/utils';

export default class WestLetter extends React.Component {
  componentDidMount() {
    console.info('component WestLetter did mount');
  }

  componentWillUnmount() {
    console.info('component WestLetter unmounted');
  }

  render() {
    const today = new Date();
    const today_week = weekInfo(today);
    const { data = [] } = this.props;
    const show = data.map(elem => {
      const create_date = new Date(elem.created_time);
      const { weekNumber } = weekInfo(create_date);
      return (
        <div style={{ padding: 2, display: 'block', border: '1px black solid' }} key={elem.id}>
          <input type="checkbox" />
          <span hidden>{elem.id}</span>
          <OverlayTrigger placement="bottom" overlay={<Tooltip id={`tt_${elem.id}`}>{elem.from.name}</Tooltip>}>
            <Image src={getFbPictureUrl(elem.from.id)} />
          </OverlayTrigger>

          <div>
            <span>{create_date.toLocaleDateString()}</span>
            <br />
            <span>week:{weekNumber}</span>
            <br />
            <span>is added</span>
          </div>
        </div>
      );
    });
    return (
      <div className="west-letter">
        <div className="west-letter__beta">
          <h1>This site is still in beta version</h1>
          😃 Soon we will be able to track WestLetters in each week 😃
        </div>

        <h4>
          We have {today_week.weekNumber} week of {today.getFullYear()}
        </h4>
        <div style={{ display: 'inline-flex' }}>{show}</div>
      </div>
    );
  }
}
WestLetter.propTypes = {
  data: PropTypes.array,
};
WestLetter.contextTypes = {
  store: PropTypes.object,
};
