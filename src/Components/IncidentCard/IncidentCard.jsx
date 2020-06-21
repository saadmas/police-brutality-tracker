import React from 'react';

import './IncidentCard.scss';

const IncidentCard = ({ incident }) => {

  const getLocation = () => {
    const { city, state } = incident;
    const location = `${city}, ${state}`;
    return location;
  };

  return (
    <li className="IncidentCard">
      <div>
        <span className="Block IncidentInfo">{incident.name}</span>
        <span className="Block">
          <span className="FieldName">Date: </span>
          {incident.date_text}
        </span>
        <span className="Block">
          <span className="FieldName">Location: </span>
          {getLocation()}
        </span>
        <span className="Block">
          <span className="FieldName">Links: </span>
          {incident.link}
        </span>
      </div>
    </li>
  );
};

export default IncidentCard;