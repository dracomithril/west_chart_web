import { action_types } from './action_types';

const getFacebookUser = store => next => action => {
  if (action.type === action_types.UPDATE_USER) {
    if (sessionStorage.getItem('facebook_user') !== action.value) {
      sessionStorage.setItem('facebook_user', JSON.stringify(action.value));
    }
  }
  return next(action);
};
export const middleware = [getFacebookUser];

export default middleware;
