import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*
import Loader from './components/Loader';
*/
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import EmailConfirmation from './components/EmailConfirmation';
import MainCrypto from './components/MainCrypto';
/*
import Transactions from './components/Transactions';
import Wallet from './components/Wallet';
*/


function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for each component */}
        <Route path="/" element={<MainCrypto />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<PasswordReset />} /> 
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        {/* 
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/loader" element={<Loader />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
