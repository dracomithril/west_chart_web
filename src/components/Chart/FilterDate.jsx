import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';

function FilterDate(props) {
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

export default FilterDate;
