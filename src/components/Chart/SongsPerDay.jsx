/**
 * Created by Gryzli on 29.03.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { faArrowCircleDown, faArrowCircleUp, faExclamationTriangle } from '@fortawesome/fontawesome-free-solid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './chart.css';
import { errorDaysObjectProps } from '../typeDefinitions';

const styles = theme => ({
  button: {},
  typography: {
    margin: theme.spacing.unit * 2,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  error: {
    color: '#a94442',
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
  },
  good: {
    color: '#3c763d',
    backgroundColor: '#dff0d8',
    borderColor: '#d6e9c6',
  },
});

const SongsPerDay = props => {
  const { errorDays, songsPerDay, onDaysChange, classes } = props;
  const errorDaysMap = errorDays.map(({ org, color }) => (
    <div key={org}>
      <FontAwesomeIcon icon={color === 'blue' ? faArrowCircleDown : faArrowCircleUp} color={color} />
      <span style={{ color }}>{new Date(org).toDateString()}</span>
    </div>
  ));
  const style = errorDays.length !== 0 ? classes.error : classes.good;

  return (
    <ExpansionPanel className={`${classes.root} ${style}`}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          {songsPerDay} songs per day
          {errorDaysMap.length > 0 && <FontAwesomeIcon icon={faExclamationTriangle} color="red" />}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <TextField
            id="number"
            label="songs per day"
            value={songsPerDay}
            onChange={({ target }) => {
              onDaysChange && onDaysChange(Number(target.value));
            }}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          {errorDaysMap}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

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
