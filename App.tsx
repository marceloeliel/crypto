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
import { Home } from './pages/Home';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Trade } from './pages/Trade';
import { Transactions } from './pages/Transactions';
import { TransactionDetails } from './pages/TransactionDetails';
import { PixTransfer } from './pages/PixTransfer';
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
              <Route path={RoutePath.PROFILE} element={<Profile />} />
              <Route path={RoutePath.FORGOT_PASSWORD} element={<ForgotPassword />} />
              <Route path={RoutePath.RESET_PASSWORD} element={<ResetPassword />} />
              <Route path={RoutePath.TRADE} element={<Trade />} />
              <Route path={RoutePath.TRANSACTIONS} element={<Transactions />} />
              <Route path="/transaction/:id" element={<TransactionDetails />} />
              <Route path={RoutePath.PIX_TRANSFER} element={<PixTransfer />} />
              <Route path={RoutePath.HOME} element={<Home />} />
            </Routes>
          </HashRouter>
        </UserProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;