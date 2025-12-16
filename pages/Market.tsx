import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { BottomNav } from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';

export const Market: React.FC = () => {
  const { coins, isLoading } = useUser();
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL');
  const navigate = useNavigate();

  const formatMoney = (value: number, curr: 'BRL' | 'USD') => {
    return new Intl.NumberFormat(curr === 'BRL' ? 'pt-BR' : 'en-US', { 
        style: 'currency', 
        currency: curr 
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'BRL' ? 'USD' : 'BRL');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-white pb-24">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-dark z-20">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <button 
            onClick={() => navigate(RoutePath.PROFILE)}
            className="rounded-full p-1 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-3xl text-gray-300">account_circle</span>
          </button>
        </div>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-zinc-100">Mercado</h1>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal min-w-0 p-0">
            <span className="material-symbols-outlined text-2xl text-gray-300">notifications</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-background-dark">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-text-gold flex border-none bg-zinc-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-zinc-800 h-full placeholder:text-text-gold px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" 
              placeholder="Buscar moedas" 
            />
          </div>
        </label>
      </div>

      {/* Tabs */}
      <div className="pb-3 sticky top-[72px] bg-background-dark z-10">
        <div className="flex border-b border-zinc-800 px-4 gap-6">
          <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-[13px] pt-4 cursor-pointer">
            <p className="text-white text-sm font-bold leading-normal">Favoritos</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-text-gold pb-[13px] pt-4 cursor-pointer hover:text-white transition-colors">
            <p className="text-sm font-bold leading-normal">Spot</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-text-gold pb-[13px] pt-4 cursor-pointer hover:text-white transition-colors">
            <p className="text-sm font-bold leading-normal">Futuros</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-text-gold pb-[13px] pt-4 cursor-pointer hover:text-white transition-colors">
            <p className="text-sm font-bold leading-normal">Em Alta</p>
          </a>
        </div>
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between text-xs text-text-gold px-4 pt-4 pb-2 font-medium bg-background-dark">
        <span className="w-1/3">Par</span>
        <div className="w-1/3 flex justify-end">
            <button 
                onClick={toggleCurrency}
                className="flex items-center gap-1 hover:text-white transition-colors rounded bg-white/5 px-2 py-1"
                title="Alternar Moeda"
            >
                Preço ({currency})
                <span className="material-symbols-outlined text-sm">swap_horiz</span>
            </button>
        </div>
        <span className="w-1/3 text-right">24h %</span>
      </div>

      {/* List Items */}
      <div className="flex flex-col gap-1 px-4 bg-background-dark">
        {isLoading ? (
            <div className="flex items-center justify-center py-8 text-zinc-500">
                <span className="material-symbols-outlined animate-spin mr-2">refresh</span> Atualizando mercado...
            </div>
        ) : (
            coins.map((coin) => (
            <div key={coin.id} className="flex items-center gap-4 min-h-[72px] py-2 justify-between border-b border-zinc-800/50 last:border-none cursor-pointer hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors">
                <div className="flex items-center gap-4 w-1/3">
                <div className="text-white flex items-center justify-center rounded-full bg-zinc-800 shrink-0 size-10">
                    {coin.isIconText ? (
                    <p className="font-bold text-primary text-xl">{coin.icon}</p>
                    ) : (
                    <span className="material-symbols-outlined text-primary text-2xl">{coin.icon}</span>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-bold leading-normal">{coin.symbol}</p>
                    <p className="text-text-gold text-sm font-normal leading-normal">{currency}</p>
                </div>
                </div>
                <div className="flex flex-col justify-center w-1/3 text-right">
                <p className="text-white text-base font-medium leading-normal">
                    {formatMoney(currency === 'BRL' ? coin.currentPrice : coin.currentPriceUsd, currency)}
                </p>
                </div>
                <div className="w-1/3 text-right flex justify-end">
                <div className={`inline-flex items-center justify-center rounded-lg h-8 px-4 text-sm font-bold leading-normal w-fit min-w-[84px] ${coin.change24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}>
                    <span>{formatPercent(coin.change24h)}</span>
                </div>
                </div>
            </div>
            ))
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};