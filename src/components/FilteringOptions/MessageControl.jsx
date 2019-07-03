// @flow
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';


type Props = {
  id: string,
  checked: boolean,
  text: string,
  name: string,
  onChange({id: string, checked: boolean}): mixed,
};
const MessageControl = ({
  id, text, name, checked, onChange,
}: Props) => (
  <div>
    <Checkbox
      name={name}
      color="primary"
      className="filter-option"
      id={`${id}_checkbox`}
      checked={checked}
      onChange={({ target }: SyntheticInputEvent<Checkbox>) => {
        onChange({ id, checked: target.checked });
      }}
    />
    <span title={`Will show all [${text}]`}>
[
      {text}
]
    </span>
  </div>
);

export default MessageControl;
