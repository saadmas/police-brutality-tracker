import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import RefreshIcon from '@material-ui/icons/Refresh';

import NavBar from './Components/NavBar/NavBar';
import TimelinePage from './Pages/TimelinePage/TimelinePage';
import DonationsPage from './Pages/DonationsPage/DonationsPage';
import AboutPage from './Pages/AboutPage/AboutPage';

import './App.scss';

const App = () => {
  const [incidentData, setIncidentData] = React.useState([]);
  const [isDataFetchError, setIsDataFetchError] = React.useState(false);

  React.useEffect(() => {
    getIncidentData();
  }, []);

  const getIncidentData = async () => {
    const dataUrl = 'https://raw.githubusercontent.com/2020PB/police-brutality/data_build/all-locations.json';
    try {
      let data = await fetch(dataUrl);
      data = await data.json();
      const incidents = data.data;
      const georgeFloydIncident = getGeorgeFloydIncident();
      setIncidentData([georgeFloydIncident, ...incidents]);
    } catch (error) {
      setIsDataFetchError(true);
    }
  };

  const getGeorgeFloydIncident = () => ({
    city: 'Minneapolis',
    date: '2020-05-25',
    date_text: 'May 25th',
    links: [
      'https://www.nytimes.com/2020/05/31/us/george-floyd-investigation.html',
      'https://www.cnn.com/2020/06/01/us/george-floyd-three-videos-minneapolis/index.html',
      'https://www.cnbc.com/2020/06/03/3-more-cops-charged-in-george-floyd-death-other-officers-murder-charge-upgraded.html',
      'https://www.youtube.com/watch?v=vksEJR9EPQ8'
    ],
    name: 'Police officer kills George Floyd by kneeling on his neck for 8 minutes and 46 seconds',
    state: 'Minnesota',
    id: 'george-floyd'
  });

  const openIncidentReportingForm = () => {
    const incidentReportForm =
      window.open('https://docs.google.com/forms/u/1/d/e/1FAIpQLSd33kN_1HqXCc6SSiL2-b1_IkMouM-rIyCbLsQrGpFN4amcAA/viewform', '_blank');

    if (incidentReportForm) {
      incidentReportForm.focus();
    } else {
      alert('Please allow popups for to open indicent reporting form');
    }

    return <Redirect to="/" />;
  };

  const getRoutes = () => {
    if (incidentData && incidentData.length) {
      return (
        <Switch>
          <Route
            exact
            path={["/timeline/:incidentId?", "/"]}
            render={(props) => <TimelinePage incidentData={incidentData} {...props} />}
          />
          <Route
            exact
            path="/report-incident"
            render={openIncidentReportingForm}
          />
          <Route
            exact
            path="/donate"
            render={(props) => <DonationsPage {...props} />}
          />
          <Route
            exact
            path="/about"
            render={(props) => <AboutPage {...props} />}
          />
          <Route
            render={(props) => <TimelinePage incidentData={incidentData} {...props} />}
          />
        </Switch>
      );
    }
  };

  const getAppContent = () => {
    if (isDataFetchError) {
      return (
        <Paper className="ErrorPaper" elevation={24}>
          <section>
            Uh oh... Error fetching police incidents data. <br />Please refresh the page to try again.
          <RefreshIcon className="RefreshIcon" />
          </section>
        </Paper>
      );
    }
    return getRoutes();
  }

  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      {getAppContent()}
    </div>
  );
};

export default App;
