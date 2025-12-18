import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

interface EditBalanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    coinId: string;
    coinName: string;
    currentBalance: number;
    isFiat?: boolean;
}

export const EditBalanceModal: React.FC<EditBalanceModalProps> = ({
    isOpen,
    onClose,
    coinId,
    coinName,
    currentBalance,
    isFiat = false
}) => {
    const [amount, setAmount] = useState<string>('');
    const [action, setAction] = useState<'add' | 'remove'>('add');
    const { setCryptoBalance, deposit, withdraw } = useUser();
    const { t } = useLanguage();

    if (!isOpen) return null;

    const handleSave = async () => {
        const val = parseFloat(amount.replace(',', '.'));
        if (isNaN(val) || val <= 0) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        try {
            if (isFiat) {
                if (action === 'add') {
                    await deposit(val);
                } else {
                    const success = await withdraw('brl', val);
                    if (!success) {
                        alert("Saldo insuficiente para remover.");
                        return;
                    }
                }
            } else {
                let newBalance = currentBalance;
                if (action === 'add') {
                    newBalance += val;
                } else {
                    newBalance -= val;
                    if (newBalance < 0) {
                        alert("Saldo insuficiente para remover.");
                        return;
                    }
                }
                await setCryptoBalance(coinId, newBalance);
            }
            onClose();
            setAmount('');
        } catch (error) {
            console.error("Error updating balance:", error);
            alert("Erro ao atualizar saldo.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {t.wallet.edit} {coinName}
                </h2>

                <div className="flex gap-2 mb-4 bg-zinc-800 p-1 rounded-lg">
                    <button
                        onClick={() => setAction('add')}
                        className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${action === 'add' ? 'bg-green-600 text-white' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        Adicionar
                    </button>
                    <button
                        onClick={() => setAction('remove')}
                        className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${action === 'remove' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        Remover
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-xs text-zinc-400 mb-2 uppercase font-bold">
                        {t.wallet.quantity}
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-primary transition-colors"
                    />
                    <p className="text-xs text-zinc-500 mt-2 text-right">
                        {t.wallet.balance}: {currentBalance} {coinName}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-700 transition-colors"
                    >
                        {t.wallet.cancel}
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                    >
                        {t.wallet.save}
                    </button>
                </div>
            </div>
        </div>
    );
};
