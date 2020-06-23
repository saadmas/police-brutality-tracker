import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { usStates } from './usaLocations';

import './TimelineFilterPanel.scss';

const TimelineFilterPanel = ({ setSearchValue, dateSort, setDateSort, incidentData, updateLocation }) => {
  const [searchInputValue, setSearchInputValue] = React.useState(''); /// really need ???


  const onSearchChange = (e) => {
    setSearchInputValue(e.target.value);
    setSearchValue(e.target.value);
  };

  const onDateSortClick = () => {
    if (dateSort === 'asc') {
      setDateSort('desc');
    } else {
      setDateSort('asc');
    }
  };

  const getDateSortIcon = () => {
    if (dateSort === 'desc') {
      return <ArrowDownwardIcon className="DateSortIcon" />;
    }
    return <ArrowUpwardIcon className="DateSortIcon" />;
  };

  const onStateFilterChange = (e, state) => {
    updateLocation({ location: state, type: 'state' });
  };

  const onCityFilterChange = (e, city) => {
    updateLocation({ location: city, type: 'city' });
  };

  const getCities = () => {
    const cities = incidentData.map(incident => incident.city);
    const uniqueCities = Array.from(new Set(cities));
    uniqueCities.sort((a, b) => a.localeCompare(b));
    return uniqueCities;
  };

  return (
    <div className="TimelineFilterPanel">
      <div>
        <TextField
          placeholder="Search"
          variant="outlined"
          onChange={onSearchChange}
          value={searchInputValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <Autocomplete
          onChange={onStateFilterChange}
          className="LocationSelect"
          options={usStates}
          autoHighlight
          autoComplete
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Filter by state"
            />
          )}
        />
      </div>
      <div>
        <Autocomplete
          onChange={onCityFilterChange}
          className="LocationSelect"
          options={getCities()}
          autoHighlight
          autoComplete
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Filter by city"
            />
          )}
        />
      </div>
      <div>
        <Button
          variant="contained"
          onClick={onDateSortClick}
          className={dateSort === 'desc' ? "DateDesc" : "DateAsc"}
        >
          Sort By Date
          {getDateSortIcon()}
        </Button>
      </div>
    </div>
  );
};

export default TimelineFilterPanel;