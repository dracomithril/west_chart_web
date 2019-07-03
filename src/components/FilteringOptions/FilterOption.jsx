// @flow
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

type Props = {
  id: string,
  name?: string,
  onChange({id: string, checked: boolean}): mixed,
  onValueChange({id: string, value: string}): mixed,
  days?: number,
  checked: boolean,
  descStart: ?string,
  descEnd: ?string,
};

const FilterOption = ({
  id, name, days, checked, onChange, onValueChange, descStart, descEnd,
}: Props) => (
  <div>
    <Checkbox
      color="primary"
      name={name}
      id={`${id}_checkbox`}
      checked={checked}
      onChange={({ target }: SyntheticInputEvent<Checkbox>) => {
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
      onChange={({ target }: SyntheticInputEvent<HTMLInputElement>) => onValueChange(
        {
          value: target.value,
          id,
        },
      )}
    />
    {descEnd}
  </div>
);

export default FilterOption;
