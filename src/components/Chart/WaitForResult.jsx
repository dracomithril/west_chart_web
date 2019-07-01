import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export const WaitForResult = ({ text = 'Please wait' }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', flexFlow: 'column-reverse',
  }}
  >
    <span style={{ padding: 10 }}>{text}</span>
    <CircularProgress />
  </div>
);
WaitForResult.propTypes = {
  text: PropTypes.string,
};

export default WaitForResult;
