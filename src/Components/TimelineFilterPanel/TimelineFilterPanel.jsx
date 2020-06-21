import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import './TimelineFilterPanel.scss';

const TimelineFilterPanel = ({ setSearchValue, dateSort, setDateSort }) => {

  const onSearchChange = (e) => {
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
      return <ArrowUpwardIcon className="DateSortIcon" />;
    }
    return <ArrowDownwardIcon className="DateSortIcon" />;
  };

  return (
    <div className="TimelineFilterPanel">
      <div>
        <TextField
          placeholder="Search"
          variant="outlined"
          onChange={onSearchChange}
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
        <Button variant="contained" onClick={onDateSortClick}>
          Sort By Date
          {getDateSortIcon()}
        </Button>
      </div>
    </div>
  );
};

export default TimelineFilterPanel;