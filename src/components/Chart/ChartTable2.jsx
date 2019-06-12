/**
 * Created by michal.grezel on 26.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../components.css';
import { chartObjectProps } from '../typeDefinitions';
import ChartRow from './ChartRow';
import actionTypes from '../../reducers/actionTypes';

const ChartTable = ({ data }, { store }) => {
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
        store.dispatch({
          type: 'TOGGLE_SELECTED',
          id,
          checked,
        });
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
                store.dispatch({ type: actionTypes.TOGGLE_ALL, value: checked });
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
      No data
    </div>
  );
};
ChartTable.defaultProps = {
  data: [],
};
ChartTable.contextTypes = {
  store: PropTypes.shape(),
};
ChartTable.propTypes = {
  data: PropTypes.arrayOf(chartObjectProps),
};

export default ChartTable;
