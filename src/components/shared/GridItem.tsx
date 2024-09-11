import { Grid2Props, Grid2 as Grid } from '@mui/material';
import { PropsWithChildren } from 'react';

export function GridItem(props: Readonly<PropsWithChildren<Grid2Props>>) {
  return (
    <Grid size={6} {...props}>
      {props.children}
    </Grid>
  );
}
