import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const MessageControl = ({
  id, text, name, checked, onChange,
}) => (
  <div>
    <Checkbox
      name={name}
      color="primary"
      className="filter-option"
      id={`${id}_checkbox`}
      checked={checked}
      onChange={(target) => {
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
MessageControl.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  text: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default MessageControl;
