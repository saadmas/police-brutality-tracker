import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';

import './MobileNavBar.scss';

const MobileNavBar = () => {
  const [isBladeOpen, setIsBladeOpen] = React.useState(false);

  const closeBlade = () => {
    setIsBladeOpen(false);
  };

  const openBlade = () => {
    setIsBladeOpen(true);
  };

  const getNavBar = () => {
    return (
      <List>
        <ListItem button>
          <ListItemIcon><ScheduleIcon /></ListItemIcon>
          <ListItemText primary="Timeline" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><CallReceivedIcon /></ListItemIcon>
          <ListItemText primary="Donations" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><GavelOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Report Incident" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    );
  };

  return (
    <span className="MobileNavBar">
      <h1 className="AppTitle">Police Brutality Tracker</h1>
      <IconButton
        aria-label="menu"
        className="MenuButton"
        onClick={openBlade}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isBladeOpen}
        onClose={closeBlade}
      >
        {getNavBar()}
      </Drawer>
    </span>
  );
};

export default MobileNavBar;