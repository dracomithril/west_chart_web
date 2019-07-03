// @flow
import { CircularProgress } from '@material-ui/core';
import React from 'react';

export const WaitForResult = ({ text = 'Please wait' }: { text?: string }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', flexFlow: 'column-reverse',
  }}
  >
    <span style={{ padding: 10 }}>{text}</span>
    <CircularProgress />
  </div>
);

export default WaitForResult;
