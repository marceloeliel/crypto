import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { RoutePath } from '../types';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { userAvatar, uploadAvatar, userName } = useUser();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    navigate(RoutePath.LOGIN);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Usar a nova função de upload do contexto
      await uploadAvatar(file);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background-dark text-white font-display overflow-y-auto">
      <div className="p-4">
        {/* Header with Close Button */}
        <header className="flex justify-end mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </header>

        {/* User Info Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <img
              alt="Avatar de usuário"
              className="w-16 h-16 rounded-full border-2 border-primary object-cover group-hover:opacity-80 transition-opacity"
              src={userAvatar}
            />
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-background-dark">
              <span className="material-symbols-outlined text-white text-xs font-bold block">edit</span>
            </div>
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">{userName}</h1>
            <p className="text-sm text-zinc-400 mb-2">se***@gmail.com</p>
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(242,204,13,0.3)] w-fit">
              <span className="material-symbols-outlined text-[16px] text-black">diamond</span>
              <p className="text-xs font-bold text-black uppercase tracking-wider">{t.profile.vip}</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs bg-green-900/40 text-green-400 border border-green-500/30 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            {t.profile.verified}
          </span>
          <span className="text-xs bg-zinc-800 text-zinc-300 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/5">
            <span className="material-symbols-outlined text-[14px]">link</span>
            ID: 8493021
          </span>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">widgets</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.panel}</span>
                <span className="material-symbols-outlined text-zinc-600 text-sm">arrow_forward_ios</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate(RoutePath.WALLET)}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group"
              >
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">account_balance_wallet</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.wallet}</span>
                <span className="material-symbols-outlined text-zinc-600 text-sm">arrow_forward_ios</span>
              </button>
            </li>

            <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">shield</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.security}</span>
                <span className="material-symbols-outlined text-zinc-600 text-sm">arrow_forward_ios</span>
              </button>
            </li>

            <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">receipt_long</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.orders}</span>
                <span className="material-symbols-outlined text-zinc-600 text-sm">arrow_forward_ios</span>
              </button>
            </li>

            <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">group_add</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.referral}</span>
                <div className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-2">NOVO</div>
                <span className="material-symbols-outlined text-zinc-600 text-sm ml-auto">arrow_forward_ios</span>
              </button>
            </li>

            <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">military_tech</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.rewards}</span>
                <span className="material-symbols-outlined text-zinc-600 text-sm">arrow_forward_ios</span>
              </button>
            </li>

            <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">settings</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.settings}</span>
                <span className="material-symbols-outlined text-zinc-600 text-sm">arrow_forward_ios</span>
              </button>
            </li>

            <li>
              <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors active:bg-zinc-800 group">
                <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">help</span>
                <span className="text-base font-medium text-zinc-200 group-hover:text-white flex-1 text-left">{t.profile.help}</span>
                <span className="material-symbols-outlined text-zinc-600 text-sm">arrow_forward_ios</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-500/10 transition-colors active:bg-red-500/20 group text-red-400"
          >
            <span className="material-symbols-outlined group-hover:text-red-500 transition-colors">logout</span>
            <span className="text-base font-medium flex-1 text-left group-hover:text-red-500">{t.profile.logout}</span>
          </button>
        </div>

        <div className="py-6 text-center">
          <p className="text-xs text-zinc-600">{t.profile.version}</p>
        </div>
      </div>
    </div>
  );
};