import React from 'react';
import Iframe from 'react-iframe'; ///

import './IncidentCard.scss';

const IncidentCard = ({ incident }) => {

  const getLocation = () => {
    const { city, state } = incident;
    const location = `${city}, ${state}`;
    return location;
  };

  const getSources = () => {
    const { links } = incident;
    const sources = links.map(link => (
      <iframe
        source={link}
        sandbox="allow-same-origin"
      // width={'100px'}
      // height={'100px'}
      />
    ));
    return [];
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
          <span className="FieldName">Sources: </span>
          {getSources()}
        </span>
      </div>
    </li>
  );
};

export default IncidentCard;