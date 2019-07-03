// @flow
import { combineReducers } from 'redux';
import actionTypes from './actionTypes';
import type { Action, Filter, Filters } from '../types';

const showDays = 7;

const control_state = (defaultState: Filter) => (state: Filter = defaultState,
  action: Action): Filter => {
  if (state.id === action.id) {
    switch (action.type) {
      case actionTypes.TOGGLE_FILTER:
        return Object.assign({}, state, { checked: action.checked });
      case actionTypes.UPDATE_DAYS:
        return Object.assign({}, state, { days: action.value });
      default:
        return state;
    }
  } else {
    return state;
  }
};

const filters: Filters = combineReducers({
  create_control: control_state(
    {
      checked: false,
      id: 'create',
      days: showDays,
      type: 'counter',
    },
  ),
  update_control: control_state({
    checked: false,
    id: 'update',
    days: showDays,
    type: 'counter',
  }),
  // todo less & more should be count or value it shows how many reaction was for post
  less_control: control_state(
    {
      checked: false,
      id: 'less',
      days: 15,
      type: 'counter',
    },
  ),
  more_control: control_state({
    checked: false,
    id: 'more',
    days: 1,
    type: 'counter',
  }),
  woc_control: control_state({ checked: false, id: 'woc', type: 'text' }),
  westletter_control: control_state({ checked: false, id: 'westLetter', type: 'text' }),
});

export default filters;
