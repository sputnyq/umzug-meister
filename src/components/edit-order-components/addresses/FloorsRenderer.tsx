import { Chip, Stack } from '@mui/material';

import { useSelector } from 'react-redux';

import { AppState } from '../../../store';

import { Order } from 'um-types';

interface Props {
  path: 'from' | 'to';
}

export const FloorsRenderer = ({ path }: Readonly<Props>) => {
  const order = useSelector<AppState, Order | null>((s) => s.app.current);

  if (order == null) {
    return null;
  }

  if (order[path]?.stockwerke) {
    return (
      <Stack direction="row" spacing={2}>
        {order[path]?.stockwerke?.map((s) => <Chip key={s} label={s} />)}
      </Stack>
    );
  }
  return null;
};
