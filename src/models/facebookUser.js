import Joi from 'joi-browser';
import userSchema from './userSchema';

const createUser = function createUser(fbUser) {
  const { error, value } = Joi.validate(fbUser, userSchema);
  if (error) {
    return null;
  }
  const {
    userID, email, first_name, last_name, accessToken, picture_url,
  } = value;
  return {
    userID,
    get id() {
      return this.userID;
    },
    email,
    firstName: first_name,
    lastName: last_name,
    get name() {
      return `${this.firstName} ${this.lastName}`;
    },
    accessToken,
    pictureUrl: picture_url,
  };
};

export default createUser;
