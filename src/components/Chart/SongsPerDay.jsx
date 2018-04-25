/**
 * Created by Gryzli on 29.03.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowCircleDown, faArrowCircleUp } from '@fortawesome/fontawesome-free-solid';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import './chart.css';
import { errorDaysObjectProps } from './../typeDefinitions';

const DayEntry = ({ org, color }) => (
  <div key={org}>
    <span style={{ color }}>{new Date(org).toDateString()}</span>
  </div>
);
DayEntry.propTypes = {
  org: PropTypes.string,
  color: PropTypes.string,
};

const styles = theme => ({
  button: {},
  typography: {
    margin: theme.spacing.unit * 2,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class SongsPerDay extends React.Component {
  state = {
    show: false,
    anchorOriginVertical: 'top',
    anchorOriginHorizontal: 'left',
    transformOriginVertical: 'top',
    transformOriginHorizontal: 'left',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
  };

  render() {
    const { errorDays = null, songsPerDay, onDaysChange, classes } = this.props;
    const {
      show,
      anchorOriginHorizontal,
      anchorOriginVertical,
      transformOriginHorizontal,
      transformOriginVertical,
      anchorReference,
      positionLeft,
      positionTop,
    } = this.state;
    let errorDaysLess = [];
    let errorDaysMore = [];
    let style;
    if (errorDays) {
      errorDaysLess = errorDays.filter(elem => elem.color === 'blue').map(DayEntry);
      errorDaysMore = errorDays.filter(elem => elem.color === 'red').map(DayEntry);
      style = errorDays.length !== 0 ? 'songs-per-day--err' : 'songs-per-day--good';
    } else {
      style = '';
    }

    return (
      <div className={`songs-per-day ${style}`}>
        <div>
          <label htmlFor="songs_per_day" className="songs-per-day__label">
            {'songs per day'}
            <input
              type="number"
              value={songsPerDay}
              name="songs_per_day"
              id="songs_per_day"
              step={1}
              max={10}
              min={1}
              onChange={({ target }) => {
                onDaysChange(Number(target.value));
              }}
            />
          </label>
        </div>
        <Button
          className={classes.button}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          onClick={() => {
            this.setState({ show: true });
          }}
        >
          <div className={classes.label}>
            {errorDaysMore.length > 0 && (
              <div className="more_days">
                <FontAwesomeIcon icon={faArrowCircleUp} />
                {errorDaysMore.length}
              </div>
            )}
            {errorDaysLess.length > 0 && (
              <div className="less_days">
                <FontAwesomeIcon icon={faArrowCircleDown} />
                {errorDaysLess.length}
              </div>
            )}
          </div>
        </Button>
        <Popover
          open={show}
          anchorEl={this.anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={() => {
            this.setState({ show: false });
          }}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          <Typography>
            {errorDaysMore}
            {errorDaysLess}
          </Typography>
        </Popover>
      </div>
    );
  }
}

SongsPerDay.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
    typography: PropTypes.string,
  }).isRequired,
  errorDays: PropTypes.arrayOf(errorDaysObjectProps),
  songsPerDay: PropTypes.number,
  onDaysChange: PropTypes.func,
};

export default withStyles(styles)(SongsPerDay);
