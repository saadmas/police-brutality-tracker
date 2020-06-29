import React from 'react';

import { donationOrganizations } from './donationOrganizations';

import './DonationOrganizationTab.scss';

const DonationOrganizationTab = () => {

  const getOrgs = () => {
    donationOrganizations.sort((a, b) => a.name.localeCompare(b.name));

    return donationOrganizations.map(org => (
      <div>
        <a href={org.url} className="DonationOrg" target="_blank">
          <span className="DonationOrgText">
            {org.name}
          </span>
        </a>
      </div>
    ));
  };

  return (
    <section className="DonationOrganizationTab">
      {getOrgs()}
    </section>
  );
}

export default DonationOrganizationTab
