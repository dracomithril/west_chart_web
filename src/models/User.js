// @flow
import moment from 'moment';

function User(id: string, accessToken: string, expiresIn: moment | string) {
  if (typeof expiresIn === 'string') {
    expiresIn = moment(expiresIn);
  }
  return {
    id,
    expiresIn,
    tokens: {
      access: accessToken,
    },
    get accessToken() {
      if (this.isTokenValid) {
        return this.tokens.access;
      }
      return null;
    },
    get isTokenValid() {
      return moment().isBefore(this.expiresIn);
    },
  };
}

export default User;
