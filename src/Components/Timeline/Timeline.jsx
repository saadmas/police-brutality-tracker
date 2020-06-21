import React from 'react';

import IncidentCard from '../IncidentCard/IncidentCard';

import './Timeline.scss';

const Timeline = ({ timelineData }) => {
  return (
    <section className="Timeline">
      <ul>
        <IncidentCard />
        <IncidentCard />
        <IncidentCard />
        <IncidentCard />
        <IncidentCard />
        <IncidentCard />
        <IncidentCard />
        <IncidentCard />
      </ul>
    </section>
  );
};

export default Timeline;