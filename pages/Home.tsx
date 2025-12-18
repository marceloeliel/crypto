import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { BottomNav } from '../components/BottomNav';
import { RoutePath } from '../types';

export const Home: React.FC = () => {
    const { userName, userAvatar } = useUser();
    const navigate = useNavigate();

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-black font-display text-white pb-24 overflow-x-hidden">

            {/* Header */}
            <div className="flex items-center justify-between p-4 pt-6">
                <button className="text-white">
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
                <button className="text-white">
                    <span className="material-symbols-outlined text-2xl">help</span>
                </button>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center justify-between px-4 mb-8 cursor-pointer" onClick={() => navigate(RoutePath.PROFILE)}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                        {userAvatar ? (
                            <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="material-symbols-outlined text-3xl text-zinc-400 w-full h-full flex items-center justify-center">person</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{userName || 'Soryos Web'}</h1>
                        <p className="text-zinc-500 text-sm">Conta e configurações</p>
                    </div>
                </div>
                <span className="material-symbols-outlined text-zinc-500">chevron_right</span>
            </div>

            {/* Banner */}
            <div className="px-4 mb-8">
                <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-6 relative overflow-hidden">
                    <div className="relative z-10 w-2/3">
                        <h2 className="font-bold text-lg mb-2">Coinbase One</h2>
                        <p className="text-sm text-blue-100 mb-4 font-medium leading-relaxed">
                            Negociação com taxa zero, recompensas turbinadas e muito mais.
                        </p>
                        <button className="bg-white text-black font-bold py-2 px-4 rounded-full text-sm hover:bg-zinc-100 transition-colors">
                            Experimente grátis
                        </button>
                    </div>
                    {/* Decorative Circle/Icon Placeholder */}
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-[12px] border-white/20 flex items-center justify-center">
                        <span className="font-bold text-6xl text-white italic">1</span>
                    </div>
                </div>
            </div>

            {/* NEGOCIAR Section */}
            <div className="px-4 mb-6">
                <h3 className="text-xs font-bold text-zinc-500 mb-4 tracking-wider">NEGOCIAR</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-2xl">tune</span>
                            <span className="font-bold text-base">Advanced</span>
                        </div>
                        <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-2xl">verified_user</span>
                        <span className="font-bold text-base">Coinbase One</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-2xl">token</span>
                        <span className="font-bold text-base">Pré-reservas de tokens</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-2xl">bar_chart</span>
                        <span className="font-bold text-base">Spot</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-2xl">receipt_long</span>
                        <span className="font-bold text-base">Transações</span>
                    </div>
                </div>
            </div>

            {/* GANHE Section */}
            <div className="px-4">
                <h3 className="text-xs font-bold text-zinc-500 mb-4 tracking-wider">GANHE</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-2xl">savings</span>
                            <span className="font-bold text-base">Staking</span>
                        </div>
                        <span className="text-green-500 font-medium text-sm">Ganhe 15,35% a.a.</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-2xl">account_balance</span>
                            <span className="font-bold text-base">Dinheiro</span>
                        </div>
                        <span className="text-green-500 font-medium text-sm">Ganhe 10.00% a.a.</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-2xl">card_giftcard</span>
                        <span className="font-bold text-base">Recompensas</span>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};
