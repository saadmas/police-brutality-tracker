import React from 'react';

import Timeline from '../../Components/Timeline/Timeline';

const TimelinePage = ({ incidentData }) => {
  return (
    <Timeline incidentData={incidentData} />
  );
};

export default TimelinePage;
