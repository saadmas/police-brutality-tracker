import React from 'react';
import Iframe from 'react-iframe'; ///
import VisibilitySensor from 'react-visibility-sensor';

import './IncidentCard.scss';

const IncidentCard = ({ incident }) => {
  const [inViewPort, setInViewPort] = React.useState(true);

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

  const getClassNames = () => {
    const classNames = ['IncidentCard'];

    if (inViewPort) {
      classNames.push('InView');
    }

    return classNames.join(' ');
  };

  const getCard = () => {
    return (
      <li className={getClassNames()}>
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

  const onVisChange = (isVisible) => {
    setInViewPort(isVisible);
  }

  return (
    <VisibilitySensor onChange={onVisChange}>
      {getCard()}
    </VisibilitySensor>
  );
};

export default IncidentCard;