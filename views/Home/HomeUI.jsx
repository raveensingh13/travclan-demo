import * as React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@material-ui/data-grid';
import Switch from '@material-ui/core/Switch';


export default function HomeUI({
  maxBid,
  showBid,
  bidData,
  rowData,
  handleChange,
  handleRowClick,
}) {

  console.log(rowData);
  const columns = [
    {
      headerName: 'Customer Name',
      field: 'firstname',
      width: 200,
      renderCell: (value) => {
        return <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20, textTransform: 'capitalize' }}>
          <div><img src={value.row.avatarUrl} alt={value.row.avatarUrl} width="40px" height="40px" /></div>
          <div>{`${value.row.firstname}`}</div>
          <div>{value.row.lastname}</div>
        </div>
      }
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 150,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      width: 150,
    },
    {
      headerName: 'Premium',
      field: 'hasPremium',
      width: 150,
    },
    {
      headerName: 'Max/Min Bid',
      field: 'bid',
      width: 200,
    },
  ];

  const bidsColumns = [
    {
      headerName: 'Car title',
      field: 'carTitle',
      width: 200,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      width: 200,
    },
  ]

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2>TRAVCLAN DEMO</h2>
      </div>
      {!showBid ? (
        <>
          <div style={{ textAlign: 'right', width: '90%' }}>
            Showing Max Bids: <Switch checked={maxBid} onChange={handleChange} />
            <div style={{ fontSize: '12px', color: 'red' }}>Switch it off to show records with Min bids</div>
          </div>
          <div style={{ height: 400, width: '80%', margin: '0 auto' }}>
            <DataGrid
              pageSize={6}
              columns={columns}
              rows={rowData}
              sortModel={[
                {
                  field: 'bid',
                },
              ]}
              onRowClick={handleRowClick}
            />
          </div>
        </>
      )
        : <>
          <div style={{ height: 400, width: '30%', margin: '0 auto' }}>
            <DataGrid
              pageSize={6}
              columns={bidsColumns}
              rows={bidData || []}
            />
          </div>
        </>}
    </>
  );
}

HomeUI.defaultProps = {
  bidData: []
};

HomeUI.propTypes = {
  maxBid: PropTypes.bool.isRequired,
  showBid: PropTypes.bool.isRequired,
  bidData: PropTypes.array,
  rowData: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRowClick: PropTypes.func.isRequired,
};
