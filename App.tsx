import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Login } from './pages/Login';
import { Market } from './pages/Market';
import { Wallet } from './pages/Wallet';
import { DepositOptions } from './pages/DepositOptions';
import { DepositFiat } from './pages/DepositFiat';
import { Withdraw } from './pages/Withdraw';
import { Profile } from './pages/Profile';
import { RoutePath } from './types';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <UserProvider>
          <HashRouter>
            <Routes>
              <Route path={RoutePath.LOGIN} element={<Login />} />
              <Route path={RoutePath.MARKET} element={<Market />} />
              <Route path={RoutePath.WALLET} element={<Wallet />} />
              <Route path={RoutePath.DEPOSIT_OPTIONS} element={<DepositOptions />} />
              <Route path={RoutePath.DEPOSIT_FIAT} element={<DepositFiat />} />
              <Route path={RoutePath.WITHDRAW} element={<Withdraw />} />
              <Route path={RoutePath.PROFILE} element={<Profile />} />
            </Routes>
          </HashRouter>
        </UserProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;