import React from 'react';

import DesktopNavBar from './DesktopNavBar/DesktopNavBar';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import MobileNavBar from './MobileNavBar/MobileNavBar';

import './NavBar.scss';

const NavBar = () => {
  const { width } = useWindowDimensions();

  const getResponsiveNavBar = () => {
    if (width > 1100) {
      return <DesktopNavBar />;
    }
    return <MobileNavBar />;
  };

  return getResponsiveNavBar();
};

export default NavBar;
