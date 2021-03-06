import url from 'url';

const loginPath = '/api/spotify/login_r';
const refreshTokenPath = '/api/spotify/refresh_token';
const obtainCredentialsPath = '/api/spotify/obtain_credentials';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;
const protocol = isProduction ? 'https' : undefined;
export const hostname = isProduction ? process.env.REACT_APP_API_URL : undefined;
const fbAppId = '1173483302721639';
export const facebookGroup = '1707149242852457';
export const facebookScope = process.env.REACT_APP_FACEBOOK_SCOPE || 'public_profile,email';
export const api = {
  fb: {
    apiId: fbAppId,
    scope: facebookScope,
  },
  spotify: {
    get login() {
      return url.format({ protocol, hostname, pathname: loginPath });
    },
    get refreshToken() {
      return url.format({ protocol, hostname, pathname: refreshTokenPath });
    },
    get obtainCredentials() {
      return url.format({ protocol, hostname, pathname: obtainCredentialsPath });
    },
  },
};

const config = {
  isProduction,
  port,
  hostname,
  api,
};

export default config;
