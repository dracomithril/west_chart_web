import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Checkbox from '../universal/Checkbox';

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

export default MessageControl;
