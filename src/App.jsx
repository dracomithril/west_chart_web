import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

import Footer from './components/Footer';
import Navigation from './Navigation';

import createStore from './configureStore';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Header />
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
