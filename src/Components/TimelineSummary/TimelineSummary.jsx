import React from 'react';
import CountUp from 'react-countup';
import Paper from '@material-ui/core/Paper';

import { getDateParts } from '../../utils';

import './TimelineSummary.scss';

const TimelineSummary = ({ incidentData }) => {

  const getTotalIncidentCount = () => incidentData.filter(incident => incident.id !== 'george-floyd').length;

  const getWeekIncidentCount = () => {
    const today = new Date();
    const thisWeekIncidents = incidentData.filter(incident => {
      const dateParts = getDateParts(incident.date);
      const incidentDate = new Date(...dateParts);
      const diffTime = Math.abs(today - incidentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    })
    return thisWeekIncidents.length;
  };

  const getTodayIncidentCount = () => {
    const today = new Date();
    const todayIncidents = incidentData
      .filter(incident => today.toDateString() === new Date(...getDateParts(incident.date)).toDateString());
    return todayIncidents.length;
  };

  const getCountUpElement = (numToCountUp) => (
    <CountUp
      end={numToCountUp}
      className="IncidentCount"
      duration={5}
      delay={1}
    />
  );

  const getIncidentText = (count) => {
    let incidentText = 'incidents';

    if (count === 1) {
      incidentText = 'incident';
    }

    return incidentText;
  };

  const totalIncidentCount = getTotalIncidentCount();
  const weekIncidentCount = getWeekIncidentCount();
  const todayIncidentCount = getTodayIncidentCount();

  return (
    <div className="TimelineSummary">
      <Paper className="IncidentCountContainer TotalCount" elevation={24}>
        {getCountUpElement(totalIncidentCount)}
        <div>
          police brutality {getIncidentText(totalIncidentCount)} since George Floyd's death
          <div className="GeorgeFloydIncidentDate">
            (May 25th, 2020)
          </div>
        </div>
      </Paper>
      <Paper className="IncidentCountContainer WeekCount" elevation={24}>
        {getCountUpElement(weekIncidentCount)}
        <div>
          police brutality {getIncidentText(weekIncidentCount)} in the past week
        </div>
      </Paper>
      <Paper className="IncidentCountContainer TodayCount" elevation={24}>
        {getCountUpElement(todayIncidentCount)}
        <div>
          police brutality {getIncidentText(todayIncidentCount)} today
        </div>
      </Paper>
    </div>
  );
};

export default TimelineSummary;