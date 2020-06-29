import React from 'react';

import { donationOrganizations, blackBusinesses } from './donationOrganizations';

import './DonationOrganizationTab.scss';

const DonationOrganizationTab = ({ donationType }) => {

  const getOrgs = () => {
    let orgs;

    if (donationType === 'blackBusinesses') {
      orgs = blackBusinesses;
    } else {
      orgs = donationOrganizations;
    }

    orgs.sort((a, b) => a.name.localeCompare(b.name));

    return orgs.map(org => (
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
