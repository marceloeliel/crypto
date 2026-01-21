import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { RoutePath } from '../types';

export const DepositFiat: React.FC = () => {
  const navigate = useNavigate();
  const { deposit } = useUser();
  const { t } = useLanguage();
  const BRAZIL_BANKS = [
    { code: '001', name: 'Banco do Brasil' },
    { code: '237', name: 'Bradesco' },
    { code: '341', name: 'Itaú Unibanco' },
    { code: '033', name: 'Santander' },
    { code: '104', name: 'Caixa Econômica Federal' },
    { code: '260', name: 'Nubank' },
    { code: '077', name: 'Banco Inter' },
    { code: '212', name: 'Banco Original' },
    { code: '655', name: 'Banco Neon' },
    { code: '290', name: 'PagBank' },
    { code: '336', name: 'C6 Bank' },
    { code: '403', name: 'Cora' },
  ];

  const [inputValue, setInputValue] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [agency, setAgency] = useState('');
  const [account, setAccount] = useState('');

  const handleDeposit = () => {
    // Basic clean up of currency string to number
    const cleanValue = inputValue.replace(/\./g, '').replace(',', '.');
    const amount = parseFloat(cleanValue);

    if (!isNaN(amount) && amount > 0) {
      let details = 'Depósito via PIX/TED';
      if (selectedBank) {
        const bankName = BRAZIL_BANKS.find(b => b.code === selectedBank)?.name || selectedBank;
        details = `Depósito de: ${bankName}`;
        if (agency) details += ` | Ag: ${agency}`;
        if (account) details += ` | CC: ${account}`;
      }

      deposit(amount, details);
      navigate(RoutePath.WALLET);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

          {/* Source Bank Info (Optional) */}
          <section className="rounded-lg bg-background-card p-4 border border-white/5">
            <h2 className="mb-4 text-base font-bold text-text-primary">Seus Dados Bancários (Opcional)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Selecione seu Banco</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="">Selecione...</option>
                  {BRAZIL_BANKS.map(bank => (
                    <option key={bank.code} value={bank.code}>{bank.code} - {bank.name}</option>
                  ))}
                </select>
              </div>

              {selectedBank && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Agência</label>
                    <input
                      type="text"
                      value={agency}
                      onChange={(e) => setAgency(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                      placeholder="0000"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Conta</label>
                    <input
                      type="text"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                      placeholder="00000-0"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Destination Warning Card Removed as per user request */}

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