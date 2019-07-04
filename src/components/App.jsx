import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CookieBanner from 'react-cookie-banner';

import Footer from './Footer';
import Navigation from './Navigation';
import createStore from '../configureStore';

const store = createStore();

class App extends React.Component {
  componentDidMount() {
    fetch('api/info')
      .then(resp => resp.text())
      .then((resp) => {
        console.info('response from api:', resp);
      })
      .catch((err) => {
        console.error('failed to call api :(', err.message);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
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
  }
}

App.contextTypes = {
  store: PropTypes.shape(),
};
export default App;
