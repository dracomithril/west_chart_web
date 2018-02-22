const loginPath = '/api/spotify/login_r';
const refreshTokenPath = '/api/spotify/refresh_token';
const config = {
  isProduction: process.env.NODE_ENV === 'production',
  api: {
    port: process.env.PORT || 3001,
    hostname: this.isProduction ? process.env.redirect_uri : `http://localhost:${this.api.port}`,
    spotify: {
      login: this.api.hostname + loginPath,
      refreshToken: this.apiHostname + refreshTokenPath,
    },
  },
};

export default config;
