export function initialize() {
  const facebookUserString = sessionStorage.getItem('facebook_user');
  let facebookUser;
  try {
    facebookUser = JSON.parse(facebookUserString);
  } catch (e) {
    facebookUser = {};
  }
  return {
    user: facebookUser,
  };
}

export default initialize;
