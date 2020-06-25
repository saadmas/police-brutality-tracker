import React from 'react';

import DesktopDonationsPage from './DesktopDonationsPage/DesktopDonationsPage';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

const DonationsPage = () => {
  const { width } = useWindowDimensions();

  const getResponsiveDonationsPage = () => {
    if (width > 420) {
      return <DesktopDonationsPage />;
    }
    // return <MobileDonationsPage />;
  };

  return getResponsiveDonationsPage();
};

export default DonationsPage;