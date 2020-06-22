import React from 'react';
import { useDebounce } from 'use-debounce';

import Timeline from '../../Components/Timeline/Timeline';
import TimelineSummary from '../../Components/TimelineSummary/TimelineSummary';
import TimelineFilterPanel from '../../Components/TimelineFilterPanel/TimelineFilterPanel';

const TimelinePage = ({ incidentData }) => {
  const [dateSort, setDateSort] = React.useState('asc');
  const [timelineData, setTimelineData] = React.useState(incidentData);
  const [locationFilter, setLocationFilter] = React.useState({ location: '', type: 'state' });
  const [searchValue, setSearchValue] = React.useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 200);

  React.useEffect(() => {
    const filteredData = getFilteredIncidentData();
    const sortedData = getSortedIncidentData(filteredData);
    setTimelineData(sortedData);
  }, [dateSort, debouncedSearchValue, locationFilter])

  const getSortedIncidentData = (data) => {
    const sortedIncidentData = [...data];
    if (dateSort === 'asc') {
      sortedIncidentData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      sortedIncidentData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return sortedIncidentData;
  };

  const applyLocationFilter = (incident) => {
    let location = locationFilter.location;

    if (!location) {
      return true;
    }

    location = locationFilter.location.toLowerCase();
    if (locationFilter.type === 'city') {
      return incident.city.toLowerCase().includes(location);
    }
    return incident.state.toLowerCase().includes(location);
  };

  const getFilteredIncidentData = () => {
    const loweredSearchValue = debouncedSearchValue.toLowerCase()
    const filteredData = incidentData.filter(incident => {
      const isLocationMatch = applyLocationFilter(incident);
      if (!isLocationMatch) return false;
      const isSearchMatch = incident.date_text.toLowerCase().includes(loweredSearchValue) ||
        incident.name.toLowerCase().includes(loweredSearchValue) ||
        incident.city.toLowerCase().includes(loweredSearchValue) ||
        incident.state.toLowerCase().includes(loweredSearchValue);
      return isLocationMatch && isSearchMatch;
    });
    return filteredData;
  };

  const updateLocation = (location) => {

  };

  return (
    <div>
      <TimelineSummary incidentData={timelineData} />
      <TimelineFilterPanel
        setSearchValue={setSearchValue}
        dateSort={dateSort}
        setDateSort={setDateSort}
        incidentData={incidentData}
        updateLocation={updateLocation}
      />
      <Timeline incidentData={timelineData} />
    </div>
  );
};

export default TimelinePage;
