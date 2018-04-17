import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/fontawesome-free-solid/index';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleChange = ({ target }) => {
    const { checked, onChange } = this.props;
    if (checked === undefined) {
      this.setState({ checked: !this.state.checked });
    }
    onChange({ checked: target.checked, id: target.id });
  };

  render() {
    const { id = 'checkbox-alfa', checked, color, disabled, className, children, ...props } = this.props;
    const isChecked = checked !== undefined ? checked : this.state.checked;
    const isOn = isChecked ? color || 'green' : 'black';
    const useColor = disabled ? 'lightgray' : isOn;
    return (
      <label htmlFor={id} className={`checkbox-one ${className}`} {...props}>
        <input type="checkbox" id={id} hidden checked={isChecked} onChange={this.handleChange} disabled={disabled} />
        <FontAwesomeIcon
          className="checkbox-one__input"
          icon={isChecked ? faToggleOn : faToggleOff}
          color={useColor}
          size="2x"
        />
        {children}
      </label>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Checkbox;
