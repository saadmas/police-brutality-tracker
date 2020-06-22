import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Arrest from '.././../Icons/Arrest';
import Baton from '.././../Icons/Baton';
import Handcuffed from '.././../Icons/Handcuffed';
import Handcuffs from '.././../Icons/Handcuffs';
import Manacles from '.././../Icons/Manacles';
import PoliceBadge from '.././../Icons/PoliceBadge';
import PoliceCar from '.././../Icons/PoliceCar';
import PoliceOfficerHead from '.././../Icons/PoliceOfficerHead';
import IncidentCard from '../IncidentCard/IncidentCard';

import './Timeline.scss';

const Timeline = ({ incidentData }) => {
  const timelineIncrement = 10;
  const icons = [
    <Arrest className="RoundIcon" />,
    <Baton className="RoundIcon" />,
    <Handcuffed className="RoundIcon" />,
    <Handcuffs className="RoundIcon" />,
    <Manacles className="RoundIcon" />,
    <PoliceCar className="RoundIcon" />,
    <PoliceBadge className="RoundIcon" />,
    <PoliceOfficerHead className="RoundIcon" />
  ];
  const [timelineSize, setTimeLineSize] = React.useState(timelineIncrement);

  const getIcon = (elementIndex) => {
    const idxStr = elementIndex.toString();
    const unitDigit = idxStr[idxStr.length - 1];
    let iconIndex = Number(unitDigit);

    if (iconIndex > 7) {
      iconIndex = Math.floor(Math.random() * 8);
    }

    return icons[iconIndex];
  };

  const getEvenItemStyleProps = () => ({
    contentStyle: { background: 'rgb(33, 150, 243)', color: '#e0e0e0' },
    contentArrowStyle: { borderRight: '7px solid  rgb(33, 150, 243)' },
    iconStyle: { background: 'rgb(33, 150, 243)', color: '#e0e0e0' },
  });

  const getOddItemStyleProps = () => ({
    contentStyle: { background: 'rgb(233, 30, 99)', color: '#fff' },
    contentArrowStyle: { borderRight: '7px solid  rgb(233, 30, 99)' },
    iconStyle: { background: 'rgb(233, 30, 99)', color: '#fff' },
  });

  const getIncidents = () => {
    const sliceEnd = timelineSize > incidentData.length ? incidentData.length : timelineSize;
    let incidents = incidentData.slice(0, sliceEnd);
    incidents = incidents.map((incident, index) => {
      const styleProps = index % 2 === 0 ? getEvenItemStyleProps() : getOddItemStyleProps();
      return (
        <VerticalTimelineElement
          date={incident.date_text}
          dateClassName="IncidentDate"
          textClassName="TimelineElement"
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={getIcon(index)}
          {...styleProps}
        >
          <IncidentCard incident={incident} />
        </VerticalTimelineElement>
      );
    });
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