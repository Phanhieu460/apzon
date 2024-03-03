import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import ManageSaleInvoice from './pages/ManageSaleInvoice';
import ManagePurchaseInvoice from './pages/ManagePurchaseInvoice';
import Login from './components/login/Login';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const location = useLocation()
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="sell" element={<ManageSaleInvoice />} />
          <Route path="buy" element={<ManagePurchaseInvoice />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
