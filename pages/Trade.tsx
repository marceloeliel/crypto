import React, { useState } from 'react';
import { BottomNav } from '../components/BottomNav';
import { useLanguage } from '../context/LanguageContext';

export const Trade: React.FC = () => {
    const { t } = useLanguage();
    const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark font-display text-white pb-24 overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-background-dark/95 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white/60">menu</span>
                    <h1 className="text-lg font-bold">BTC/USDT</h1>
                    <span className="text-xs bg-white/10 px-1 rounded text-green-500">+2.45%</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-white/60">candlestick_chart</span>
                    <span className="material-symbols-outlined text-white/60">more_horiz</span>
                </div>
            </div>

            <div className="flex flex-1">
                {/* Left Side: Order Form */}
                <div className="w-7/12 p-4 border-r border-white/5">
                    <div className="flex bg-zinc-800/50 rounded-lg p-1 mb-4">
                        <button
                            onClick={() => setOrderType('buy')}
                            className={`flex-1 py-1.5 rounded text-sm font-bold transition-colors ${orderType === 'buy' ? 'bg-green-600 text-white' : 'text-zinc-400'
                                }`}
                        >
                            Comprar
                        </button>
                        <button
                            onClick={() => setOrderType('sell')}
                            className={`flex-1 py-1.5 rounded text-sm font-bold transition-colors ${orderType === 'sell' ? 'bg-red-600 text-white' : 'text-zinc-400'
                                }`}
                        >
                            Vender
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-zinc-500 mb-1 block">Limit Order</label>
                            <div className="bg-zinc-800 rounded-lg flex items-center px-3 py-2 border border-zinc-700">
                                <input type="text" value="45,230.50" className="bg-transparent w-full text-white font-mono focus:outline-none" readOnly />
                                <span className="text-xs text-zinc-500">USDT</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-zinc-500 mb-1 block">Quantidade</label>
                            <div className="bg-zinc-800 rounded-lg flex items-center px-3 py-2 border border-zinc-700">
                                <input type="text" placeholder="Amount" className="bg-transparent w-full text-white font-mono focus:outline-none" />
                                <span className="text-xs text-zinc-500">BTC</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                <span>Disponível</span>
                                <span>0.00 USDT</span>
                            </div>
                            <button
                                className={`w-full py-3 rounded-lg font-bold text-white shadow-lg ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'
                                    }`}
                            >
                                {orderType === 'buy' ? 'Comprar BTC' : 'Vender BTC'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Order Book (Placeholder) */}
                <div className="w-5/12 p-2 text-xs">
                    <div className="flex justify-between text-zinc-500 mb-2 px-1">
                        <span>Preço</span>
                        <span>Quant.</span>
                    </div>
                    {/* Sells */}
                    <div className="space-y-1 mb-2">
                        {[45300, 45290, 45280, 45270, 45260].map((price, i) => (
                            <div key={i} className="flex justify-between text-red-500">
                                <span>{price}</span>
                                <span className="text-zinc-400">0.{(i + 1) * 34}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-center font-bold text-lg text-white my-2">
                        45,230.50
                        <div className="text-xs text-green-500">~$45,230.50</div>
                    </div>

                    {/* Buys */}
                    <div className="space-y-1">
                        {[45220, 45210, 45200, 45190, 45180].map((price, i) => (
                            <div key={i} className="flex justify-between text-green-500">
                                <span>{price}</span>
                                <span className="text-zinc-400">0.{(i + 1) * 21}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-4 mt-4">
                <h3 className="text-sm font-bold text-white mb-2">Ordens Abertas (0)</h3>
                <div className="text-center py-8 text-zinc-600 text-sm">
                    Nenhuma ordem aberta
                </div>
            </div>

            <BottomNav />
        </div>
    );
};
