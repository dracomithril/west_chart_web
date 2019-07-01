import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../components.css';
import { chartObjectProps } from '../typeDefinitions';
import ChartRow from './ChartRow';
import actionTypes from '../../reducers/actionTypes';


export const ChartTable = ({
  data, tableInfo, selectAll, toggleSelected,
}) => {
  const ChartRows = data.map(entry => (
    <ChartRow
      id={entry.id}
      checked={entry.selected}
      createdTime={entry.createdTime}
      updatedTime={entry.updatedTime}
      link={entry.link}
      from={entry.from}
      story={entry.story}
      key={entry.id}
      reactionsNum={entry.reactionsNum}
      message={entry.message}
      onChange={({ checked, id }) => {
        toggleSelected(id, checked);
      }}
    />
  ));
  return ChartRows.length > 0 ? (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={(
            <Checkbox
              id="selectAll"
              value="selectAll"
              color="primary"
              onChange={({ target: { checked } }) => {
                selectAll(checked);
              }}
            />
)}
          label="select all"
        />
      </div>
      {ChartRows}
    </div>
  ) : (
    <div
      style={{
        textAlign: 'center',
        justifyContent: 'center',
        minHeight: 300,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {tableInfo}
    </div>
  );
};
ChartTable.defaultProps = {
  data: [],
  tableInfo: 'No data',
};

ChartTable.propTypes = {
  data: PropTypes.arrayOf(chartObjectProps),
  tableInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  selectAll: PropTypes.func,
  toggleSelected: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  selectAll: (checked) => { dispatch({ type: actionTypes.TOGGLE_ALL, value: checked }); },
  toggleSelected: (id, checked) => {
    dispatch({
      type: 'TOGGLE_SELECTED',
      id,
      checked,
    });
  },
});

export default connect(null, mapDispatchToProps)(ChartTable);
