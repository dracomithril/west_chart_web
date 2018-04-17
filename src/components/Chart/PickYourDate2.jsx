/**
 * Created by Gryzli on 12.02.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class PickYourDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenSince: false,
      isOpenUntil: false,
    };
  }

  render() {
    const { since, until, onSinceDateChange, onUntilDateChange } = this.props;
    return (
      <div className="pick-your-date">
        <div className="pick-your-date__date-picker">
          starting from
          <button
            className="pick-your-date__button"
            onClick={e => {
              e.preventDefault();
              this.setState({ isOpenUntil: !this.state.isOpenUntil });
            }}
          >
            {since && since.format('DD/MM/YY')}
          </button>
          {this.state.isOpenUntil && (
            <DatePicker
              selected={since}
              onChange={date => {
                this.setState({ isOpenUntil: !this.state.isOpenUntil });
                onSinceDateChange(date);
              }}
              withPortal
              inline
            />
          )}
        </div>
        <div className="pick-your-date__date-picker">
          until
          <button
            className="pick-your-date__button"
            onClick={e => {
              e.preventDefault();
              this.setState({ isOpenSince: !this.state.isOpenSince });
            }}
          >
            {until && until.format('DD/MM/YY')}
          </button>
          {this.state.isOpenSince && (
            <DatePicker
              selected={until}
              onChange={date => {
                this.setState({ isOpenSince: !this.state.isOpenSince });
                onUntilDateChange(date);
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
  since: PropTypes.instanceOf(moment),
  until: PropTypes.instanceOf(moment),
  onSinceDateChange: PropTypes.func,
  onUntilDateChange: PropTypes.func,
};
export default PickYourDate;
