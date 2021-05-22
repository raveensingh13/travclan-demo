/* eslint-disable react/jsx-filename-extension */
import '../styles/globals.css';
import PropTypes from 'prop-types';
import { useEffect, createContext, useState } from 'react';
import apiRequest from '../apis/apiRequest';

export const ListData = createContext([]);


function MyApp({ Component, pageProps }) {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    apiRequest().then((res) => {
      ListData.data = res.body;
      setRowData(res.body);
    });
  }, []);

  const { View } = Component;
  return (
    <ListData.Provider value={rowData}>
      <View {...pageProps} />
    </ListData.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
