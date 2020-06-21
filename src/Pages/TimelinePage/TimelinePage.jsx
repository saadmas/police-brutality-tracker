import React from 'react';

import Timeline from '../../Components/Timeline/Timeline';
import TimelineSummary from '../../Components/TimelineSummary/TimelineSummary';
import TimelineFilterPanel from '../../Components/TimelineFilterPanel/TimelineFilterPanel';

const TimelinePage = ({ incidentData }) => {
  const [dateSort, setDateSort] = React.useState('asc');
  const [searchValue, setSearchValue] = React.useState('');

  const getSortedIncidentData = (data) => {
    const sortedIncidentData = [...data];
    if (dateSort === 'asc') {
      sortedIncidentData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      sortedIncidentData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return sortedIncidentData;
  };

  const getFilteredIncidentData = () => {
    const loweredSearchValue = searchValue.toLowerCase()
    const filteredData = incidentData.filter(incident =>
      incident.date_text.toLowerCase().includes(loweredSearchValue) ||
      incident.name.toLowerCase().includes(loweredSearchValue) ||
      incident.city.toLowerCase().includes(loweredSearchValue) ||
      incident.state.toLowerCase().includes(loweredSearchValue)
    );
    return filteredData;
  };

  const filteredData = getFilteredIncidentData();
  const sortedData = getSortedIncidentData(filteredData);

  return (
    <div>
      <TimelineSummary incidentData={sortedData} />
      <TimelineFilterPanel
        setSearchValue={setSearchValue}
        dateSort={dateSort}
        setDateSort={setDateSort}
      />
      {/* /// */}
      <Timeline incidentData={sortedData} />
    </div>
  );
};

export default TimelinePage;
