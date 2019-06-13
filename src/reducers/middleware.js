import actionTypes from './actionTypes';

const getFacebookUser = () => next => (action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER: {
      if (sessionStorage.getItem('facebook_user') !== action.value) {
        sessionStorage.setItem('facebook_user', JSON.stringify(action.value));
      }
      break;
    }
    case actionTypes.SIGN_OUT_USER: {
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
