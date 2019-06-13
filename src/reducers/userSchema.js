const Joi = require('joi-browser');

const userSchema = Joi.object().keys({
  id: Joi.string(),
  email: Joi.string(),
  name: Joi.string(),
  first_name: Joi.string(),
  accessToken: Joi.string(),
  expiresIn: Joi.number(),
  signedRequest: Joi.string().strip(),
  last_name: Joi.string(),
  picture_url: Joi.string(),
  userID: Joi.any().strip(),
});

export default userSchema;
