import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { RoutePath } from '../types';

export const Login: React.FC = () => {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (authType === 'register') {
      if (!fullName.trim()) {
        alert(t.login.alerts.fillFullName);
        return;
      }
      if (password !== confirmPassword) {
        alert(t.login.alerts.passwordMismatch);
        return;
      }

      const { error } = await signUp(email, password, { full_name: fullName });
      if (error) {
        alert(t.login.alerts.registerError + error.message);
      } else {
        alert(t.login.alerts.registerSuccess);
        setAuthType('login');
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        alert(t.login.alerts.loginError + error.message);
      } else {
        navigate(RoutePath.WALLET);
      }
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col p-4 bg-background-dark font-display text-white">
      <header className="flex justify-center pt-12 pb-8">
        <img
          src="/binance-logo.png"
          alt="Coinbase Logo"
          className="h-12 w-auto"
        />
      </header>

      <main className="flex flex-1 flex-col max-w-md mx-auto w-full">
        <h1 className="text-white tracking-light text-[32px] font-bold leading-tight text-left pb-4 pt-4">
          {t.login.welcome}
        </h1>

        <div className="flex py-3">
          <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-white/10 p-1">
            <button
              onClick={() => setAuthType('login')}
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all ${authType === 'login' ? 'bg-primary text-white shadow-sm' : 'text-gray-300'}`}
            >
              {t.login.login}
            </button>
            <button
              onClick={() => setAuthType('register')}
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-all ${authType === 'register' ? 'bg-primary text-white shadow-sm' : 'text-gray-300'}`}
            >
              {t.login.register}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-3">
          {authType === 'register' && (
            <label className="flex flex-col flex-1">
              <p className="text-gray-300 text-base font-medium leading-normal pb-2">{t.login.fullName}</p>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-white/10 h-14 placeholder:text-gray-500 p-4 text-base font-normal leading-normal"
                  placeholder={t.login.fullNamePlaceholder}
                />
              </div>
            </label>
          )}
          <label className="flex flex-col flex-1">
            <p className="text-gray-300 text-base font-medium leading-normal pb-2">{t.login.email}</p>
            <div className="flex w-full flex-1 items-stretch rounded-lg">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-white/10 h-14 placeholder:text-gray-500 p-4 text-base font-normal leading-normal"
                placeholder={t.login.emailPlaceholder}
              />
            </div>
          </label>
          <label className="flex flex-col flex-1">
            <p className="text-gray-300 text-base font-medium leading-normal pb-2">{t.login.password}</p>
            <div className="flex w-full flex-1 items-stretch rounded-lg bg-white/10 focus-within:ring-2 focus-within:ring-primary">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-14 placeholder:text-gray-500 p-4 pr-2 text-base font-normal leading-normal"
                placeholder={t.login.passwordPlaceholder}
                type={showPassword ? "text" : "password"}
              />
              <div className="text-gray-400 flex border-none bg-transparent items-center justify-center pr-4">
                <span
                  className="material-symbols-outlined cursor-pointer select-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </div>
            </div>
          </label>

          {authType === 'register' && (
            <label className="flex flex-col flex-1">
              <p className="text-gray-300 text-base font-medium leading-normal pb-2">{t.login.confirmPassword}</p>
              <div className="flex w-full flex-1 items-stretch rounded-lg bg-white/10 focus-within:ring-2 focus-within:ring-primary">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-14 placeholder:text-gray-500 p-4 pr-2 text-base font-normal leading-normal"
                  placeholder={t.login.confirmPasswordPlaceholder}
                  type={showConfirmPassword ? "text" : "password"}
                />
                <div className="text-gray-400 flex border-none bg-transparent items-center justify-center pr-4">
                  <span
                    className="material-symbols-outlined cursor-pointer select-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </div>
              </div>
            </label>
          )}
        </div>

        <p
          onClick={() => navigate(RoutePath.FORGOT_PASSWORD)}
          className="text-primary text-sm font-normal leading-normal pb-3 pt-1 text-left underline cursor-pointer"
        >
          {t.login.forgotPassword}
        </p>

        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center rounded-lg bg-primary p-4 my-4 active:bg-blue-600 transition-colors"
        >
          <span className="text-center text-base font-bold leading-normal text-white">{authType === 'login' ? t.login.login : t.login.register}</span>
        </button>

        <div className="flex items-center gap-4 py-6">
          <hr className="flex-1 border-t border-white/20" />
          <p className="text-sm font-medium text-gray-400">{t.login.or}</p>
          <hr className="flex-1 border-t border-white/20" />
        </div>

        <div className="flex flex-col gap-4">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 p-4 hover:bg-white/10 transition-all duration-200 group">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-center text-base font-medium leading-normal text-white group-hover:text-white/90">{t.login.continueGoogle}</span>
          </button>
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 p-4 hover:bg-white/10 transition-all duration-200 group">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.072 2.322C14.167 1.025 16.035.158 17.514 0c.133 1.611-.53 3.33-1.577 4.542-1.127 1.259-3.033 2.053-4.411 2.086-.2-1.644.477-3.21 1.546-4.306zM17.848 18.06c-1.285 1.936-2.65 3.86-4.735 3.906-2.053.047-2.733-1.233-5.084-1.233-2.385 0-3.148 1.28-5.118 1.28-2.037.046-4.41-3.953-6.033-8.877-2.604-7.93 2.503-12.793 6.94-12.84 1.954.047 3.313 1.327 4.258 1.327.915 0 2.651-1.234 4.51-1.14 1.578.08 6.002.583 8.355 4.095-.218.127-4.8 2.87-4.752 8.448.024 4.706 4.142 6.364 4.166 6.377a11.517 11.517 0 0 1-2.507 4.659z" />
            </svg>
            <span className="text-center text-base font-medium leading-normal text-white group-hover:text-white/90">{t.login.continueApple}</span>
          </button>
        </div>
      </main>
    </div>
  );
};