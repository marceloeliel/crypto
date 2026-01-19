import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { RoutePath } from '../types';

export const PixTransfer: React.FC = () => {
    const navigate = useNavigate();
    const { balanceBRL, withdraw } = useUser();

    const [amount, setAmount] = useState<string>('');
    const [pixKey, setPixKey] = useState<string>('');
    const [beneficiary, setBeneficiary] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        const numberValue = Number(value) / 100;
        setAmount(numberValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
    };

    const getRawAmount = () => {
        return Number(amount.replace(/\./g, "").replace(",", "."));
    };

    const handleSendPix = async () => {
        if (!pixKey || getRawAmount() <= 0) return;

        setIsLoading(true);

        // Simulating processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        const success = await withdraw('brl', getRawAmount(), `PIX: ${pixKey} - ${beneficiary || 'Beneficiário'}`);

        if (success) {
            // Find the transaction we just created to show receipt? 
            // Or just go to transactions list. 
            // Ideally we'd get the ID back from withdraw, but for now navigate to list is safer.
            navigate(RoutePath.TRANSACTIONS);
        } else {
            alert("Saldo insuficiente ou erro na transação.");
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
                <h1 className="flex-1 text-center text-lg font-bold">Área Pix</h1>
                <div className="size-10 shrink-0"></div>
            </header>

            <main className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full">

                {/* Balance Card */}
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <p className="text-zinc-400 text-sm">Saldo Disponível</p>
                    <p className="text-2xl font-bold text-white">R$ {balanceBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Chave Pix</label>
                        <input
                            type="text"
                            value={pixKey}
                            onChange={(e) => setPixKey(e.target.value)}
                            placeholder="CPF, E-mail, Telefone ou Chave Aleatória"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Nome do Beneficiário (Opcional)</label>
                        <input
                            type="text"
                            value={beneficiary}
                            onChange={(e) => setBeneficiary(e.target.value)}
                            placeholder="Nome de quem vai receber"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Valor da Transferência</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">R$</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0,00"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 pl-12 text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleSendPix}
                    disabled={!pixKey || getRawAmount() <= 0 || isLoading || getRawAmount() > balanceBRL}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <span>Enviar Pix</span>
                            <span className="material-symbols-outlined">send</span>
                        </>
                    )}
                </button>

            </main>
        </div>
    );
};
