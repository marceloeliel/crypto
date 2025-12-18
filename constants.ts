import { CoinMetadata } from './types';

// Initial Holdings (Quantidade de moedas que o usuário tem, não o valor em R$)
export const INITIAL_HOLDINGS: Record<string, number> = {
  'ethereum': 1.5,
  'tether': 96000.00, // Saldo inicial atualizado (~R$ 564k)
  'solana': 20,
  'dogecoin': 0,
  'cardano': 500
};

export const SUPPORTED_COINS: CoinMetadata[] = [
  {
    id: 'tether',
    symbol: 'USDT',
    name: 'Tether',
    icon: 'monetization_on',
    image: 'tether.png'
  },
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: 'currency_bitcoin'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'currency_bitcoin'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    icon: 'S',
    isIconText: true
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    icon: 'currency_bitcoin'
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    icon: 'A',
    isIconText: true
  }
];

// Redes simuladas para a tela de saque
export const COIN_NETWORKS: Record<string, string[]> = {
  'bitcoin': ['Bitcoin (BTC)', 'BNB Smart Chain (BEP20)', 'Lightning Network'],
  'ethereum': ['Ethereum (ERC20)', 'Arbitrum One', 'Optimism', 'BNB Smart Chain (BEP20)'],
  'tether': ['Tron (TRC20)', 'Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Solana'],
  'solana': ['Solana', 'BNB Smart Chain (BEP20)'],
  'dogecoin': ['Dogecoin', 'BNB Smart Chain (BEP20)'],
  'cardano': ['Cardano', 'BNB Smart Chain (BEP20)']
};