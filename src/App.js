import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './Components/NavBar/NavBar';
import TimelinePage from './Pages/TimelinePage/TimelinePage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

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
    state: 'Minnesota'
  });

  const getRoutes = () => {
    if (incidentData && incidentData.length) {
      return (
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <TimelinePage incidentData={incidentData} {...props} />}
          />
          <Route component={ErrorPage} />
        </Switch>
      );
    }
  };

  const getAppContent = () => {
    if (isDataFetchError) {
      return <h2>Uh oh... Error fetching police incidents data. <br />Please refresh the page to try again.</h2>
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
