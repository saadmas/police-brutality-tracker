import React from 'react';
import CountUp from 'react-countup';

import './TimelineSummary.scss';

const TimelineSummary = ({ incidentData }) => {

  const getTotalIncidentCount = () => {
    return (
      <CountUp
        end={incidentData.length}
        className="IncidentCount"
        duration={5}
        delay={3}
      />
    );
  };

  const getWeekIncidentCount = () => {
    const today = new Date();
    const thisWeekIncidents = incidentData.filter(incident => {
      const incidentDate = new Date(incident.date);
      const diffTime = Math.abs(today - incidentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    })

    return (
      <CountUp
        end={thisWeekIncidents.length}
        className="IncidentCount"
        duration={5}
        delay={3}
      />
    );
  };

  const getTodayIncidentCount = () => {
    const today = new Date();
    const todayIncidents = incidentData.filter(incident => today === new Date(incident.date));
    return (
      <CountUp
        end={todayIncidents.length}
        className="IncidentCount"
        duration={5}
        delay={3}
      />
    );
  };

  return (
    <div className="TimelineSummary">
      <div className="TotalCount">
        {getTotalIncidentCount()}
        <div>
          police brutality incidents since May 25th, 2020
        </div>
      </div>
      <div className="WeekCount">
        {getWeekIncidentCount()}
        <div>
          police brutality incidents in the past week
        </div>
      </div>
      <div className="TodayCount">
        {getTodayIncidentCount()}
        <div>
          police brutality incidents today
        </div>
      </div>
    </div>
  );
};

export default TimelineSummary;