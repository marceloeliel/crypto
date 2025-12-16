export interface CoinMetadata {
  id: string; // ID for API (e.g., 'bitcoin')
  symbol: string;
  name: string;
  icon?: string;
  isIconText?: boolean;
}

export interface CoinData extends CoinMetadata {
  currentPrice: number;
  currentPriceUsd: number; // New: Price in USD
  change24h: number;
  userBalance: number; // Amount of coins user owns
}

export interface UserContextType {
  balanceBRL: number;
  balanceGBP: number;
  gbpToBrlRate: number;
  coins: CoinData[];
  isLoading: boolean;
  userAvatar: string;
  userName: string;
  updateUserAvatar: (newUrl: string) => void;
  uploadAvatar: (file: File) => Promise<void>;
  setCryptoBalance: (coinId: string, amount: number) => Promise<void>;
  deposit: (amount: number) => void;
  withdraw: (coinId: string, amount: number) => Promise<boolean>;
  refreshPrices: () => Promise<void>;
  totalPortfolioValueBRL: number;
  totalPortfolioValueBTC: number;
  totalPortfolioValueUSD: number;
}

export enum RoutePath {
  LOGIN = "/",
  MARKET = "/market",
  WALLET = "/wallet",
  DEPOSIT_OPTIONS = "/deposit-options",
  DEPOSIT_FIAT = "/deposit-fiat",
  WITHDRAW = "/withdraw",
  PROFILE = "/profile"
}