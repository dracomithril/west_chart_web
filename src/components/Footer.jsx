/**
 * Created by Gryzli on 12.02.2017.
 */
import React from 'react';

const Footer = () => (
  <footer className="footer">
    <span>
      {'site created by '}
      <a href="https://github.com/dracomithril" target="_newtab">
        dracomithril{' '}
      </a>
      repo on
      <a href="https://github.com/dracomithril/WestChart_ReactApp" target="_newtab">
        <i className="fab fa-github" aria-hidden="true" />
        <br />
      </a>
      {` v${process.env.REACT_APP_VERSION}`}
      <i className="fas fa-copyright" />
      {' Copyright 2017'}
    </span>
    <br />
    <span>
      {'Any questions? '}
      <a href="mailto:dracomithril@gmail.com?subject=[WCSChartAdmin]">
        <i className="fas fa-envelope" />
        {' contact me'}
      </a>
    </span>
    <br />
    <a href="/policy">
      <i className="fab fa-facebook-square" />
      {' Policy'}
    </a>
  </footer>
);

export default Footer;
