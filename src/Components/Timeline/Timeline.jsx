import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import IncidentCard from '../IncidentCard/IncidentCard';

import './Timeline.scss';

const Timeline = ({ incidentData }) => {
  const timelineIncrement = 2;
  const [timelineSize, setTimeLineSize] = React.useState(timelineIncrement);

  const getIncidents = () => {
    const sliceEnd = timelineSize > incidentData.length ? incidentData.length : timelineSize;
    let incidents = incidentData.slice(0, sliceEnd);
    incidents = incidents.map(incident => (
      <VerticalTimelineElement
        date={incident.date_text}
      >
        <IncidentCard incident={incident} />
      </VerticalTimelineElement>
    ));
    return incidents;
  };

  if (!incidentData.length) {
    return (
      <section className="NoIncidentSection">
        No police brutality incidents to show
      </section>
    );
  }

  const loadMore = () => {
    setTimeLineSize(prevSize => prevSize + timelineIncrement);
  };

  const getLoadMoreButton = () => (
    <Fab classes={{ root: 'FabButton' }} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );

  return (
    <section className="Timeline">
      <VerticalTimeline>
        {getIncidents()}
        <VerticalTimelineElement
          iconOnClick={loadMore}
          iconClassName="LoadMoreButton"
          icon={getLoadMoreButton()}
        />
      </VerticalTimeline>
    </section>
  );
};

export default Timeline;