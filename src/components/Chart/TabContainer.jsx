// @flow
import * as React from 'react';
import { Typography } from '@material-ui/core';

type Props = {
  children?: React.Node,
}

export function TabContainer({ children }: Props) {
  return (
    <Typography component="div" style={{ paddingTop: 4 * 3 }}>
      {children}
    </Typography>
  );
}

export default TabContainer;
