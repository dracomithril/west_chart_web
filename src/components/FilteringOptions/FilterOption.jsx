/**
 * Created by michal.grezel on 23.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const FilterOption = ({
  id, name, days, checked, onChange, onValueChange, descStart, descEnd,
}) => (
  <div>
    <Checkbox
      color="primary"
      name={name}
      id={`${id}_checkbox`}
      checked={checked}
      onChange={({ target }) => {
        onChange({ checked: target.checked, id });
      }}
    />
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
  </div>
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
