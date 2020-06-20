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
      console.log(data.data); ///
      setIncidentData(data.data);
    } catch (error) {
      setIsDataFetchError(true);
    }
  };

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
