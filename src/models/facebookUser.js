// @flow
import Joi from 'joi-browser';
import userSchema from './userSchema';

type FacebookResponse = {
  id: string,
  email: string,
  name: string,
  first_name: string,
  accessToken: string,
  expiresIn: number,
  signedRequest: string,
  last_name: string,
  picture_url: string,
  userID: string,
}
type FacebookUser ={
  id: string,
  email: string,
  name: string,
  firstName: string,
  accessToken: string,
  lastName: string,
  pictureUrl: string,
  userID: string,
}

const createUser = function createUser(fbUser: FacebookResponse): FacebookUser | null {
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
