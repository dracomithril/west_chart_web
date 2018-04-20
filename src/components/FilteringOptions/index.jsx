/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/fontawesome-free-solid';
import FilterOption from './FilterOption';
import './FilteringOptions.css';
import filters_def from '../../utils/filters_def';
import { actionTypes } from './../../reducers/actionTypes';
import MessageControl from './MessageControl';

class FilteringOptions extends React.Component {
  state = {
    more: false,
  };

  render() {
    const { store } = this.context;
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
              id: target.id,
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
            id: target.id,
            checked: target.checked,
          });
        }}
      />
    ));
    return (
      <div className="filter-panel">
        <div className="filter-panel__header">
          <h4>filters</h4>
          <button style={{ border: ' none' }} onClick={() => this.setState({ more: !this.state.more })}>
            <FontAwesome size="2x" icon={this.state.more ? faCaretUp : faCaretDown} />
          </button>
        </div>
        <div className="filter-panel__containers">
          <div className="filter-panel__containers_base">{map_c}</div>
          <div className="filter-panel__containers_additional">{this.state.more && map_t}</div>
        </div>
      </div>
    );
  }
}

FilteringOptions.contextTypes = {
  store: PropTypes.object,
};
export default FilteringOptions;
