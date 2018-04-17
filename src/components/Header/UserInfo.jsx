/**
 * Created by Gryzli on 07.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/fontawesome-free-brands';
import './../bootstrap-social.css';
import './Header.css';
// TODO save information about user to database, do it somewhere else

const UserInfo = ({ fb_user, sp_user, onLogoutClick }) => (
  <div className="logged">
    <div>
      {fb_user.picture_url && <Image src={fb_user.picture_url} circle bsClass="logged__image" />}
      <span>{`Hi, ${fb_user.first_name || 'stranger'}`}</span>
      <span className="logged--hide">{" it's"} nice to see you again.</span>
    </div>
    <div className="logged--hide spotify" title={sp_user.id || ''}>
      <FontAwesomeIcon icon={faSpotify} />
      {sp_user ? <span>{sp_user.id}</span> : <a href="/login">Login to</a>}
    </div>
    <div className="logged--hide" style={{ textAlign: 'center' }}>
      <Button bsStyle="warning" onClick={onLogoutClick}>
        Sign out
      </Button>
    </div>
  </div>
);

UserInfo.propTypes = {
  fb_user: PropTypes.shape({
    first_name: PropTypes.string,
    picture_url: PropTypes.string,
  }),
  sp_user: PropTypes.shape({
    id: PropTypes.string,
  }),
  onLogoutClick: PropTypes.func,
};

export default UserInfo;
