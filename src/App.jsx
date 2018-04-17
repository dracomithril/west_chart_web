import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Header from './components/Header';

import Footer from './components/Footer';
import Navigation from './Navigation';
import { getCredentials } from './utils/spotify_utils';
import { action_types } from './reducers';

class App extends React.Component {
  componentWillMount() {
    const { store } = this.context;
    getCredentials()
      .then(({ userData, accessToken }) => {
        store.dispatch({
          type: action_types.UPDATE_SP_USER,
          user: userData,
          access_token: accessToken,
        });
        return Promise.resolve(true);
      })
      .catch(() => Promise.resolve(false));
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navigation />
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object,
};
export default App;
