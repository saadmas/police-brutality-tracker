import React from 'react';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Timeline from '../../Components/Timeline/Timeline';
import TimelineSummary from '../../Components/TimelineSummary/TimelineSummary';
import TimelineFilterPanel from '../../Components/TimelineFilterPanel/TimelineFilterPanel';

import './TimelinePage.scss';

const TimelinePage = ({ incidentData, history, match }) => {
  const timelineIncrement = 5;
  const [routeIncidentId, setRouteIncidentId] = React.useState(match.params.incidentId);
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
      setSingleIncidentTimeline(false);
      history.push('/');
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

  const doesLinkMatchSearch = (links, loweredSearchValue) => {
    for (const link of links) {
      if (link.toLowerCase().includes(loweredSearchValue)) {
        return true;
      }
    }
    return false;
  };

  const getFilteredIncidentData = () => {
    const loweredSearchValue = searchValue.toLowerCase();
    const filteredData = incidentData.filter(incident => {
      const isLocationMatch = applyLocationFilter(incident);
      if (!isLocationMatch) return false;
      const isSearchMatch = incident.date_text.toLowerCase().includes(loweredSearchValue) ||
        incident.name.toLowerCase().includes(loweredSearchValue) ||
        incident.city.toLowerCase().includes(loweredSearchValue) ||
        incident.state.toLowerCase().includes(loweredSearchValue) ||
        doesLinkMatchSearch(incident.links, loweredSearchValue);
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

  const showFullTimeline = () => {
    setSingleIncidentTimeline(false);
    history.push('/');
  };

  const getShowFullTimelineButton = () => isSingleIncidentTimeline && (
    <Container>
      <Button className="ShowAllIncidentsButton" onClick={showFullTimeline}>
        View all police brutality incidents since George Floyd's death
      <CachedIcon className="ShowTimelineIcon" />
      </Button>
    </Container>
  );

  const getTimelineFilterPanel = () => !isSingleIncidentTimeline && (
    <TimelineFilterPanel
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      dateSort={dateSort}
      setDateSort={setDateSort}
      incidentData={incidentData}
      updateLocation={updateLocation}
    />
  );

  return (
    <div className="TimelinePage">
      <TimelineSummary incidentData={timelineData} />
      {getTimelineFilterPanel()}
      {getShowFullTimelineButton()}
      <Timeline
        incidentData={getIncidentsForTimeline()}
        loadMore={loadMore}
        isSingleIncidentTimeline={isSingleIncidentTimeline}
        fullIncidentListLength={timelineData.length}
      />
    </div>
  );
};

export default TimelinePage;
