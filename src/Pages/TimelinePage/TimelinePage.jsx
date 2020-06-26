import React from 'react';

import Timeline from '../../Components/Timeline/Timeline';
import TimelineSummary from '../../Components/TimelineSummary/TimelineSummary';
import TimelineFilterPanel from '../../Components/TimelineFilterPanel/TimelineFilterPanel';

const TimelinePage = ({ incidentData, match, history }) => {
  const timelineIncrement = 5;
  const routeIncidentId = match.params.incidentId;
  const [dateSort, setDateSort] = React.useState('asc');
  const [timelineData, setTimelineData] = React.useState(incidentData);
  const [locationFilter, setLocationFilter] = React.useState({ location: '', type: 'state' });
  const [searchValue, setSearchValue] = React.useState('');
  const [timelineSize, setTimeLineSize] = React.useState(timelineIncrement);
  const [isSingleIncidentTimeline, setSingleIncidentTimeline] = React.useState(false);

  React.useEffect(() => {
    handleIncidentFromRoute();
  }, [routeIncidentId]);

  React.useEffect(() => {
    const filteredData = getFilteredIncidentData();
    const sortedData = getSortedIncidentData(filteredData);
    setTimelineData(sortedData);
    setTimeLineSize(timelineIncrement);
  }, [dateSort, searchValue, locationFilter])

  const handleIncidentFromRoute = () => {
    if (!routeIncidentId) {
      return;
    }

    const isValidIncident = incidentData.find(incident => incident.id === routeIncidentId);
    if (!isValidIncident) {
      history.push('/');
      return;
    }

    setSingleIncidentTimeline(true);
  };

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
    const loweredSearchValue = searchValue.toLowerCase();
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
    setLocationFilter(location);
  };

  const getIncidentsForTimeline = () => {
    let incidents;

    if (isSingleIncidentTimeline) {
      const incidentFromRoute = timelineData.find(incident => incident.id === routeIncidentId);
      incidents = [incidentFromRoute];
    } else {
      incidents = getIncidentsSlice();
    }

    return incidents;
  };

  const getIncidentsSlice = () => {
    const sliceEnd = timelineSize > timelineData.length ? timelineData.length : timelineSize;
    const incidentSlice = timelineData.slice(0, sliceEnd);
    return incidentSlice;
  };

  const loadMore = () => {
    setTimeLineSize(prevSize => prevSize + timelineIncrement);
  };

  return (
    <div className="TimelinePage">
      <TimelineSummary incidentData={timelineData} />
      <TimelineFilterPanel
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        dateSort={dateSort}
        setDateSort={setDateSort}
        incidentData={incidentData}
        updateLocation={updateLocation}
      />
      <Timeline
        incidentData={getIncidentsForTimeline()}
        loadMore={loadMore}
        fullIncidentListLength={timelineData.length}
      />
    </div>
  );
};

export default TimelinePage;
