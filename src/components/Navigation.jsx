// @flow
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import Policy from './Policy';
import About from './About';
import Combiner from './Playlist/PlaylistCombiner';
import NotFound from './NotFound';
import ChartPresenterContainer from './Chart/ChartPresenter';
import LoginAlert from './LoginAlert';
import Demo from './Demo';
import PrivateRoute from './PrivateRoute';
import { getCredentials } from '../utils/spotify_utils';
import actionTypes from '../reducers/actionTypes';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const ITEM_HEIGHT = 48;

const options = [
  { name: 'Info', href: '/' },
  { name: 'Chart', href: '/chart' },
  { name: 'Combiner(BETA)', href: '/combiner' },
  { name: 'Demo', href: '/demo' },
];
type Props = {
  facebookUser: {
    id: string,
    picture_url: string,
    id: string,
    name: string,
    first_name: string, },
  spotifyUser: {id: string},
  signOutUser: ()=>mixed,
  updateSpotifyUser: ({}, string)=>mixed,
  classes: {
    root: string,
    flex: string,
    menuButton: string,
  },
};
type State = {
  anchorEl: React.Node | null,
  anchorEl2: null,
}

class Navigation extends React.Component<Props, State> {
  state = {
    // auth: true,
    anchorEl: null,
    anchorEl2: null,
  };

  componentDidMount() {
    const { updateSpotifyUser } = this.props;
    getCredentials()
      .then(({ userData, accessToken }) => {
        updateSpotifyUser(userData, accessToken);
        return Promise.resolve(true);
      })
      .catch(() => Promise.resolve(false));
  }

  onLogoutClick = () => {
    this.setState({ anchorEl: null });
    const { signOutUser } = this.props;
    signOutUser();
    window.location = '/';
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClick = (event) => {
    this.setState({ anchorEl2: event.currentTarget });
  };

  handleClose = name => href => () => {
    this.setState({ [name]: null });
    if (href) window.location = href;
  };

  render() {
    const { classes, spotifyUser, facebookUser } = this.props;
    const { anchorEl, anchorEl2 } = this.state;
    const open = Boolean(anchorEl);
    const {
      picture_url, id, name, first_name,
    } = facebookUser;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              className={classes.menuButton}
              aria-label="Menu"
              aria-owns={anchorEl2 ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl2}
              open={Boolean(anchorEl2)}
              onClose={this.handleClose('anchorEl2')()}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {options.map(option => (
                <MenuItem
                  key={option.name}
                  selected={option === 'Pyxis'}
                  onClick={this.handleClose('anchorEl2')(option.href)}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="title" color="inherit" className={classes.flex}>
              WCS Music Chart
            </Typography>
            {id ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar alt={name} src={picture_url} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose('anchorEl')()}
                >
                  <div>
                    {`Hi, ${first_name}`}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faSpotify} />
                    {spotifyUser.id || (
                    <a href="/login">
login
                    </a>
                    )}
                  </div>
                  <MenuItem onClick={this.handleClose('anchorEl')()}>
Profile
                  </MenuItem>
                  <MenuItem onClick={this.onLogoutClick}>
Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" href="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/policy" exact component={Policy} />
          <Route path="/login" component={LoginAlert} />
          <PrivateRoute path="/chart" exact component={ChartPresenterContainer} />
          {spotifyUser.id && <PrivateRoute path="/combiner" exact component={Combiner} />}
          <Route path="/demo" component={Demo} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ facebookUser, spotifyUser } /* , ownProps */) => ({
  facebookUser, spotifyUser,
});

const mapDispatchToProps = dispatch => ({
  signOutUser: () => {
    dispatch({ type: actionTypes.SIGN_OUT_USER });
  },
  updateSpotifyUser: (userData, accessToken) => {
    dispatch({
      type: actionTypes.UPDATE_SP_USER,
      user: userData,
      access_token: accessToken,
    });
  },
});

const componentWithStyles = withStyles(styles)(Navigation);
export default connect(mapStateToProps, mapDispatchToProps)(componentWithStyles);
