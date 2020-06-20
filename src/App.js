import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './Components/NavBar/NavBar';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
    </div>
  );
};

export default App;
