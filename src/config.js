const loginPath = '/api/spotify/login_r';
const refreshTokenPath = '/api/spotify/refresh_token';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3001;
const hostname = isProduction ? process.env.REACT_APP_API_URL : `http://localhost:${port}`;
const config = {
  isProduction,
  port,
  hostname,
  api: {
    spotify: {
      get login() {
        return this.hostname + loginPath;
      },
      get refreshToken() {
        return this.hostname + refreshTokenPath;
      },
    },
  },
};

export default config;
