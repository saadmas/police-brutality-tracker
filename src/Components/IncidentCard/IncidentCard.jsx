import React from 'react';

import './IncidentCard.scss';

const IncidentCard = ({ incidentInfo }) => {
  return (
    <li className="IncidentCard">
      <div>
        <time>1934</time>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
        praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
      </div>
    </li>
  );
};

export default IncidentCard;