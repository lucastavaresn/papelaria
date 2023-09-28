import React from 'react';
import './App.css';
import {GeneralLayout} from './Layouts/GeneralLayout';
import theme from './themes/theme';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';


function App() {
  return (
      <ThemeProvider theme={theme}>
        <GeneralLayout title='Paginas'>
         <Outlet/>
        </GeneralLayout>
      </ThemeProvider>
  );
}

export default App;
