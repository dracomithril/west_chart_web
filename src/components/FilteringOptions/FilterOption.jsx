// @flow
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

type Props = {
  id: string,
  name?: string,
  onChange?: ({id: string, checked: boolean})=> mixed,
  onValueChange?: ({id: string, value: string})=> mixed,
  days?: number,
  checked?: boolean,
  descStart: ?string,
  descEnd: ?string,
};

const FilterOption = ({
  id, name, days, checked = false, onChange, onValueChange, descStart, descEnd,
}: Props) => (
  <div>
    <Checkbox
      color="primary"
      name={name}
      id={`${id}_checkbox`}
      checked={checked}
      onChange={({ currentTarget }: SyntheticInputEvent<Checkbox>) => {
        onChange && onChange({ checked: currentTarget.checked, id });
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
      onChange={({ currentTarget }: SyntheticInputEvent<HTMLInputElement>) => onValueChange
        && onValueChange(
          {
            value: currentTarget.value,
            id,
          },
        )}
    />
    {descEnd}
  </div>
);

export default FilterOption;
