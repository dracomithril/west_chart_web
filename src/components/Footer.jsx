/**
 * Created by michal.grezel on 12.02.2017.
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCopyright } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
  <footer className="footer">
    <span>
      {'site created by '}
      <a href="https://github.com/dracomithril" target="_newtab">
        dracomithril
      </a>
      {' '}
      repo on
      <a href="https://github.com/dracomithril/WestChart_ReactApp" target="_newtab">
        <FontAwesomeIcon icon={faGithub} />
        <br />
      </a>
      {` v${process.env.REACT_APP_VERSION}`}
      <FontAwesomeIcon icon={faCopyright} />
      {' Copyright 2017'}
    </span>
    <br />
    <span>
      {'Any questions? '}
      <a href="mailto:dracomithril@gmail.com?subject=[WCSChartAdmin]">
        <FontAwesomeIcon icon={faEnvelope} />
        {' contact me'}
      </a>
    </span>
    <br />
    <a href="/policy">
      <FontAwesomeIcon icon={faFacebookSquare} />
      {' Policy'}
    </a>
  </footer>
);

export default Footer;
