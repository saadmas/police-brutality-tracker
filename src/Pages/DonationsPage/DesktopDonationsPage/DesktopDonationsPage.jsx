import React from 'react';
import Paper from '@material-ui/core/Paper';

import './DesktopDonationsPage.scss';

const DesktopDonationsPage = ({ bailFunds }) => {

  const getBailFundElements = bailFunds.map((bailFund, index) => (
    <li key={`bail-fund-${index}`}>
      <a href={bailFund.url}>
        {bailFund.state}, {bailFund.city} - {bailFund.name}
      </a>
    </li>
  ));

  const getSearchBar = () => {
    return null; ///
  }


  return (
    <div className="DesktopDonationsPage">
      <section className="BailFundsSection">
        <Paper className="BailFundsPaper" elevation={24}>
          <h2>Bail Funds</h2>
          {getSearchBar()}
          <ul>
            {getBailFundElements()}
          </ul>
        </Paper>
      </section>
    </div>
  );
};

export default DesktopDonationsPage;
