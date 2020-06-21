import React from 'react';

import IncidentCard from '../IncidentCard/IncidentCard';

import './Timeline.scss';

const Timeline = ({ incidentData }) => {
  const getIncidents = () => {
    const incidents = incidentData.map(incident => <IncidentCard incident={incident} />);
    return incidents;
  };

  return (
    <section className="Timeline">
      <ul>
        {/* /// */}
        {getIncidents().slice(0, 1)}
      </ul>
    </section>
  );
};

export default Timeline;