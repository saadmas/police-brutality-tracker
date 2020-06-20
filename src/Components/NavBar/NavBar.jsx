import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';

import './NavBar.scss';

const NavBar = () => {
  return (
    <nav className="NavBar">
      <div className="AppTitle">
        Police Brutality Tracker
      </div>
      <div className="NavItem">
        <a className="NavLink" href="/">
          <span className="NavLinkText">Timeline</span>
          <ScheduleIcon className="NavIcon" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
