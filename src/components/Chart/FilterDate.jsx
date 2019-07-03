// @flow
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import type { Moment } from 'moment';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

type Props = {
  classes: any,
  onSinceChange(SyntheticInputEvent<EventTarget>): mixed,
  since: Moment,
  until: Moment,
  onUntilChange(SyntheticInputEvent<EventTarget>): mixed,
}

function FilterDate(props: Props) {
  const {
    classes, onSinceChange, onUntilChange, until, since,
  } = props;
  return (
    <div>
      <TextField
        id="date"
        label="starting from"
        type="date"
        value={since.format('YYYY-MM-DD')}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onSinceChange}
      />
      <TextField
        id="date"
        label="until"
        type="date"
        className={classes.textField}
        value={until.format('YYYY-MM-DD')}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onUntilChange}
      />
    </div>
  );
}

FilterDate.propTypes = {
  classes: PropTypes.shape(),
  onSinceChange: PropTypes.func,
  since: PropTypes.shape(),
  until: PropTypes.shape(),
  onUntilChange: PropTypes.func,
};

export default withStyles(styles)(FilterDate);
