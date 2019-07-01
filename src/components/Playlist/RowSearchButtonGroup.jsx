import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faSearch,
  faSync,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

export const RowSearchButtonGroup = ({
  onSwap, onSearchClick, onClearClick, onShowList, id, showList, dropDown,
}) => (
  <div className="row-spotify-search__button-group">
    <button type="button" onClick={() => onSwap && onSwap(id)} title="swap artist with title">
      <FontAwesomeIcon icon={faSync} />
    </button>
    <button
      type="button"
      id={`button-${id}`}
      onClick={() => onSearchClick && onSearchClick()}
      title="search for tracks"
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>
    <button
      type="button"
      title="clear selected"
      onClick={() => onClearClick && onClearClick({ id })}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
    {dropDown && (
      <button type="button" onClick={onShowList} title="show/hide found tracks">
        <FontAwesomeIcon icon={showList ? faCaretUp : faCaretDown} />
      </button>
    )}
  </div>
);

RowSearchButtonGroup.propTypes = {
  onSwap: PropTypes.func,
  id: PropTypes.string,
  onSearchClick: PropTypes.func,
  onClearClick: PropTypes.func,
  onShowList: PropTypes.func,
  dropDown: PropTypes.bool,
  showList: PropTypes.bool,
};

export default RowSearchButtonGroup;
