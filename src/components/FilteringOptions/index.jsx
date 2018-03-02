/**
 * Created by Gryzli on 28.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, OverlayTrigger, Tooltip } from 'react-bootstrap';
import FilterOption from './FilterOption';
import './FilteringOptions.css';
import filters_def from '../../utils/filters_def';
import { action_types } from './../../reducers/action_types';

const _ = require('lodash');

const MessageControl = ({ id, text, name, checked, onChange }) => (
  <Checkbox
    name={name}
    id={`${id}_checkbox`}
    checked={!checked}
    onChange={({ target }) => onChange(target)}
  >
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={`${id}_tp`}>{`Will show all [${text}]`}</Tooltip>}
    >
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

const FilteringOptions = (props, { store }) => {
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
          checked: !target.checked,
        });
      }}
    />
  ));
  const combined_map = [...map_t, ...map_c];
  const chunk_combined_map = _.chunk(combined_map, Math.floor(combined_map.length / 2));
  return (
    <div style={{ display: '-webkit-box' }}>
      <div className="filter_panel">{chunk_combined_map[0]}</div>
      <div className="filter_panel">{chunk_combined_map[1]}</div>
    </div>
  );
};
FilteringOptions.contextTypes = {
  store: PropTypes.object,
};
export default FilteringOptions;
