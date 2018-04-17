/**
 * Created by Gryzli on 26.01.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import '../components.css';
import { chartObjectProps } from './../typeDefinitions';
import ChartRow from './ChartRow';
import Checkbox from '../universal/Checkbox';
import { action_types } from './../../reducers/action_types';

const ChartTable = ({ data }, { store }) => {
  const ChartRows = data.map(entry => (
    <ChartRow
      id={entry.id}
      checked={entry.selected}
      created_time={entry.created_time}
      updated_time={entry.updated_time}
      link={entry.link}
      from={entry.from}
      key={entry.id}
      reactions_num={entry.reactions_num}
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
        <Checkbox
          id="selectAll"
          onChange={({ checked }) => {
            store.dispatch({ type: action_types.TOGGLE_ALL, value: checked });
          }}
        />select all
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

ChartTable.contextTypes = {
  store: PropTypes.object,
};
ChartTable.propTypes = {
  data: PropTypes.arrayOf(chartObjectProps),
};

export default ChartTable;
