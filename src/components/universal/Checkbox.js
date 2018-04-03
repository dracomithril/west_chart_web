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
    if (this.props.checked === undefined) {
      this.setState({ checked: !this.state.checked });
    }
    this.props.onChange && this.props.onChange({ checked: target.checked, id: target.id });
  };

  render() {
    const { id = 'checkbox-alfa', checked, color, disabled, className, style, ...props } = this.props;
    const isChecked = checked !== undefined ? checked : this.state.checked;
    const isOn = isChecked ? color || 'green' : 'black';
    const useColor = disabled ? 'lightgray' : isOn;
    return (
      <label htmlFor={id} className={`checkbox-one ${className}`} style={style}>
        <input type="checkbox" id={id} hidden checked={isChecked} onChange={this.handleChange} disabled={disabled} />
        <FontAwesomeIcon
          className="checkbox-one__input"
          icon={isChecked ? faToggleOn : faToggleOff}
          color={useColor}
          size="2x"
        />
        {props.children}
      </label>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Checkbox;
