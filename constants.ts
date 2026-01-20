import { CoinMetadata } from './types';

// Initial Holdings (Quantidade de moedas que o usuário tem, não o valor em R$)
export const INITIAL_HOLDINGS: Record<string, number> = {
  'ethereum': 0,
  'tether': 0,
  'solana': 0,
  'dogecoin': 0,
  'cardano': 0
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

// Redes simuladas para a tela de saque (Simula as opções de grandes exchanges)
export const COIN_NETWORKS: Record<string, string[]> = {
  'bitcoin': [
    'Bitcoin (BTC)',
    'BNB Smart Chain (BEP20)',
    'Lightning Network',
    'Bitcoin (SegWit)'
  ],
  'ethereum': [
    'Ethereum (ERC20)',
    'BNB Smart Chain (BEP20)',
    'Arbitrum One',
    'Optimism',
    'Base',
    'Polygon (MATIC)',
    'zkSync Era',
    'Linea'
  ],
  'tether': [
    'Tron (TRC20)',
    'BNB Smart Chain (BEP20)',
    'Ethereum (ERC20)',
    'Solana',
    'Polygon (MATIC)',
    'Avalanche C-Chain',
    'Arbitrum One',
    'Optimism',
    'EOS',
    'NEAR Protocol',
    'Tezos'
  ],
  'solana': [
    'Solana',
    'BNB Smart Chain (BEP20)'
  ],
  'dogecoin': [
    'Dogecoin',
    'BNB Smart Chain (BEP20)',
    'KCC'
  ],
  'cardano': [
    'Cardano',
    'BNB Smart Chain (BEP20)'
  ]
};