import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SaleList from './pages/SaleList';
import NewSale from './pages/NewSale';
import SellerCommssion from './pages/SellerCommission';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SaleList/>,
      },
      {
        path: "/sale",
        element: <NewSale/>,
      },
      {
        path: "/commissions",
        element: <SellerCommssion/>,
      },
    ]
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
