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

const SpotifyUser = ({ user, className }) => (
  <div className={`${className} spotify`} title={user || ''}>
    <FontAwesomeIcon icon={faSpotify} />
    {user ? <span>{user}</span> : <a href="/login">Login to</a>}
  </div>
);
SpotifyUser.propTypes = {
  user: PropTypes.string,
  className: PropTypes.string,
};

const UserInfo = ({ fb_user, sp_user, onLogoutClick }) => (
  <div className="logged">
    <div>
      {fb_user.picture_url && <Image src={fb_user.picture_url} circle bsClass="logged__image" />}
      <span>{`Hi, ${fb_user.first_name || 'stranger'}`}</span>
      <span className="logged--hide">{" it's"} nice to see you again.</span>
    </div>
    <SpotifyUser className="logged--hide" user={sp_user.id} />
    <div className="logged--hide" style={{ textAlign: 'center' }}>
      <Button
        bsStyle="warning"
        onClick={() => {
          onLogoutClick && onLogoutClick();
        }}
      >
        Sign out
      </Button>
    </div>
  </div>
);

UserInfo.propTypes = {
  fb_user: PropTypes.object,
  sp_user: PropTypes.object,
  onLogoutClick: PropTypes.func,
};

export default UserInfo;
