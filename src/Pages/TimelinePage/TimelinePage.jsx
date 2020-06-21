import React from 'react';

import Timeline from '../../Components/Timeline/Timeline';

const TimelinePage = ({ incidentData }) => {
  const [dateSort, setDateSort] = React.useState('asc');

  const getSortedIncidentData = () => {
    const sortedIncidentData = [...incidentData];
    sortedIncidentData.sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedIncidentData;
  };

  return (
    <Timeline incidentData={getSortedIncidentData()} />
  );
};

export default TimelinePage;
