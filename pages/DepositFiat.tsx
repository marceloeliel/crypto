import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { RoutePath } from '../types';

export const DepositFiat: React.FC = () => {
  const navigate = useNavigate();
  const { deposit } = useUser();
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState('1.000,00');

  const handleDeposit = () => {
    // Basic clean up of currency string to number
    const cleanValue = inputValue.replace(/\./g, '').replace(',', '.');
    const amount = parseFloat(cleanValue);

    if (!isNaN(amount) && amount > 0) {
      deposit(amount);
      navigate(RoutePath.WALLET);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simple mask for BRL currency would go here, 
    // for now we just allow typing
    setInputValue(e.target.value);
  }

  return (
    <div className="bg-background-dark font-display min-h-screen text-white flex flex-col">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Top App Bar */}
        <header className="sticky top-0 z-10 flex items-center bg-background-dark/80 px-4 py-3 backdrop-blur-sm border-b border-white/5">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 shrink-0 items-center justify-center text-white rounded-full hover:bg-white/10"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold">{t.depositFiat.title}</h1>
          <div className="size-10 shrink-0"></div>
        </header>

        <main className="flex-1 space-y-4 p-4">
          {/* Amount Card */}
          <section className="rounded-lg bg-background-card p-4 border border-white/5">
            <h2 className="text-base font-bold text-text-primary">{t.depositFiat.amountTitle}</h2>
            <div className="relative mt-3">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-2xl font-bold text-text-secondary">R$</span>
              <input
                className="w-full border-0 bg-transparent py-2 pl-10 pr-16 text-left text-4xl font-bold text-text-primary ring-0 placeholder:text-text-secondary/50 focus:ring-0 focus:outline-none"
                placeholder="0,00"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 font-bold text-text-secondary">BRL</span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">{t.depositFiat.limits}</p>
          </section>

          {/* Transfer Data Card */}
          <section className="rounded-lg bg-background-card p-4 border border-white/5">
            <h2 className="mb-4 text-base font-bold text-text-primary">{t.depositFiat.transferData}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-text-secondary">{t.depositFiat.bank}</span>
                  <span className="font-medium text-white">123 - Banco Fictício S.A.</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-text-secondary">{t.depositFiat.agency}</span>
                  <span className="font-medium text-white">0001</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-text-secondary">{t.depositFiat.account}</span>
                  <span className="font-medium text-white">123456-7</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-text-secondary">{t.depositFiat.accountType}</span>
                  <span className="font-medium text-white">Conta Corrente</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-text-secondary">{t.depositFiat.pixKey}</span>
                  <span className="font-medium text-white">12.345.678/0001-99</span>
                </div>
                <button className="flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-bold text-primary hover:bg-primary/30 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>content_copy</span>
                  <span>{t.depositFiat.copy}</span>
                </button>
              </div>
            </div>
            <div className="mt-4 rounded-md border border-primary/50 bg-primary/10 p-3">
              <p className="text-sm font-medium text-primary">{t.depositFiat.transferWarning}</p>
            </div>
          </section>

          {/* Important Notices Card */}
          <section className="rounded-lg bg-background-card p-4 border border-white/5 mb-16">
            <h2 className="mb-3 text-base font-bold text-text-primary">{t.depositFiat.notices}</h2>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-primary" style={{ fontSize: '18px' }}>schedule</span>
                <span>{t.depositFiat.processingTime}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-primary" style={{ fontSize: '18px' }}>request_quote</span>
                <span>{t.depositFiat.fee}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-primary" style={{ fontSize: '18px' }}>block</span>
                <span>{t.depositFiat.thirdPartyWarning}</span>
              </li>
            </ul>
          </section>
        </main>

        {/* Action Button */}
        <footer className="sticky bottom-0 bg-background-dark/90 p-4 backdrop-blur-sm border-t border-white/5">
          <button
            onClick={handleDeposit}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white text-base font-bold leading-normal active:bg-blue-600 transition-colors"
          >
            <span className="truncate">{t.depositFiat.button}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};