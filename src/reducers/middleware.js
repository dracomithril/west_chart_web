import { action_types } from './action_types';

const getFacebookUser = store => next => action => {
  switch (action.type) {
    case action_types.UPDATE_USER: {
      if (sessionStorage.getItem('facebook_user') !== action.value) {
        sessionStorage.setItem('facebook_user', JSON.stringify(action.value));
      }
      break;
    }
    case action_types.SIGN_OUT_USER: {
      sessionStorage.removeItem('facebook_user');
      break;
    }
    default:
      break;
  }
  return next(action);
};
export const middleware = [getFacebookUser];

export default middleware;
