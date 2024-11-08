import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { IconButton, Tooltip } from '@mui/material';

import { useCallback } from 'react';

import { useCurrentOrder } from '../../hooks/useCurrentOrder';
import { useSaveOrder } from '../../hooks/useSaveOrder';

export function EmailTextAction() {
  const currentOrder = useCurrentOrder();
  const saveOrder = useSaveOrder();

  const onEmailRequest = useCallback(() => {
    saveOrder(currentOrder).then((order) => {
      if (order !== null) {
        const id = order.id;

        const { origin, pathname } = window.location;
        window.open(`${origin}${pathname}#/email-text/${id}`, '_blank');
      }
    });
  }, [currentOrder, saveOrder]);

  return (
    <Tooltip title="Angebotstext">
      <IconButton onClick={onEmailRequest} color="inherit">
        <MessageOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
