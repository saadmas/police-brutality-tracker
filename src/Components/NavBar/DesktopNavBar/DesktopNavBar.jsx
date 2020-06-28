import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
import { Link } from 'react-router-dom'

import './DesktopNavBar.scss';

const DesktopNavBar = () => {
  return (
    <nav className="NavBar">
      <div className="AppTitle">
        Police Brutality Tracker
      </div>
      <div className="NavItem">
        <Link className="NavLink" to="/">
          <span className="NavLinkText">Timeline</span>
          <ScheduleIcon className="NavIcon" />
        </Link>
        <Link className="NavLink" to="/donations">
          <span className="NavLinkText">Donations</span>
          <CallReceivedIcon className="NavIcon" />
        </Link>
        <Link className="NavLink" to="/report-incident">
          <span className="NavLinkText">Report Incident</span>
          <GavelOutlinedIcon className="NavIcon" />
        </Link>
        <Link className="NavLink" to="/about">
          <span className="NavLinkText">About</span>
          <InfoOutlinedIcon className="NavIcon" />
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNavBar;