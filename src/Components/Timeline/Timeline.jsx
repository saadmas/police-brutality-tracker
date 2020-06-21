import React from 'react';

import IncidentCard from '../IncidentCard/IncidentCard';

import './Timeline.scss';

const Timeline = ({ incidentData }) => {
  const getIncidents = () => {
    const incidents = incidentData.map(incident => <IncidentCard incident={incident} />);
    return incidents;
  };

  if (!incidentData.length) {
    return (
      <section className="NoIncidentSection">
        No police brutality incidents to show
      </section>
    );
  }

  return (
    <section className="Timeline">
      <ul>
        {getIncidents()}
      </ul>
    </section>
  );
};

export default Timeline;