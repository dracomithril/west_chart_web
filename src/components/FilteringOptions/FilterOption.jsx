/**
 * Created by Gryzli on 23.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
// import { Checkbox } from 'react-bootstrap';
import Checkbox from '../universal/Checkbox';

const FilterOption = ({ id, name, days, checked, onChange, onValueChange, descStart, descEnd }) => (
  <Checkbox
    color="cornflowerblue"
    name={name}
    id={`${id}_checkbox`}
    className="filter-option"
    checked={checked}
    onChange={target => {
      onChange({ checked: target.checked, id });
    }}
  >
    {descStart}
    <input
      className="filter-option__days"
      type="number"
      min={0}
      step={1}
      id={`${id}_input`}
      value={days}
      onChange={({ target }) => onValueChange({ value: target.value, id })}
    />
    {descEnd}
  </Checkbox>
);
FilterOption.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  days: PropTypes.number,
  checked: PropTypes.bool,
  descStart: PropTypes.string,
  descEnd: PropTypes.string,
};
export default FilterOption;
