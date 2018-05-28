import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CookieBanner from 'react-cookie-banner';

import Footer from './components/Footer';
import Navigation from './Navigation';
import createStore from './configureStore';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <div className="wcs_header">
          <img src="/pic/banner.png" alt="header logo" style={{ width: '100%', height: 'inherit' }} />
        </div>
        <CookieBanner
          message={"Yes, we use cookies. If you don't like it change website, we won't miss you! ;)"}
          cookie="user-has-accepted-cookies"
        />
        <Navigation />
        <Footer />
      </div>
    </Router>
  </Provider>
);

App.contextTypes = {
  store: PropTypes.object,
};
export default App;
