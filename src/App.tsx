import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import ManageSaleInvoice from './pages/ManageSaleInvoice';
import ManagePurchaseInvoice from './pages/ManagePurchaseInvoice';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ManageSaleInvoice />} />
        <Route path="sell" element={<ManageSaleInvoice />} />
        <Route path="buy" element={<ManagePurchaseInvoice />} />
      </Routes>
    </>
  );
}

export default App;
