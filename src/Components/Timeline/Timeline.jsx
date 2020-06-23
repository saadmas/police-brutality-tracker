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
import PistolGun from '.././../Icons/PistolGun';
import PoliceOfficerHead from '.././../Icons/PoliceOfficerHead';
import IncidentCard from '../IncidentCard/IncidentCard';

import './Timeline.scss';

const Timeline = ({ incidentData, loadMore }) => {
  const icons = [
    <Arrest className="RoundIcon" />,
    <Baton className="RoundIcon" />,
    <Handcuffed className="RoundIcon" />,
    <Handcuffs className="RoundIcon" />,
    <Manacles className="RoundIcon" />,
    // <PoliceCar className="RoundIcon" />,///
    <PoliceBadge className="RoundIcon" />,
    <PoliceOfficerHead className="RoundIcon" />
  ];

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
    contentArrowStyle: { borderRight: '7px solid #667db6' }
  });

  const getOddItemStyleProps = () => ({
    contentArrowStyle: { borderRight: '7px solid #93291E' }
  });

  const getIncidents = () => {
    const incidents = incidentData.map((incident, index) => {
      const isEven = index % 2 === 0;
      const styleProps = isEven ? getEvenItemStyleProps() : getOddItemStyleProps();
      const className = isEven ? 'Even' : 'Odd';
      return (
        <VerticalTimelineElement
          date={incident.date_text}
          dateClassName="IncidentDate" b
          textClassName={`TimelineElement ${className}`}
          icon={<PistolGun />}
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