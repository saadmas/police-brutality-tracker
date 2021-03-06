import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BailFundsTable from '../../Components/BailFundsTable/BailFundsTable';
import DonationOrganizationTab from '../../Components/DonationOrganizationTab/DonationOrganizationTab';

import './DonationsPage.scss';

const DonationsPage = () => {
  const [tab, setTab] = React.useState(0);

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  const getTabContent = () => {
    switch (tab) {
      case 0:
        return <BailFundsTable />;
      case 1:
        return <DonationOrganizationTab />;
      case 2:
      default:
        return <DonationOrganizationTab donationType="blackBusinesses" />;
    }
  };

  return (
    <section className="DonationsPage">
      <Tabs
        value={tab}
        onChange={onTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab label="Bail Funds" textColor="primary" />
        <Tab label="Organizations" textColor="primary" />
        <Tab label="Black Owned Businesses" textColor="primary" />
      </Tabs>
      {getTabContent()}
    </section>
  );
};

export default DonationsPage;