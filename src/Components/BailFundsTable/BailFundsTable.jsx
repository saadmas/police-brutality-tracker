import React from 'react'
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { bailFunds } from './bailFunds';

import './BailFundsTable.scss';

const BailFundsTable = () => {

  const getColumns = () => {
    const columns = [
      {
        name: 'name',
        label: 'Name',
      },
      {
        name: 'city',
        label: 'City'
      },
      {
        name: 'state',
        label: 'State'
      },
      {
        name: 'url',
        label: 'url',
        options: {
          display: 'false'
        }
      },
    ];
    return columns;
  };

  const onRowClick = (rowData) => {
    const url = rowData[3];
    const fundPage = window.open(url, '_blank');

    if (fundPage) {
      fundPage.focus();
    } else {
      alert('Please allow popups for to open fund page');
    }
  };

  const options = {
    selectableRows: 'none',
    rowsPerPage: 100,
    responsive: 'scrollFullHeight',
    viewColumns: false,
    filter: false,
    onRowClick
  };

  const getMuiTheme = () => createMuiTheme({
    overrides: {
      'MUIDataTableBodyCell': {
        root: {
          backgroundColor: 'black',
          color: 'white'
        }
      },
      'MuiToolbar': {
        root: {
          backgroundColor: 'black',
          color: 'white'
        }
      },
      'MuiSvgIcon': {
        root: {
          color: 'white'
        }
      },
      'MuiTableCell': {
        footer: {
          backgroundColor: 'black'
        }
      },
      'MUIDataTableHeadCell': {
        'sortActive': {
          color: 'white'
        }
      },
      'MuiTableSortLabel': {
        'icon': {
          color: 'white !important'
        }
      }
    }
  });

  return (
    <div className="BailFundsTable">
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          data={bailFunds}
          columns={getColumns()}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default BailFundsTable;