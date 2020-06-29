import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ScrollableAnchor from 'react-scrollable-anchor';

import Handcuffed from '../../Icons/Handcuffed';
import Handcuffs from '../../Icons/Handcuffs';
import Manacles from '../../Icons/Manacles';
import PistolGun from '../../Icons/PistolGun';
import PoliceBadge from '../../Icons/PoliceBadge';
import PoliceCar from '../../Icons/PoliceCar';
import PoliceOfficerHead from '../../Icons/PoliceOfficerHead';
import RiotShield from '../../Icons/RiotShield';
import IncidentCard from '../IncidentCard/IncidentCard';

import './Timeline.scss';

const Timeline = ({ incidentData, loadMore, fullIncidentListLength, isSingleIncidentTimeline }) => {

  const icons = [
    <Handcuffed className="RoundIcon" />,
    <PoliceOfficerHead className="RoundIcon" />,
    <PoliceCar className="RoundIcon" />,
    <Manacles className="RoundIcon" />,
    <PistolGun className="RoundIcon" />,
    <RiotShield className="RoundIcon" />,
    <Handcuffs className="RoundIcon" />,
    <PoliceBadge className="RoundIcon" />,
  ];

  const isFullIncidentList = () => fullIncidentListLength === incidentData.length;

  const getIcon = (elementIndex) => {
    const idxStr = elementIndex.toString();
    const unitDigit = idxStr[idxStr.length - 1];
    let iconIndex = Number(unitDigit);

    if (iconIndex > 7) {
      iconIndex = Math.floor(Math.random() * 7);
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
    const incidentElements = incidentData.map((incident, index) => {
      const isEven = index % 2 === 0;
      const styleProps = isEven ? getEvenItemStyleProps() : getOddItemStyleProps();
      const className = isEven ? 'Even' : 'Odd';

      return (
        <VerticalTimelineElement
          id={incident.id}
          key={`incident-${index}-timeline-element`}
          date={incident.date_text}
          dateClassName="IncidentDate" b
          textClassName={`TimelineElement ${className}`}
          icon={getIcon(index)}
          iconStyle={{ background: '#0A0A0A' }}
          {...styleProps}
        >
          <ScrollableAnchor id={incident.id}>
            <IncidentCard incident={incident} />
          </ScrollableAnchor>
        </VerticalTimelineElement>
      );
    });

    return incidentElements;
  };

  if (!incidentData.length) {
    return (
      <section className="NoIncidentSection">
        No police brutality incidents to show
      </section>
    );
  }

  const getLoadMoreElement = () => {
    if (isFullIncidentList() || isSingleIncidentTimeline) {
      return null;
    }

    return (
      <VerticalTimelineElement
        iconOnClick={loadMore}
        iconClassName="LoadMoreButton"
        icon={getLoadMoreButton()}
      />
    );
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
        {getLoadMoreElement()}
      </VerticalTimeline>
    </section>
  );
};

export default Timeline;