import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import './TimelineFilterPanel.scss';

const TimelineFilterPanel = ({ setSearchValue }) => {

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="TimelineFilterPanel">
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
  );
};

export default TimelineFilterPanel;