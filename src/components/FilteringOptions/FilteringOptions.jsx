/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterOption from './FilterOption';
import './FilteringOptions.css';
import filters_def from '../../utils/filters_def';
import { actionTypes } from '../../reducers/actionTypes';
import MessageControl from './MessageControl';

const styles = theme => ({
  button: {
    alignSelf: 'stretch',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    width: '100%',
  },
});

const FilteringOptions = ({ classes }, { store }) => {
  const { filters } = store.getState();
  const map_c = filters_def.control.map(({ input, description, control }) => {
    const { days, checked } = filters[input.name] || {};
    return (
      <FilterOption
        id={control.id}
        days={days}
        name={control.name}
        checked={checked}
        descStart={description.start}
        descEnd={description.end}
        key={input.name}
        onChange={target => {
          store.dispatch({
            type: actionTypes.TOGGLE_FILTER,
            id: target.value,
            checked: target.checked,
          });
        }}
        onValueChange={target => {
          const { id, name, value } = target;
          store.dispatch({
            type: actionTypes.UPDATE_DAYS,
            id,
            name,
            value: Number(value),
          });
        }}
      />
    );
  });
  const map_t = filters_def.text.map(({ control, text, input }) => (
    <MessageControl
      name={control.name}
      text={text}
      id={control.id}
      checked={(filters[input.name] || {}).checked}
      key={input.name}
      onChange={target => {
        store.dispatch({
          type: actionTypes.TOGGLE_FILTER,
          id: target.value,
          checked: target.checked,
        });
      }}
    />
  ));
  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>Filters</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          {map_c}
          {map_t}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

FilteringOptions.contextTypes = {
  store: PropTypes.shape,
};
FilteringOptions.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(FilteringOptions);
