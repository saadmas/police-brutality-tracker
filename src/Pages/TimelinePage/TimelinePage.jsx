import React from 'react';

import Timeline from '../../Components/Timeline/Timeline';
import TimelineSummary from '../../Components/TimelineSummary/TimelineSummary';

const TimelinePage = ({ incidentData }) => {
  const [dateSort, setDateSort] = React.useState('asc');

  const getSortedIncidentData = () => {
    const sortedIncidentData = [...incidentData];
    sortedIncidentData.sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedIncidentData;
  };

  return (
    <div>
      <TimelineSummary incidentData={incidentData} />
      {/* /// */}
      <Timeline incidentData={getSortedIncidentData()} />
    </div>
  );
};

export default TimelinePage;
