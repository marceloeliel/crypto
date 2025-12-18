import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { RoutePath } from '../types';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 flex justify-around items-center px-4 z-50">
      <button
        onClick={() => navigate(RoutePath.WALLET)}
        className={`flex flex-col items-center gap-1 transition-colors ${isActive(RoutePath.WALLET) ? 'text-white' : 'text-white/60 hover:text-white'}`}
      >
        <span className="material-symbols-outlined">home</span>
        <span className="text-xs font-bold">Home</span>
      </button>

      <button
        onClick={() => navigate(RoutePath.MARKET)}
        className={`flex flex-col items-center gap-1 transition-colors ${isActive(RoutePath.MARKET) ? 'text-white' : 'text-white/60 hover:text-white'}`}
      >
        <span className="material-symbols-outlined">bar_chart</span>
        <span className="text-xs font-medium">{t.nav.markets}</span>
      </button>

      <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center -mt-10 shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
        <span className="material-symbols-outlined text-white text-3xl">currency_exchange</span>
      </button>

      <button
        onClick={() => navigate(RoutePath.TRADE)}
        className={`flex flex-col items-center gap-1 transition-colors ${isActive(RoutePath.TRADE) ? 'text-white' : 'text-white/60 hover:text-white'}`}
      >
        <span className="material-symbols-outlined">candlestick_chart</span>
        <span className="text-xs font-medium">{t.nav.trade}</span>
      </button>

      <button
        onClick={() => navigate(RoutePath.WALLET)}
        className={`flex flex-col items-center gap-1 transition-colors ${isActive(RoutePath.WALLET) ? 'text-white' : 'text-white/60 hover:text-white'}`}
      >
        <span className="material-symbols-outlined">account_balance_wallet</span>
        <span className="text-xs font-medium">{t.nav.wallets}</span>
      </button>
    </div>
  );
};
