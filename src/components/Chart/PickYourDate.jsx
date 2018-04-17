/**
 * Created by Gryzli on 12.02.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class PickYourDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { start_date, show_last, onDaysChange, onDateChange } = this.props;
    return (
      <div className="pick-your-date">
        <OverlayTrigger
          trigger={['hover', 'focus']}
          overlay={<Tooltip id="go_back">How far in time you will travel</Tooltip>}
        >
          <span style={{ paddingRight: 10, paddingBottom: 5 }}>
            {'go back '}
            <input
              className="filter-option__days"
              type="number"
              name="show_last"
              min={0}
              max={62}
              value={show_last}
              step={1}
              onChange={({ target }) => onDaysChange(target)}
            />
            {' days'}
          </span>
        </OverlayTrigger>
        <br />
        <div className="pick-your-date__date-picker">
          starting from
          <button
            className="pick-your-date__button"
            onClick={e => {
              e.preventDefault();
              this.setState({ isOpen: !this.state.isOpen });
            }}
          >
            {start_date && start_date.format('DD/MM/YY')}
          </button>
          {this.state.isOpen && (
            <DatePicker
              selected={start_date}
              onChange={date => {
                this.setState({ isOpen: !this.state.isOpen });
                onDateChange(date);
              }}
              withPortal
              inline
            />
          )}
        </div>
      </div>
    );
  }
}

PickYourDate.propTypes = {
  start_date: PropTypes.instanceOf(moment),
  show_last: PropTypes.number,
  onDaysChange: PropTypes.func,
  onDateChange: PropTypes.func,
};
export default PickYourDate;
