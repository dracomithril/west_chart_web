/**
 * Created by Gryzli on 23.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

const FilterOption = ({ id, name, days, checked, onChange, onValueChange, desc_start, desc_end }) => (
  <Checkbox
    name={name}
    id={`${id}_checkbox`}
    className="filter-option"
    checked={checked}
    onChange={({ target }) => onChange({ checked: target.checked, id })}
  >
    {desc_start}
    <input
      className="filter-option__days"
      type="number"
      min={0}
      step={1}
      id={`${id}_input`}
      value={days}
      onChange={({ target }) => onValueChange({ value: target.value, id })}
    />
    {desc_end}
  </Checkbox>
);
FilterOption.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  days: PropTypes.number,
  checked: PropTypes.bool,
  desc_start: PropTypes.string,
  desc_end: PropTypes.string,
};
export default FilterOption;
