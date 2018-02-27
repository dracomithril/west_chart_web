const loginPath = '/api/spotify/login_r';
const refreshTokenPath = '/api/spotify/refresh_token';
const obtainCredentialsPath = '/api/spotify/obtain_credentials';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;
const hostname = isProduction ? process.env.REACT_APP_API_URL : '';
const config = {
  isProduction,
  port,
  hostname,
  api: {
    spotify: {
      get login() {
        return loginPath;
      },
      get refreshToken() {
        return refreshTokenPath;
      },
      get obtainCredentials() {
        return obtainCredentialsPath;
      },
    },
  },
};

export default config;
