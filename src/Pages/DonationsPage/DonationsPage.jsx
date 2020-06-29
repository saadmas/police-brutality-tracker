import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BailFundsTable from '../../Components/BailFundsTable/BailFundsTable';

import './DonationsPage.scss';

const DonationsPage = () => {
  const [tab, setTab] = React.useState(0);

  const onTabChange = (event, newTab) => {
    setTab(newTab);
  };

  const getTabContent = () => {
    switch (tab) {
      case 0:
        return <BailFundsTable />;
    }
  };

  return (
    <div className="DonationsPage">
      <Paper className="DonationsPaper">
        <Tabs
          value={tab}
          onChange={onTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Bail Funds" />
          <Tab label="Organizations" />
          <Tab label="Black Owned Businesses" />
        </Tabs>
        {getTabContent()}
      </Paper>
    </div>
  );
};

export default DonationsPage;