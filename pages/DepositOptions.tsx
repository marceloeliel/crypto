import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';
import { useUser } from '../context/UserContext';

export const DepositOptions: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'fiat' | 'crypto'>('fiat');
  const { coins } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-dark font-display text-white">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/80 p-4 pb-3 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-white">Depositar</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-zinc-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('fiat')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'fiat' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
          >
            Dinheiro
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'crypto' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
          >
            Cripto
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col px-4">
        {activeTab === 'fiat' ? (
          <>
            {/* PIX Option with Recommended Tag */}
            <div
              onClick={() => navigate(RoutePath.DEPOSIT_FIAT)}
              className="relative mb-3 flex cursor-pointer flex-col items-center gap-4 rounded-xl bg-background-card p-4 transition-transform duration-200 active:scale-[0.98] border border-white/5 hover:border-primary/50"
            >
              <div className="flex w-full items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-2xl">photos</span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-base font-medium leading-normal text-white">Transferência Bancária (PIX)</p>
                  <p className="text-sm font-normal leading-normal text-zinc-400">Depósito instantâneo via PIX. Sem taxas.</p>
                </div>
                <div className="shrink-0">
                  <div className="flex size-7 items-center justify-center text-zinc-500">
                    <span className="material-symbols-outlined text-2xl">chevron_right</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 left-4 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white shadow-md">
                Recomendado
              </div>
            </div>

            {/* TED Option */}
            <div className="mb-3 flex cursor-pointer items-center gap-4 rounded-xl bg-background-card p-4 transition-transform duration-200 active:scale-[0.98] border border-white/5 hover:bg-white/5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-zinc-700 text-zinc-300">
                <span className="material-symbols-outlined text-2xl">account_balance</span>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-base font-medium leading-normal text-white">Transferência Bancária (TED)</p>
                <p className="text-sm font-normal leading-normal text-zinc-400">Disponível em horário comercial.</p>
              </div>
              <div className="shrink-0">
                <div className="flex size-7 items-center justify-center text-zinc-500">
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </div>
              </div>
            </div>

            {/* Card Option */}
            <div className="mb-3 flex cursor-pointer items-center gap-4 rounded-xl bg-background-card p-4 transition-transform duration-200 active:scale-[0.98] border border-white/5 hover:bg-white/5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-zinc-700 text-zinc-300">
                <span className="material-symbols-outlined text-2xl">credit_card</span>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-base font-medium leading-normal text-white">Comprar com Cartão</p>
                <p className="text-sm font-normal leading-normal text-zinc-400">Use seu cartão de crédito ou débito.</p>
              </div>
              <div className="shrink-0">
                <div className="flex size-7 items-center justify-center text-zinc-500">
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/50">search</span>
              <input
                className="w-full rounded-lg border-none bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                placeholder="Pesquisar moeda"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-zinc-400 font-bold ml-1">Lista de Criptomoedas</p>
              {filteredCoins.map((coin) => (
                <div key={coin.id} className="flex items-center gap-4 p-3 bg-background-card rounded-xl border border-white/5 hover:bg-white/5 active:scale-[0.99] transition-all cursor-pointer">
                  <div className="text-white flex items-center justify-center rounded-full bg-zinc-800 shrink-0 size-10 border border-white/10 overflow-hidden">
                    {coin.image ? (
                      <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" />
                    ) : coin.isIconText ? (
                      <p className="font-bold text-primary text-xl">{coin.icon}</p>
                    ) : (
                      <span className="material-symbols-outlined text-primary text-2xl">{coin.icon}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">{coin.name}</p>
                    <p className="text-sm text-zinc-400">{coin.symbol}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="material-symbols-outlined text-zinc-500">chevron_right</span>
                  </div>
                </div>
              ))}
              {filteredCoins.length === 0 && (
                <p className="text-center text-zinc-500 py-8">Nenhuma moeda encontrada.</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer Help Link */}
      <div className="mt-auto pb-8 pt-6">
        <p className="text-center text-sm font-normal leading-normal text-zinc-400 underline cursor-pointer hover:text-white">Precisa de ajuda?</p>
      </div>
    </div>
  );
};
