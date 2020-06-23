import React from 'react';

import DesktopNavBar from './DesktopNavBar/DesktopNavBar';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

import './NavBar.scss';

const NavBar = () => {
  const { width } = useWindowDimensions();

  return <DesktopNavBar />;
};

export default NavBar;
