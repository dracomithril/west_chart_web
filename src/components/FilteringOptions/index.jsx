/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/fontawesome-free-solid';
import Checkbox from '../universal/Checkbox';
import FilterOption from './FilterOption';
import './FilteringOptions.css';
import filters_def from '../../utils/filters_def';
import { action_types } from './../../reducers/action_types';

const MessageControl = ({ id, text, name, checked, onChange }) => (
  <Checkbox
    name={name}
    color="cornflowerblue"
    className="filter-option"
    id={`${id}_checkbox`}
    checked={checked}
    onChange={target => {
      onChange({ id, checked: target.checked });
    }}
  >
    <OverlayTrigger placement="bottom" overlay={<Tooltip id={`${id}_tp`}>{`Will show all [${text}]`}</Tooltip>}>
      <span>[{text}]</span>
    </OverlayTrigger>
  </Checkbox>
);
MessageControl.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  text: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

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
          desc_start={description.start}
          desc_end={description.end}
          key={input.name}
          onChange={target => {
            store.dispatch({
              type: action_types.TOGGLE_FILTER,
              id: target.id,
              checked: target.checked,
            });
          }}
          onValueChange={target => {
            const { id, name, value } = target;
            store.dispatch({
              type: action_types.UPDATE_DAYS,
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
            type: action_types.TOGGLE_FILTER,
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
