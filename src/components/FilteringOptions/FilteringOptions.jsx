
import React from 'react';
import { connect } from 'react-redux';
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
import actionTypes from '../../reducers/actionTypes';
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
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'self-start',
  },
});

const FilteringOptions = ({
  classes, filters, toggleFilter, updateDays,
}) => {
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
        onChange={(target) => {
          toggleFilter(target);
        }}
        onValueChange={(target) => {
          updateDays(target);
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
      onChange={(target) => {
        toggleFilter(target);
      }}
    />
  ));
  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
Filters
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {map_c}
        {map_t}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

FilteringOptions.propTypes = {
  filters: PropTypes.shape(),
  toggleFilter: PropTypes.func,
  updateDays: PropTypes.func,
  classes: PropTypes.shape({
    button: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ filters }) => ({
  filters,
});

const mapDispatchToProps = dispatch => ({
  toggleFilter: (target) => {
    dispatch({
      type: actionTypes.TOGGLE_FILTER,
      id: target.id,
      checked: target.checked,
    });
  },
  updateDays: (target) => {
    dispatch({
      type: actionTypes.UPDATE_DAYS,
      id: target.id,
      name: target.name,
      value: Number(target.value),
    });
  },
});

export const componentWithStyles = withStyles(styles)(FilteringOptions);
export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
