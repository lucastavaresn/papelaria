import React from 'react';
import './App.css';
import {GeneralLayout} from './Layouts/GeneralLayout';
import theme from './themes/theme';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';


function App() {
  return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
        <GeneralLayout title='Paginas'>
         <Outlet/>
        </GeneralLayout>
        </Provider>
      </ThemeProvider>
  );
}

export default App;
