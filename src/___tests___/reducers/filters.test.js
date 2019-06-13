import actionTypes from '../../reducers/actionTypes';
import filters from "../../reducers/filters";
describe('filters', function () {
  const defaultState = {
    "create_control": { "checked": true, "days": 7, "id": "create", "type": "counter" },
    "less_control": { "checked": false, "days": 15, "id": "less", "type": "counter" },
    "more_control": { "checked": false, "days": 1, "id": "more", "type": "counter" },
    "update_control": { "checked": false, "days": 7, "id": "update", "type": "counter" },
    "westletter_control": { "checked": false, "id": "westLetter", "type": "text" },
    "woc_control": { "checked": false, "id": "woc", "type": "text" },
  };
  Object.freeze(defaultState);
  it('should return initialized state', function () {
    const action = {};
    const state = undefined;
    const result =filters(state, action);
    expect(result).toEqual(defaultState);
  });
  it('should only change selected action control [UPDATE_DAYS]', function () {
    const action = {
      type: actionTypes.UPDATE_DAYS,
      id: "create",
      value: 9,
    };
    const state = undefined;
    const result =filters(state, action);
    expect(result).toHaveProperty('create_control.days',9);
  });
  it('should only change selected action control [TOGGLE_FILTER]', function () {
    const action = {
      type: actionTypes.TOGGLE_FILTER,
      id: "less",
      checked: true,
    };
    const result =filters(defaultState, action);
    expect(result).toHaveProperty('less_control.checked',true);
  });
  it('should only change selected action control [TOGGLE_FILTER] westletter_cb', function () {
    const action = {
      type: actionTypes.TOGGLE_FILTER,
      id: "westLetter",
      checked: true,
    };
    const result =filters(defaultState, action);
    expect(result).toHaveProperty('westletter_control.checked', true);
  });
  it('should return current state if type don\'t match', function () {
    const action = {
      type: actionTypes.UPDATE_USER,
      id: "less",
      checked: true,
    };
    const result =filters(defaultState, action);

    expect(result).toHaveProperty('less_control.checked',false);
    expect(result).toHaveProperty('less_control.days',15);
  });
});
