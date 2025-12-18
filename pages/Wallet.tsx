import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { BottomNav } from '../components/BottomNav';
import { RoutePath } from '../types';

export const Wallet: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showManageAssets, setShowManageAssets] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  const [assetAmount, setAssetAmount] = useState<string>('');
  const [mainCurrency, setMainCurrency] = useState<'BRL' | 'USD'>('BRL');
  const { balanceBRL, balanceGBP, gbpToBrlRate, coins, totalPortfolioValueBRL, totalPortfolioValueBTC, totalPortfolioValueUSD, isLoading, userAvatar, userName, setCryptoBalance } = useUser();
  const { t, setLanguage, language } = useLanguage();
  const navigate = useNavigate();

  const formatMoney = (value: number, currency: 'BRL' | 'USD') => {
    return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: currency
    }).format(value);
  };

  const formatCrypto = (amount: number, symbol: string) => {
    return `${amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${symbol}`;
  };

  const toggleMainCurrency = () => {
    setMainCurrency(prev => prev === 'BRL' ? 'USD' : 'BRL');
  };

  const handleManageAssets = () => {
    setShowManageAssets(true);
  };

  const handleSaveAsset = async () => {
    if (selectedCoin && assetAmount) {
      let amountStr = assetAmount;

      // Sanitization based on locale
      if (language === 'pt' || language === 'es') {
        // PT/ES: Format 1.234,56 -> remove dots, replace comma with dot -> 1234.56
        // Remove all dots (thousands separators)
        amountStr = amountStr.replace(/\./g, '');
        // Replace comma with dot (decimal separator)
        amountStr = amountStr.replace(',', '.');
      } else {
        // EN: Format 1,234.56 -> remove commas -> 1234.56
        amountStr = amountStr.replace(/,/g, '');
      }

      const amount = parseFloat(amountStr);

      if (!isNaN(amount)) {
        await setCryptoBalance(selectedCoin, amount);
        setAssetAmount('');
        // Optional: Keep modal open or close it
        // setShowManageAssets(false); 
      }
    }
  };

  // Define qual valor mostrar em destaque e qual mostrar secundário
  const primaryValue = mainCurrency === 'BRL' ? totalPortfolioValueBRL : totalPortfolioValueUSD;
  const secondaryValue = mainCurrency === 'BRL' ? totalPortfolioValueUSD : totalPortfolioValueBRL;
  const secondaryCurrency = mainCurrency === 'BRL' ? 'USD' : 'BRL';

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark font-display text-white pb-24 overflow-x-hidden">
      {/* Top App Bar with User Info */}
      <div className="flex items-center px-4 py-3 justify-between sticky top-0 z-20 bg-background-dark/95 backdrop-blur-sm border-b border-white/5">

        {/* User Profile (Left) */}
        <div
          onClick={() => navigate(RoutePath.PROFILE)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={userAvatar}
              className="w-9 h-9 rounded-full border border-zinc-700 group-hover:border-primary transition-colors object-cover"
              alt="User Avatar"
            />
            <div className="absolute -bottom-1 -right-1 bg-background-dark rounded-full p-[1px]">
              <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-white leading-none group-hover:text-primary transition-colors">{userName}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[10px] text-text-gold">diamond</span>
              <span className="text-[10px] text-zinc-400 font-medium">VIP Borrower</span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
          </button>
          <button className="text-zinc-400 hover:text-white transition-colors relative">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-background-dark"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>

            {/* Language Settings Dropdown */}
            {showSettings && (
              <div className="absolute right-0 top-10 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl w-48 z-50 overflow-hidden">
                <div className="p-3 border-b border-zinc-700">
                  <p className="text-white font-bold text-sm">{t.wallet.language}</p>
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => { setLanguage('pt'); setShowSettings(false); }}
                    className={`px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${language === 'pt' ? 'text-primary' : 'text-zinc-300'}`}
                  >
                    Português (Brasil)
                    {language === 'pt' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setShowSettings(false); }}
                    className={`px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${language === 'en' ? 'text-primary' : 'text-zinc-300'}`}
                  >
                    English (US)
                    {language === 'en' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('es'); setShowSettings(false); }}
                    className={`px-4 py-3 text-left text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${language === 'es' ? 'text-primary' : 'text-zinc-300'}`}
                  >
                    Español
                    {language === 'es' && <span className="material-symbols-outlined text-sm">check</span>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-2">
        {/* Balance Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/5 relative overflow-hidden transition-all hover:bg-white/10 mt-2">
          {isLoading && <div className="absolute top-0 right-0 p-2"><div className="w-2 h-2 bg-primary rounded-full animate-ping"></div></div>}

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-text-gold text-sm font-normal leading-normal">{t.wallet.title}</h2>
              <button
                onClick={toggleMainCurrency}
                className="flex items-center gap-1 bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded-md text-xs font-bold text-text-gold transition-colors border border-white/5"
              >
                {mainCurrency}
                <span className="material-symbols-outlined text-[14px]">swap_vert</span>
              </button>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {showBalance ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>

          <p className="text-white text-4xl font-bold leading-tight tracking-tighter pt-1 break-words">
            {showBalance ? formatMoney(primaryValue, mainCurrency) : '********'}
          </p>

          <div className="flex flex-col gap-1 pt-2">
            <p className="text-white/80 text-base font-medium leading-normal">
              ≈ {showBalance ? `${totalPortfolioValueBTC.toFixed(8)} BTC` : '****'}
            </p>
            <p className="text-white/60 text-sm font-normal leading-normal">
              ≈ {showBalance ? formatMoney(secondaryValue, secondaryCurrency) : '****'}
            </p>
          </div>
        </div>

        {/* Action Button Group */}
        <div className="flex justify-stretch gap-3 py-6">
          <button
            onClick={() => navigate(RoutePath.DEPOSIT_OPTIONS)}
            className="flex flex-1 flex-col items-center justify-center gap-2 text-white/90 group"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary group-active:scale-95 transition-all">
              <span className="material-symbols-outlined text-white font-bold">south_west</span>
            </div>
            <span className="text-sm font-semibold text-white">{t.wallet.deposit}</span>
          </button>

          <button
            onClick={() => navigate(RoutePath.WITHDRAW)}
            className="flex flex-1 flex-col items-center justify-center gap-2 text-white/90 group"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-primary group-active:scale-95 transition-all">
              <span className="material-symbols-outlined text-white font-bold">north_east</span>
            </div>
            <span className="text-sm font-semibold text-white">{t.wallet.withdraw}</span>
          </button>

          <button className="flex flex-1 flex-col items-center justify-center gap-2 text-white/90 group">
            <div className="flex size-12 items-center justify-center rounded-full bg-white/10 group-active:scale-95 transition-all">
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <span className="text-sm font-semibold text-white">{t.wallet.history}</span>
          </button>
        </div>

        {/* Assets Section */}
        <div>
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-white tracking-light text-xl font-bold leading-tight">{t.wallet.assets}</h3>
            <button
              onClick={handleManageAssets}
              className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-bold"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              {t.wallet.manageAssets}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/50">search</span>
            <input
              className="w-full rounded-lg border-none bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              placeholder={t.wallet.searchPlaceholder}
              type="text"
            />
          </div>

          {/* Asset Categories */}
          <div className="flex flex-col gap-3">
            {/* Cryptocurrencies Section */}
            {(() => {
              const cryptoCoins = coins.filter(c => c.userBalance > 0 && c.symbol !== 'USDT');
              const cryptoTotal = cryptoCoins.reduce((acc, coin) =>
                acc + (mainCurrency === 'BRL' ? (coin.userBalance * coin.currentPrice) : (coin.userBalance * coin.currentPriceUsd)), 0
              );
              const cryptoChange = cryptoCoins.reduce((acc, coin) => acc + coin.change24h, 0) / (cryptoCoins.length || 1);

              return (
                <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                  {/* Category Header */}
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">currency_bitcoin</span>
                      <div>
                        <p className="text-white font-bold text-base">Criptomoedas</p>
                        <p className="text-sm text-white/60">
                          {formatMoney(cryptoTotal, mainCurrency)}
                          <span className={`ml-2 ${cryptoChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            ({cryptoChange >= 0 ? '+' : ''}{cryptoChange.toFixed(2)}%) hoje
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-white/60">chevron_right</span>
                  </div>

                  {/* Crypto Assets List */}
                  <div className="border-t border-white/5">
                    {cryptoCoins.map((coin) => (
                      <div key={coin.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-b-0">
                        <div className="text-white flex items-center justify-center rounded-full bg-zinc-800 shrink-0 size-8 border border-white/10 overflow-hidden">
                          {coin.image ? (
                            <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" />
                          ) : coin.isIconText ? (
                            <p className="font-bold text-primary text-lg">{coin.icon}</p>
                          ) : (
                            <span className="material-symbols-outlined text-primary text-xl">{coin.icon}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white">{coin.name}</p>
                          <p className="text-sm text-white/60">{coin.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">
                            {formatMoney(mainCurrency === 'BRL' ? (coin.userBalance * coin.currentPrice) : (coin.userBalance * coin.currentPriceUsd), mainCurrency)}
                          </p>
                          <p className="text-sm text-white/60">{formatCrypto(coin.userBalance, coin.symbol)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Fiat and Stablecoins Section */}
            {(() => {
              const stableCoins = coins.filter(c => c.userBalance > 0 && c.symbol === 'USDT');
              const fiatAndStableTotal = balanceBRL + stableCoins.reduce((acc, coin) =>
                acc + (mainCurrency === 'BRL' ? (coin.userBalance * coin.currentPrice) : (coin.userBalance * coin.currentPriceUsd)), 0
              );

              return (
                <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                  {/* Category Header */}
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src="bank-icon.png" alt="Bank" className="w-8 h-8 object-contain" />
                      <div>
                        <p className="text-white font-bold text-base">Dinheiro e stablecoins</p>
                        <p className="text-sm text-white/60">{formatMoney(fiatAndStableTotal, mainCurrency)}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-white/60">chevron_right</span>
                  </div>

                  {/* Fiat and Stable Assets List */}
                  <div className="border-t border-white/5">
                    {/* BRL Balance */}
                    <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                      <div className="text-white flex items-center justify-center rounded-full bg-zinc-800 shrink-0 size-8 border border-white/10 overflow-hidden">
                        <img src="brl.png" alt="BRL" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">{t.wallet.fiatName}</p>
                        <p className="text-sm text-white/60">BRL</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{formatMoney(balanceBRL, 'BRL')}</p>
                      </div>
                    </div>

                    {/* GBP Balance */}
                    <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                      <div className="text-white flex items-center justify-center rounded-full bg-zinc-800 shrink-0 size-8 border border-white/10 overflow-hidden">
                        <img src="gbp.png" alt="GBP" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">Libra esterlina</p>
                        <p className="text-sm text-white/60">1 GBP = {formatMoney(gbpToBrlRate, 'BRL')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{formatMoney(balanceGBP * gbpToBrlRate, 'BRL')}</p>
                        <p className="text-sm text-white/60">{balanceGBP.toFixed(2)} GBP</p>
                      </div>
                    </div>

                    {/* Stablecoins */}
                    {stableCoins.map((coin) => (
                      <div key={coin.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-b-0">
                        <div className="text-white flex items-center justify-center rounded-full bg-zinc-800 shrink-0 size-8 border border-white/10 overflow-hidden">
                          {coin.image ? (
                            <img src={coin.image} alt={coin.name} className="w-full h-full object-cover" />
                          ) : coin.isIconText ? (
                            <p className="font-bold text-primary text-lg">{coin.icon}</p>
                          ) : (
                            <span className="material-symbols-outlined text-primary text-xl">{coin.icon}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-white">{coin.name}</p>
                            <span className="text-xs bg-green-500/20 text-green-400 px-1 rounded">{t.wallet.stable}</span>
                          </div>
                          <p className="text-sm text-white/60">{coin.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">
                            {formatMoney(mainCurrency === 'BRL' ? (coin.userBalance * coin.currentPrice) : (coin.userBalance * coin.currentPriceUsd), mainCurrency)}
                          </p>
                          <p className="text-sm text-white/60">{formatCrypto(coin.userBalance, coin.symbol)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Manage Assets Slide-over / Modal */}
      {showManageAssets && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-zinc-900 h-full p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">{t.wallet.manageAssets}</h2>
              <button
                onClick={() => setShowManageAssets(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Asset Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-400 mb-2">{t.wallet.addAsset}</label>
                <select
                  value={selectedCoin}
                  onChange={(e) => {
                    setSelectedCoin(e.target.value);
                    const coin = coins.find(c => c.id === e.target.value);
                    setAssetAmount(coin?.userBalance.toString() || '');
                  }}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                >
                  <option value="">Selecione uma moeda</option>
                  {coins.map(coin => (
                    <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol})</option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              {selectedCoin && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">{t.wallet.quantity} ({coins.find(c => c.id === selectedCoin)?.symbol})</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={assetAmount}
                    onChange={(e) => setAssetAmount(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                    placeholder="0.00"
                  />
                  <p className="text-xs text-zinc-500 mt-2">Saldo atual: {coins.find(c => c.id === selectedCoin)?.userBalance}</p>
                </div>
              )}

              {/* Existing Assets List (Quick Edit) */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-primary">Seus Ativos Atuais</h3>
                <div className="space-y-3">
                  {coins.filter(c => c.userBalance > 0).map(coin => (
                    <div key={coin.id} className="flex items-center justify-between bg-zinc-800/50 p-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                        {coin.isIconText ? (
                          <span className="font-bold text-primary text-lg w-6 text-center">{coin.icon}</span>
                        ) : (
                          <span className="material-symbols-outlined text-primary text-xl">{coin.icon}</span>
                        )}
                        <span className="font-bold text-white">{coin.symbol}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCoin(coin.id);
                          setAssetAmount(coin.userBalance.toString());
                        }}
                        className="text-primary text-sm font-bold hover:underline"
                      >
                        Editar ({coin.userBalance})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-800">
              <button
                onClick={handleSaveAsset}
                disabled={!selectedCoin || !assetAmount}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.wallet.save}
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};