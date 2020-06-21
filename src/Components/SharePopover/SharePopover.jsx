import React from 'react';
import Popover from '@material-ui/core/Popover';

import './SharePopover.scss';

const SharePopover = ({ setAnchorEl, anchorEl }) => {

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Popover
      open={!!anchorEl}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      The content of the Popover.
    </Popover>
  );
};

export default SharePopover;