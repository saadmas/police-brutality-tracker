import React from 'react';
import CountUp from 'react-countup';

import './TimelineSummary.scss';

const TimelineSummary = ({ incidentData }) => {

  const getIncidentCount = () => {
    return (
      <CountUp
        end={incidentData.length}
        className="IncidentCount"
        duration={5}
        delay={3}
      />
    );
  };

  return (
    <div className="TimelineSummary">
      <div className="IncidentCountSection">
        {getIncidentCount()}
        <div className="IncidentText">
          police brutality incidents since May 25th, 2020
        </div>
      </div>
    </div>
  );
};

export default TimelineSummary;