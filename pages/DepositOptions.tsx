import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';

export const DepositOptions: React.FC = () => {
  const navigate = useNavigate();

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
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-white">Opções de Depósito</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col px-4 pt-4">
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
      </main>

      {/* Footer Help Link */}
      <div className="mt-auto pb-8 pt-6">
        <p className="text-center text-sm font-normal leading-normal text-zinc-400 underline cursor-pointer hover:text-white">Precisa de ajuda?</p>
      </div>
    </div>
  );
};
