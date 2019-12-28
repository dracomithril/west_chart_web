// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { faArrowCircleDown, faArrowCircleUp, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './chart.css';
import type { ErrorDay } from '../../types';

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

type Props = {
  classes: {
    [string]: string,
  },
  errorDays?: ErrorDay[],
  songsPerDay: number,
  onDaysChange: (number) => mixed,
};
const SongsPerDay = (props: Props) => {
  const {
    errorDays = [], songsPerDay, onDaysChange, classes,
  } = props;
  const errorDaysMap = errorDays.map(({ org, color }) => (
    <div key={org}>
      <FontAwesomeIcon icon={color === 'blue' ? faArrowCircleDown : faArrowCircleUp} color={color} />
      <span style={{ color }}>
        {new Date(org).toDateString()}
      </span>
    </div>
  ));
  const style = errorDays.length !== 0 ? classes.error : classes.good;

  return (
    <ExpansionPanel className={`${classes.root} ${style}`}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          {songsPerDay}
          {' '}
songs per day
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

export default withStyles(styles)(SongsPerDay);
