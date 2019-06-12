import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Avatar, Menu, MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Policy from './components/Policy';
import About from './components/About';
import Combiner from './components/PlaylistCombiner';
import NotFound from './components/NotFound';
import ChartPresenter from './components/Chart/ChartPresenter';
import LoginAlert from './components/LoginAlert';
import Demo from './components/Demo';
import PrivateRoute from './PrivateRoute';
import { getCredentials } from './utils/spotify_utils';
import actionTypes from './reducers/actionTypes';

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

class Navigation extends React.Component {
  state = {
    // auth: true,
    anchorEl: null,
    anchorEl2: null,
  };

  componentWillMount() {
    const { store } = this.context;
    getCredentials()
      .then(({ userData, accessToken }) => {
        store.dispatch({
          type: actionTypes.UPDATE_SP_USER,
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

  // handleChange = (event, checked) => {
  //   this.setState({ auth: checked });
  // };
  onLogoutClick = () => {
    this.setState({ anchorEl: null });
    const { store } = this.context;
    store.dispatch({ type: actionTypes.SIGN_OUT_USER });
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
    const { store } = this.context;
    const { classes } = this.props;
    const { anchorEl, anchorEl2 } = this.state;
    const { spotifyUser, user } = store.getState();
    const open = Boolean(anchorEl);
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
            {user.id ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar alt={user.name} src={user.picture_url} />
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
                    {`Hi, ${user.first_name}`}
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
          <PrivateRoute path="/chart" exact component={ChartPresenter} />
          {spotifyUser.id && <PrivateRoute path="/combiner" exact component={Combiner} />}
          <Route path="/demo" component={Demo} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

Navigation.contextTypes = {
  store: PropTypes.shape(),
};
Navigation.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    flex: PropTypes.string,
    menuButton: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Navigation);
