/**
 * Created by Gryzli on 12.02.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});
const PickYourDate = ({ since, until, onSinceDateChange, onUntilDateChange, classes }) => {
  const sinceFormat = since.format('YYYY-MM-DD');
  const untilFormat = until.format('YYYY-MM-DD');
  return (
    <div className="pick-your-date">
      <TextField
        id="date"
        label="starting from"
        type="date"
        defaultValue="2017-05-24"
        value={sinceFormat}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={({ target }) => {
          onSinceDateChange(moment(target.value));
        }}
      />
      <TextField
        id="date"
        label="until"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        value={untilFormat}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={({ target }) => {
          onUntilDateChange(moment(target.value));
        }}
      />
    </div>
  );
};

PickYourDate.propTypes = {
  classes: PropTypes.shape().isRequired,
  since: PropTypes.instanceOf(moment),
  until: PropTypes.instanceOf(moment),
  onSinceDateChange: PropTypes.func,
  onUntilDateChange: PropTypes.func,
};

export default withStyles(styles)(PickYourDate);
