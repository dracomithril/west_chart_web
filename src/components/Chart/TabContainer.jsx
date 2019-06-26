import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ paddingTop: 4 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
