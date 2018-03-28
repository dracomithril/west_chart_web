import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/fontawesome-free-solid/index';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {
  state = {
    checked: false,
  };
  changeHandler = ({ target }) => {
    if (this.props.checked === undefined) {
      this.setState({ checked: !this.state.checked });
    }
    this.props.onChange && this.props.onChange({ checked: target.checked, id: target.id });
  };
  render() {
    const { id = 'checkbox-alfa', checked } = this.props;
    const isChecked = checked !== undefined ? checked : this.state.checked;
    return (
      <label htmlFor={id} className="checkbox-one" style={{ justifySelf: 'center', alignSelf: 'center' }}>
        <input type="checkbox" id={id} hidden checked={isChecked} onChange={this.changeHandler} />
        <FontAwesomeIcon icon={isChecked ? faToggleOn : faToggleOff} color={isChecked ? 'green' : 'black'} size="2x" />
      </label>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
