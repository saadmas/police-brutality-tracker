import React from 'react';
import { useDebounce } from 'use-debounce';

import Timeline from '../../Components/Timeline/Timeline';
import TimelineSummary from '../../Components/TimelineSummary/TimelineSummary';
import TimelineFilterPanel from '../../Components/TimelineFilterPanel/TimelineFilterPanel';

const TimelinePage = ({ incidentData }) => {
  const [dateSort, setDateSort] = React.useState('asc');
  const [timelineData, setTimelineData] = React.useState(incidentData);
  const [searchValue, setSearchValue] = React.useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 200);


  React.useEffect(() => {
    const filteredData = getFilteredIncidentData();
    const sortedData = getSortedIncidentData(filteredData);
    setTimelineData(sortedData);
  }, [dateSort, debouncedSearchValue])

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
    const loweredSearchValue = debouncedSearchValue.toLowerCase()
    const filteredData = incidentData.filter(incident =>
      incident.date_text.toLowerCase().includes(loweredSearchValue) ||
      incident.name.toLowerCase().includes(loweredSearchValue) ||
      incident.city.toLowerCase().includes(loweredSearchValue) ||
      incident.state.toLowerCase().includes(loweredSearchValue)
    );
    console.log('test') ///
    return filteredData;
  };

  return (
    <div>
      <TimelineSummary incidentData={timelineData} />
      <TimelineFilterPanel
        setSearchValue={setSearchValue}
        dateSort={dateSort}
        setDateSort={setDateSort}
      />
      {/* /// */}
      <Timeline incidentData={timelineData} />
    </div>
  );
};

export default TimelinePage;
