import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { RoutePath } from '../types';

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const { resetPassword } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (!email.trim()) {
            alert(t.login.alerts?.fillEmail || 'Por favor, preencha o email');
            return;
        }

        const { error } = await resetPassword(email);
        if (error) {
            alert('Erro ao enviar email: ' + error.message);
        } else {
            setEmailSent(true);
        }
    };

    if (emailSent) {
        return (
            <div className="relative flex h-auto min-h-screen w-full flex-col p-4 bg-background-dark font-display text-white">
                <header className="flex justify-center pt-12 pb-8">
                    <img
                        src="binance-logo.png"
                        alt="Coinbase Logo"
                        className="h-12 w-auto"
                    />
                </header>

                <main className="flex flex-1 flex-col max-w-md mx-auto w-full">
                    <div className="flex flex-col items-center justify-center py-12">
                        <span className="material-symbols-outlined text-primary text-6xl mb-4">
                            mark_email_read
                        </span>
                        <h1 className="text-white text-2xl font-bold mb-4 text-center">
                            Email Enviado!
                        </h1>
                        <p className="text-gray-300 text-center mb-8">
                            Enviamos um link de recuperação para <strong>{email}</strong>.
                            Verifique sua caixa de entrada e spam.
                        </p>
                        <button
                            onClick={() => navigate(RoutePath.LOGIN)}
                            className="flex w-full items-center justify-center rounded-lg bg-primary p-4 active:bg-blue-600 transition-colors"
                        >
                            <span className="text-center text-base font-bold leading-normal text-white">
                                Voltar para Login
                            </span>
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col p-4 bg-background-dark font-display text-white">
            <header className="flex justify-center pt-12 pb-8">
                <img
                    src="binance-logo.png"
                    alt="Coinbase Logo"
                    className="h-12 w-auto"
                />
            </header>

            <main className="flex flex-1 flex-col max-w-md mx-auto w-full">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight text-left pb-4 pt-4">
                    Esqueci minha senha
                </h1>

                <p className="text-gray-300 text-base leading-normal pb-6">
                    Digite seu email e enviaremos um link para redefinir sua senha.
                </p>

                <div className="flex flex-col gap-4 py-3">
                    <label className="flex flex-col flex-1">
                        <p className="text-gray-300 text-base font-medium leading-normal pb-2">
                            {t.login.email}
                        </p>
                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-white/10 h-14 placeholder:text-gray-500 p-4 text-base font-normal leading-normal"
                                placeholder={t.login.emailPlaceholder}
                                type="email"
                            />
                        </div>
                    </label>
                </div>

                <button
                    onClick={handleResetPassword}
                    className="flex w-full items-center justify-center rounded-lg bg-primary p-4 my-4 active:bg-blue-600 transition-colors"
                >
                    <span className="text-center text-base font-bold leading-normal text-white">
                        Enviar Link de Recuperação
                    </span>
                </button>

                <button
                    onClick={() => navigate(RoutePath.LOGIN)}
                    className="text-primary text-sm font-normal leading-normal text-center underline cursor-pointer"
                >
                    Voltar para Login
                </button>
            </main>
        </div>
    );
};
