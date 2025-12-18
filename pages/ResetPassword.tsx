import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { RoutePath } from '../types';

export const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const { updatePassword, session } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have a valid recovery session
        if (session) {
            setIsValidToken(true);
        }
    }, [session]);

    const handleUpdatePassword = async () => {
        if (!newPassword.trim()) {
            alert('Por favor, preencha a nova senha');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert(t.login.alerts.passwordMismatch);
            return;
        }

        if (newPassword.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        const { error } = await updatePassword(newPassword);
        if (error) {
            alert('Erro ao atualizar senha: ' + error.message);
        } else {
            alert('Senha atualizada com sucesso!');
            navigate(RoutePath.WALLET);
        }
    };

    if (!isValidToken) {
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
                        <span className="material-symbols-outlined text-red-500 text-6xl mb-4">
                            error
                        </span>
                        <h1 className="text-white text-2xl font-bold mb-4 text-center">
                            Link Inválido ou Expirado
                        </h1>
                        <p className="text-gray-300 text-center mb-8">
                            O link de recuperação de senha é inválido ou expirou.
                            Por favor, solicite um novo link.
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
                    Redefinir Senha
                </h1>

                <p className="text-gray-300 text-base leading-normal pb-6">
                    Digite sua nova senha abaixo.
                </p>

                <div className="flex flex-col gap-4 py-3">
                    <label className="flex flex-col flex-1">
                        <p className="text-gray-300 text-base font-medium leading-normal pb-2">
                            Nova Senha
                        </p>
                        <div className="flex w-full flex-1 items-stretch rounded-lg bg-white/10 focus-within:ring-2 focus-within:ring-primary">
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-14 placeholder:text-gray-500 p-4 pr-2 text-base font-normal leading-normal"
                                placeholder="Digite sua nova senha"
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

                    <label className="flex flex-col flex-1">
                        <p className="text-gray-300 text-base font-medium leading-normal pb-2">
                            Confirmar Nova Senha
                        </p>
                        <div className="flex w-full flex-1 items-stretch rounded-lg bg-white/10 focus-within:ring-2 focus-within:ring-primary">
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-14 placeholder:text-gray-500 p-4 pr-2 text-base font-normal leading-normal"
                                placeholder="Confirme sua nova senha"
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
                </div>

                <button
                    onClick={handleUpdatePassword}
                    className="flex w-full items-center justify-center rounded-lg bg-primary p-4 my-4 active:bg-blue-600 transition-colors"
                >
                    <span className="text-center text-base font-bold leading-normal text-white">
                        Atualizar Senha
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
