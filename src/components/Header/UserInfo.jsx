/**
 * Created by Gryzli on 07.04.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Well } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import FacebookLogin from 'react-facebook-login';
import { faSpotify } from '@fortawesome/fontawesome-free-brands';
import './../bootstrap-social.css';
import './Header.css';
import { api } from '../../config';
// TODO save information about user to database, do it somewhere else

const UserInfo = ({ fb_user, sp_user, onLogoutClick, onFbLogin }) => (
  <Well bsClass="logged">
    <div>
      {fb_user.picture_url && <Image src={fb_user.picture_url} circle />}
      <span>{`Hi, ${fb_user.first_name || 'stranger'}`}</span>
      <br />
      <span>it is nice to see you again.</span>
      <br />
      {fb_user.id === undefined ? (
        <FacebookLogin
          appId={api.fb.apiId}
          language="pl_PL"
          autoLoad
          scope="public_profile,email,user_managed_groups"
          callback={response => {
            onFbLogin && onFbLogin(response);
          }}
          fields={'id,email,name,first_name,picture,groups{administrator}'}
        />
      ) : (
        <div className="spotify">
          <FontAwesomeIcon icon={faSpotify} />
          <span>{sp_user.id}</span>
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
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
  </Well>
);

UserInfo.propTypes = {
  fb_user: PropTypes.object,
  sp_user: PropTypes.object,
  onLogoutClick: PropTypes.func,
  onFbLogin: PropTypes.func,
};

export default UserInfo;
