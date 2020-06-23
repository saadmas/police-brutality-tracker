import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';

import useWindowDimensions from '../../Hooks/useWindowDimensions';

import './NavBar.scss';

const NavBar = () => {
  const { width } = useWindowDimensions();

  const getDesktopNav = () => (
    <nav className="NavBar">
      <div className="AppTitle">
        Police Brutality Tracker
      </div>
      <div className="NavItem">
        <a className="NavLink" href="/">
          <span className="NavLinkText">Timeline</span>
          <ScheduleIcon className="NavIcon" />
        </a>
        <a className="NavLink" href="/about">
          <span className="NavLinkText">Donations</span>
          <CallReceivedIcon className="NavIcon" />
        </a>
        <a className="NavLink" href="/about">
          <span className="NavLinkText">Report Incident</span>
          <GavelOutlinedIcon className="NavIcon" />
        </a>
        <a className="NavLink" href="/about">
          <span className="NavLinkText">About</span>
          <InfoOutlinedIcon className="NavIcon" />
        </a>
      </div>
    </nav>
  );

  return getDesktopNav();
};

export default NavBar;
