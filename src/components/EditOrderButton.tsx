import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Button } from '@mui/material';

import { Link } from 'react-router-dom';

interface Props {
  id: string | number | undefined;
  target?: '_blank' | '_self' | '_parent' | '_top';
}
export function EditOrderButton({ id, target }: Readonly<Props>) {
  return (
    <Link target={target} to={`/edit/${id}`}>
      <Button size="small" endIcon={<ChevronRightOutlinedIcon fontSize="small" />}>
        {id}
      </Button>
    </Link>
  );
}
