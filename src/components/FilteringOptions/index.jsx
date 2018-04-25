/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import FilterOption from './FilterOption';
import './FilteringOptions.css';
import filters_def from '../../utils/filters_def';
import { actionTypes } from './../../reducers/actionTypes';
import MessageControl from './MessageControl';

const styles = {
  button: {
    alignSelf: 'stretch',
  },
};

class FilteringOptions extends React.Component {
  state = {
    show: false,
  };

  render() {
    const { store } = this.context;
    const { classes } = this.props;
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
      <div className="filter-panel">
        <Button
          className={classes.button}
          onClick={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          filters
        </Button>
        {this.state.show && (
          <div className="filter-panel__containers">
            {map_c}
            {map_t}
          </div>
        )}
      </div>
    );
  }
}

FilteringOptions.contextTypes = {
  store: PropTypes.object,
};
FilteringOptions.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(FilteringOptions);
