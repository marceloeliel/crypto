import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { RoutePath } from '../types';

export const Convert: React.FC = () => {
    const navigate = useNavigate();
    const { balanceBRL, withdraw, deposit, coins, refreshPrices, setCryptoBalance } = useUser();

    // Default: USDT -> BRL (swap = false), BRL -> USDT (swap = true)
    const [swap, setSwap] = useState(false);
    const [amountFrom, setAmountFrom] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Get USDT Data
    const usdtData = coins.find(c => c.id === 'tether');
    const usdtUserBalance = usdtData?.userBalance || 0;
    const usdtPriceBrl = usdtData?.currentPrice || 5.00;

    // Derived values based on direction
    const sourceSymbol = swap ? 'BRL' : 'USDT';
    const targetSymbol = swap ? 'USDT' : 'BRL';
    const sourceBalance = swap ? balanceBRL : usdtUserBalance;
    const priceDisplay = swap ? (1 / usdtPriceBrl) : usdtPriceBrl;

    useEffect(() => {
        refreshPrices();
    }, []);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Allow digits and one decimal separator (dot or comma)
        if (!/^\d*[.,]?\d*$/.test(value)) return;
        setAmountFrom(value);
    };

    const getEstimatedAmount = () => {
        const val = Number(amountFrom.replace(',', '.'));
        if (isNaN(val)) return 0;
        return swap ? (val / usdtPriceBrl) : (val * usdtPriceBrl);
    };

    const handleSwap = () => {
        setSwap(!swap);
        setAmountFrom('');
    };

    const handleConvert = async () => {
        const val = Number(amountFrom.replace(',', '.'));
        if (val <= 0) return;
        if (val > sourceBalance) {
            alert(`Saldo insuficiente em ${sourceSymbol}.`);
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (swap) {
            // BRL -> USDT
            const withdrawSuccess = await withdraw('brl', val, 'Conversão para USDT');
            if (withdrawSuccess) {
                const usdtReceived = val / usdtPriceBrl;
                await setCryptoBalance('tether', usdtUserBalance + usdtReceived);
                navigate(RoutePath.TRANSACTIONS);
            } else {
                alert("Erro ao realizar conversão (Saque BRL falhou).");
            }
        } else {
            // USDT -> BRL
            const withdrawSuccess = await withdraw('tether', val, `Conversão para BRL`);
            if (withdrawSuccess) {
                const brlAmount = val * usdtPriceBrl;
                deposit(brlAmount);
                navigate(RoutePath.TRANSACTIONS);
            } else {
                alert("Erro ao realizar conversão (Saque USDT falhou).");
            }
        }

        setIsLoading(false);
    };

    return (
        <div className="bg-background-dark font-display min-h-screen text-white flex flex-col">
            <header className="sticky top-0 z-10 flex items-center bg-background-dark/80 px-4 py-3 backdrop-blur-sm border-b border-white/5">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 shrink-0 items-center justify-center text-white rounded-full hover:bg-white/10"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold">Converter</h1>
                <div className="size-10 shrink-0"></div>
            </header>

            <main className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full flex flex-col justify-center">

                {/* From Card */}
                <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 relative z-0">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400 text-sm font-medium">De</span>
                        <span className="text-zinc-500 text-xs">Saldo: {swap ? `R$ ${sourceBalance.toFixed(2)}` : `${sourceBalance.toFixed(2)} USDT`}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/5 shrink-0">
                            {swap ? (
                                <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-[10px] font-bold">R$</div>
                            ) : (
                                <img src={usdtData?.image} alt="USDT" className="w-6 h-6 rounded-full" />
                            )}
                            <span className="font-bold">{sourceSymbol}</span>
                        </div>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={amountFrom}
                            onChange={handleAmountChange}
                            placeholder="0,00"
                            className="flex-1 bg-transparent text-right text-2xl font-bold text-white placeholder-zinc-600 focus:outline-none z-20 relative min-w-0"
                        />
                    </div>
                </div>

                {/* Swap Button (Arrow) */}
                <div className="flex justify-center -my-3 z-10 relative">
                    <button
                        onClick={handleSwap}
                        className="bg-zinc-800 p-2 rounded-full border border-zinc-700 shadow-xl hover:bg-zinc-700 transition-colors active:scale-95 flex flex-col items-center justify-center gap-0"
                    >
                        <span className="material-symbols-outlined text-primary text-sm leading-none">arrow_upward</span>
                        <span className="material-symbols-outlined text-primary text-sm leading-none">arrow_downward</span>
                    </button>
                </div>

                {/* To Card */}
                <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400 text-sm font-medium">Para</span>
                        <span className="text-zinc-500 text-xs">Saldo: {!swap ? `R$ ${balanceBRL.toFixed(2)}` : `${usdtUserBalance.toFixed(2)} USDT`}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                            {!swap ? (
                                <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-[10px] font-bold">R$</div>
                            ) : (
                                <img src={usdtData?.image} alt="USDT" className="w-6 h-6 rounded-full" />
                            )}
                            <span className="font-bold">{targetSymbol}</span>
                        </div>
                        <div className="flex-1 text-right text-2xl font-bold text-white/50">
                            {getEstimatedAmount().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </div>
                    </div>
                </div>

                {/* Rates Info */}
                <div className="flex justify-between items-center px-2 text-xs text-zinc-500">
                    <span>Taxa</span>
                    <span>1 USDT ≈ {usdtPriceBrl.toFixed(2)} BRL</span>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleConvert}
                    disabled={Number(amountFrom) <= 0 || isLoading || Number(amountFrom) > sourceBalance}
                    className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-primary/20"
                >
                    {isLoading ? 'Convertendo...' : 'Confirmar Conversão'}
                </button>

            </main>
        </div>
    );
};
