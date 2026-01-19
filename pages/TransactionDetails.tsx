import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { RoutePath } from '../types';

export const TransactionDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useLanguage();
    const { transactions } = useUser();

    const transaction = transactions.find(tx => tx.id === id);

    if (!transaction) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white font-display">
                <div className="text-center space-y-4">
                    <span className="material-symbols-outlined text-6xl text-zinc-700">receipt_long</span>
                    <p className="text-zinc-400">Transação não encontrada.</p>
                    <button onClick={() => navigate(RoutePath.TRANSACTIONS)} className="text-primary font-bold hover:underline">Voltar</button>
                </div>
            </div>
        );
    }

    const isDeposit = transaction.type === 'deposit';
    const isSuccess = transaction.status === 'completed';

    // Helper to extract bank details if available in string format
    // Format saved: "Depósito de: [Bank] | Ag: [Agency] | CC: [Account]"
    const parseBankDetails = (detailsStr?: string) => {
        if (!detailsStr) return null;

        // Check if it matches our specific format
        const depositMatch = detailsStr.match(/Depósito de: (.*?) \| Ag: (.*?) \| CC: (.*)/);

        if (depositMatch) {
            return {
                bankName: depositMatch[1],
                agency: depositMatch[2],
                account: depositMatch[3],
                accountType: 'Conta Corrente', // Default since we don't capture this yet
                document: 'CNPJ do Banco' // Placeholder or we could remove this field if invalid
            };
        }

        return null;
    };

    const bankDetails = isDeposit ? parseBankDetails(transaction.details) : null;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    return (
        <div className="bg-black font-display min-h-screen text-white flex flex-col items-center">
            {/* Header */}
            <header className="w-full flex items-center px-4 py-4 max-w-md">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center text-white rounded-full hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold tracking-tight">Comprovante</h1>
                <div className="size-10"></div>
            </header>

            <main className="w-full max-w-md p-4 space-y-4 pb-12">
                {/* Main Receipt Card */}
                <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-2xl relative overflow-hidden">
                    {/* Top Decorative Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${isDeposit ? 'bg-green-500' : 'bg-red-500'}`}></div>

                    <div className="flex flex-col gap-1 mb-8">
                        <span className="text-zinc-400 text-sm font-medium">Valor do {isDeposit ? 'Depósito' : 'Saque'}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-zinc-400 text-lg font-bold">R$</span>
                            <span className="text-4xl font-bold tracking-tighter text-white">
                                {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        {isDeposit && <p className="text-xs text-zinc-500 mt-1">Limites: Mínimo R$10,00 / Máximo R$50.000,00</p>}
                    </div>

                    <div className="w-full h-px bg-zinc-800 mb-6 dashed-border"></div>

                    {/* Transaction Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`size-10 rounded-full flex items-center justify-center ${isSuccess ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                <span className="material-symbols-outlined">
                                    {isSuccess ? 'check_circle' : 'pending'}
                                </span>
                            </div>
                            <div>
                                <p className="font-bold text-white">{isSuccess ? 'Transação Concluída' : 'Processando'}</p>
                                <p className="text-xs text-zinc-400">{transaction.date}</p>
                            </div>
                        </div>

                        {bankDetails ? (
                            <>
                                <h3 className="text-sm font-bold text-white mb-4">Dados da Conta</h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-zinc-400 font-medium">Banco</p>
                                        <p className="text-sm text-white font-medium">{bankDetails.bankName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-zinc-400 font-medium">Agência</p>
                                            <p className="text-sm text-white font-medium">{bankDetails.agency}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-400 font-medium">Conta</p>
                                            <p className="text-sm text-white font-medium">{bankDetails.account}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-400 font-medium">Tipo de Conta</p>
                                        <p className="text-sm text-white font-medium">{bankDetails.accountType}</p>
                                    </div>

                                    <div className="pt-2">
                                        <p className="text-xs text-zinc-400 font-medium mb-1">CNPJ (Chave PIX)</p>
                                        <div className="flex items-center justify-between bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                                            <span className="text-sm text-white font-mono">{bankDetails.document}</span>
                                            <button
                                                onClick={() => copyToClipboard(bankDetails.document)}
                                                className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-sm">content_copy</span>
                                                <span className="text-xs font-bold">Copiar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <h3 className="text-sm font-bold text-white mb-3">Detalhes</h3>
                                <p className="text-zinc-300 bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50 text-sm leading-relaxed">
                                    {transaction.details || 'Sem detalhes adicionais.'}
                                </p>
                            </div>
                        )}

                        {/* Info / Warnings Card */}
                        {isDeposit && (
                            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                                <p className="text-blue-400 text-sm font-medium mb-2">Transferência Exata</p>
                                <p className="text-blue-300/80 text-xs leading-relaxed">
                                    Transfira o valor exato. Deposite apenas de uma conta bancária de sua titularidade (CPF cadastrado).
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Warnings */}
                <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 space-y-3">
                    <h3 className="font-bold text-white text-sm">Avisos Importantes</h3>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-500 text-lg mt-0.5">schedule</span>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            Prazo de processamento: PIX (instantâneo), TED (até 2 horas úteis).
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-500 text-lg mt-0.5">attach_money</span>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            Taxa de depósito: R$ 0,00.
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-red-500 text-lg mt-0.5">block</span>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                            Não deposite de contas de terceiros ou de pessoa jurídica.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};
