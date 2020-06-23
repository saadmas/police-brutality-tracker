import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDebounce } from 'use-debounce';

import { usStates } from './usaLocations';

import './TimelineFilterPanel.scss';

const TimelineFilterPanel = ({ searchValue, setSearchValue, dateSort, setDateSort, incidentData, updateLocation }) => {
  const [cityValue, setCityValue] = React.useState('');
  const [stateValue, setStateValue] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const [debouncedSearchInput] = useDebounce(searchInput, 275);

  React.useEffect(() => {
    setSearchValue(debouncedSearchInput);
  }, [debouncedSearchInput]);

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
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
    setStateValue(state);
    setCityValue('');
    updateLocation({ location: state, type: 'state' });
  };

  const onCityFilterChange = (e, city) => {
    setCityValue(city);
    setStateValue('');
    updateLocation({ location: city, type: 'city' });
  };

  const getCities = () => {
    const cities = incidentData.map(incident => incident.city);
    const uniqueCities = Array.from(new Set(cities));
    uniqueCities.sort((a, b) => a.localeCompare(b));
    return uniqueCities;
  };

  const clearSearch = () => {
    setSearchInput('');
  };

  const getCloseIcon = () => {
    return !!searchInput ? (
      <InputAdornment position="start">
        <ClearIcon onClick={clearSearch} className="CloseIcon" />
      </InputAdornment>
    ) : null;
  };

  return (
    <div className="TimelineFilterPanel">
      <div>
        <TextField
          placeholder="Search"
          variant="outlined"
          onChange={onSearchChange}
          value={searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: getCloseIcon()
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
          value={stateValue}
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
          value={cityValue}
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