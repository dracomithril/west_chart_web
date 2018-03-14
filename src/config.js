import url from 'url';

const loginPath = '/api/spotify/login_r';
const refreshTokenPath = '/api/spotify/refresh_token';
const obtainCredentialsPath = '/api/spotify/obtain_credentials';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;
const hostname = isProduction ? process.env.REACT_APP_API_URL : '';
const fbAppId = process.env.NODE_ENV === 'production' ? '1173483302721639' : '1173486879387948';
const config = {
  isProduction,
  port,
  hostname,
  api: {
    fb: {
      apiId: fbAppId,
    },
    spotify: {
      get login() {
        return url.resolve(hostname, loginPath);
      },
      get refreshToken() {
        return url.resolve(hostname, refreshTokenPath);
      },
      get obtainCredentials() {
        return url.resolve(hostname, obtainCredentialsPath);
      },
    },
  },
};

export default config;
