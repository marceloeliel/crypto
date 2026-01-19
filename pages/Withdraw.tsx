import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { RoutePath } from '../types';
import { COIN_NETWORKS } from '../constants';

// Formata número para padrão brasileiro: 1.234.567,89
const formatBRNumber = (value: string): string => {
  if (!value) return '';

  // Remove tudo exceto números e vírgula
  const cleaned = value.replace(/[^\d,]/g, '');

  // Separa parte inteira e decimal
  const parts = cleaned.split(',');
  let integerPart = parts[0];
  const decimalPart = parts[1] || '';

  // Adiciona pontos como separadores de milhares
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Retorna formatado
  return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
};

// Converte formato BR para número (para validação/cálculo)
const parseBRNumber = (value: string): number => {
  if (!value) return 0;
  // Remove pontos e troca vírgula por ponto
  const normalized = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(normalized) || 0;
};

export const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { coins, withdraw, isLoading } = useUser();

  // Get initial coin from navigation state if available
  const initialCoinId = location.state?.coinId || 'tether';

  // States
  const [selectedCoinId, setSelectedCoinId] = useState<string>(initialCoinId);
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Derived data
  const selectedCoin = coins.find(c => c.id === selectedCoinId) || coins[0];
  const networks = COIN_NETWORKS[selectedCoinId] || [];

  // Reset network when coin changes
  useEffect(() => {
    setNetwork('');
    setError(null);
  }, [selectedCoinId]);

  const handleMaxClick = () => {
    const maxValue = selectedCoin?.userBalance.toString() || '0';
    // Formata para padrão BR
    const formatted = formatBRNumber(maxValue.replace('.', ','));
    setAmount(formatted);
  };

  const handleSend = () => {
    setError(null);

    // Validações básicas
    if (!address) {
      setError('Por favor, insira um endereço de carteira.');
      return;
    }
    if (!network) {
      setError('Por favor, selecione uma rede.');
      return;
    }
    const val = parseBRNumber(amount);
    if (isNaN(val) || val <= 0) {
      setError('Digite um valor válido.');
      return;
    }
    if (val > selectedCoin.userBalance) {
      setError('Saldo insuficiente.');
      return;
    }

    // Processar envio
    const isSuccess = withdraw(selectedCoinId, val, address);
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => {
        navigate(RoutePath.TRANSACTIONS);
      }, 2000);
    } else {
      setError('Erro ao processar transação. Tente novamente.');
    }
  };

  if (success) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background-dark font-display text-white p-6">
        <div className="flex size-20 items-center justify-center rounded-full bg-green-500/20 mb-6">
          <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Envio Solicitado!</h2>
        <p className="text-zinc-400 text-center">Sua transação de {amount} {selectedCoin.symbol} está sendo processada.</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark font-display text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/95 p-4 backdrop-blur-sm border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center text-white rounded-full hover:bg-white/10"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold">Enviar Cripto</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      <main className="flex-1 flex flex-col p-4 gap-6">

        {/* Coin Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Moeda</label>
          <div className="relative">
            <select
              value={selectedCoinId}
              onChange={(e) => setSelectedCoinId(e.target.value)}
              className="w-full appearance-none rounded-xl bg-background-card border border-white/10 p-4 pr-10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base"
            >
              {coins.map(coin => (
                <option key={coin.id} value={coin.id}>
                  {coin.symbol} - {coin.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
            {/* Coin Icon Overlay (Visual only, simple implementation) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4">
              {/* Empty space kept by padding in select, we could put icon here if needed */}
            </div>
          </div>
          <div className="text-right text-xs text-zinc-400">
            Saldo Disponível: <span className="text-white font-medium">{selectedCoin?.userBalance} {selectedCoin?.symbol}</span>
          </div>
        </div>

        {/* Address Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Endereço</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={`Cole o endereço ${selectedCoin.symbol}`}
              className="w-full rounded-xl bg-background-card border border-white/10 p-4 pr-12 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <button className="absolute right-3 p-2 text-zinc-400 hover:text-primary">
              <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
            </button>
          </div>
        </div>

        {/* Network Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Rede</label>
          <div className="relative">
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full appearance-none rounded-xl bg-background-card border border-white/10 p-4 pr-10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base"
            >
              <option value="" disabled>Selecione a rede</option>
              {networks.map(net => (
                <option key={net} value={net}>{net}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
            <span className="font-bold text-yellow-500">Atenção:</span> Certifique-se de que a rede selecionada corresponde à rede do endereço de depósito.
          </p>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Valor</label>
          <div className="relative flex items-center">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                // Permite apenas números, vírgula e ponto
                if (val === '' || /^[\d.,]*$/.test(val)) {
                  setAmount(val);
                }
              }}
              placeholder="0,00"
              className="w-full rounded-xl bg-background-card border border-white/10 p-4 pr-20 text-white placeholder-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <span className="text-zinc-500 font-medium text-sm">{selectedCoin.symbol}</span>
              <button
                onClick={handleMaxClick}
                className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded hover:bg-primary/20"
              >
                MAX
              </button>
            </div>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mt-1">
            <span>Taxa de Rede (Est.):</span>
            <span>1.00 {selectedCoin.symbol}</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        {/* Summary Footer */}
        <div className="mt-auto bg-background-card p-4 rounded-t-2xl border-t border-white/5 -m-4">
          <div className="flex justify-between items-end mb-4">
            <span className="text-zinc-400 text-sm">Total a enviar:</span>
            <div className="text-right">
              <span className="text-2xl font-bold block">{amount || '0,00'} {selectedCoin.symbol}</span>
              <span className="text-xs text-zinc-500">Taxa de rede incluída</span>
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-full h-12 bg-primary text-white font-bold rounded-lg text-base active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </main>
    </div>
  );
};