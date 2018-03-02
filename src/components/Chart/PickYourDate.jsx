/**
 * Created by Gryzli on 12.02.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateButton = props => <Button onClick={props.onClick}>{props.value}</Button>;
DateButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

const PickYourDate = ({ start_date, show_last, onDaysChange, onDateChange }) => (
  <div id="pickYourDate">
    <OverlayTrigger
      trigger={['hover', 'focus']}
      overlay={<Tooltip id="go_back">How far in time you will travel</Tooltip>}
    >
      <span style={{ paddingRight: 10, paddingBottom: 5 }}>
        {'go back '}
        <input
          className="num_days"
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
    <div className="datePicker">
      starting from
      <DatePicker
        selected={start_date}
        withPortal
        dateFormat="DD/MM/YY"
        onChange={onDateChange}
        customInput={<DateButton />}
      />
    </div>
  </div>
);
PickYourDate.propTypes = {
  start_date: PropTypes.object,
  show_last: PropTypes.number,
  onDaysChange: PropTypes.func,
  onDateChange: PropTypes.func,
};
export default PickYourDate;
