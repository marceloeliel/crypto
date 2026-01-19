import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { BottomNav } from '../components/BottomNav';

export const Transactions: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { transactions } = useUser();

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark font-display text-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/95 p-4 backdrop-blur-sm border-b border-white/5">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 shrink-0 items-center justify-center text-white rounded-full hover:bg-white/10"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold">Transações</h1>
                <div className="size-10 shrink-0"></div>
            </div>

            {/* List */}
            <div className="flex-1 p-4">
                {transactions.length === 0 ? (
                    <div className="text-center text-zinc-400 mt-10">
                        <span className="material-symbols-outlined text-4xl mb-2">history</span>
                        <p>Nenhuma transação encontrada</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {transactions.map((tx) => (
                            <div
                                key={tx.id}
                                onClick={() => navigate(`/transaction/${tx.id}`)}
                                className="bg-zinc-800/40 p-4 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:bg-zinc-800/60"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`size-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        <span className="material-symbols-outlined">
                                            {tx.type === 'deposit' ? 'arrow_downward' : 'arrow_upward'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white uppercase">{tx.type === 'deposit' ? 'Depósito' : 'Saque'}</p>
                                        <p className="text-xs text-zinc-400">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-400' : 'text-white'}`}>
                                        {tx.type === 'deposit' ? '+' : '-'}{tx.amount} {tx.asset}
                                    </p>
                                    <p className="text-xs text-zinc-500 capitalize">{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
};
