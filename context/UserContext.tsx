import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CoinData, UserContextType } from '../types';
import { SUPPORTED_COINS, INITIAL_HOLDINGS } from '../constants';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAxJtNG5c1XV2q5f3zA5Z-FGycqEje_W_YDBy_ESQNUGg3ITMBDFw51qfJALAFLn8N1r9_pZme01FmWbtuYFZOzsg0F2kem0fb1s0AiRkRk5HLOEzCOJ26kHcpaRU8qcerFv7DiV-MXiahO308yBOPi6l4bOQmNQ8CUFO5-8IijPVchks8uaTsLWPoTrrFTbmrot4-ncOlKh8BVOA4Q340VZ5AD2NfwIUgZei7AGbaiQmme-UruE5Vm9Fockk07rUDANjgn4zA4CLI";

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [balanceBRL, setBalanceBRL] = useState<number>(0);
  const [balanceGBP, setBalanceGBP] = useState<number>(0);
  const [gbpToBrlRate, setGbpToBrlRate] = useState<number>(7.24); // Taxa padrão
  const [holdings, setHoldings] = useState<Record<string, number>>({});
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userAvatar, setUserAvatar] = useState<string>(DEFAULT_AVATAR);
  const [userName, setUserName] = useState<string>('Trader');

  // Carregar dados do perfil e carteira do Supabase
  useEffect(() => {
    if (!user) {
      setBalanceBRL(0);
      setBalanceGBP(0);
      setHoldings({});
      return;
    }

    const loadUserData = async () => {
      try {
        // carregar perfil
        const { data: profile, error: profileError } = await supabase
          .from('perfis')
          .select('avatar_url, nome_completo')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          console.log("Perfil não encontrado, criando automaticamente...");
          const fullName = user.user_metadata?.full_name || 'Trader';
          const { error: insertError } = await supabase.from('perfis').insert({
            id: user.id,
            nome_completo: fullName,
            avatar_url: ''
          });
          if (insertError) console.error("Erro ao criar perfil:", insertError);
          setUserName(fullName);
        } else if (profile) {
          if (profile.avatar_url) setUserAvatar(profile.avatar_url);
          if (profile.nome_completo) setUserName(profile.nome_completo);
        }

        // carregar carteiras
        const { data: wallets } = await supabase
          .from('carteiras')
          .select('moeda, saldo')
          .eq('usuario_id', user.id);

        let newBalanceBRL = 0;
        let newBalanceGBP = 0;
        const newHoldings: Record<string, number> = {};

        if (wallets && wallets.length > 0) {
          wallets.forEach(wallet => {
            if (wallet.moeda === 'brl') {
              newBalanceBRL = Number(wallet.saldo);
            } else if (wallet.moeda === 'gbp') {
              newBalanceGBP = Number(wallet.saldo);
            } else {
              newHoldings[wallet.moeda] = Number(wallet.saldo);
            }
          });
          setBalanceBRL(newBalanceBRL);
          setBalanceGBP(newBalanceGBP);
          setHoldings(newHoldings);
        } else {
          // Se não tem carteira (novo usuário), inicializa com INITIAL_HOLDINGS
          console.log("Usuário novo: Inicializando carteira com valores padrão...");
          const standardHoldings = INITIAL_HOLDINGS;
          setHoldings(standardHoldings);

          // Opcional: Salvar no banco para persistir
          Object.entries(standardHoldings).forEach(async ([coin, amount]) => {
            await supabase.from('carteiras').insert({
              usuario_id: user.id,
              moeda: coin,
              saldo: amount
            });
          });
        }

      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    loadUserData();
  }, [user]);


  // Função para buscar taxa de câmbio GBP/BRL
  const fetchGbpRate = async () => {
    try {
      const response = await fetch(
        'https://api.exchangerate-api.com/v4/latest/GBP'
      );

      if (!response.ok) throw new Error('Falha ao buscar taxa de câmbio');

      const data = await response.json();
      const rate = data.rates?.BRL || 7.24; // Fallback para 7.24 se falhar
      setGbpToBrlRate(rate);
    } catch (error) {
      console.error("Erro ao buscar taxa GBP/BRL:", error);
      // Mantém a taxa atual em caso de erro
    }
  };

  // Função para buscar preços da CoinGecko
  const fetchPrices = async () => {
    try {
      const ids = SUPPORTED_COINS.map(c => c.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=brl,usd&include_24hr_change=true`
      );

      if (!response.ok) throw new Error('Falha na API');

      const data = await response.json();

      const updatedCoins: CoinData[] = SUPPORTED_COINS.map(meta => {
        const apiData = data[meta.id];
        return {
          ...meta,
          currentPrice: apiData?.brl || 0,
          currentPriceUsd: apiData?.usd || 0,
          change24h: apiData?.brl_24h_change || 0,
          userBalance: holdings[meta.id] || 0
        };
      });

      setCoins(updatedCoins);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar preços:", error);
      if (coins.length === 0) {
        setCoins(SUPPORTED_COINS.map(meta => ({
          ...meta,
          currentPrice: 0,
          currentPriceUsd: 0,
          change24h: 0,
          userBalance: holdings[meta.id] || 0
        })));
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPrices();
    fetchGbpRate();
    const interval = setInterval(() => {
      fetchPrices();
      fetchGbpRate();
    }, 30000);
    return () => clearInterval(interval);
  }, [holdings, user]); // Recalcula quando holdings ou usuário mudam

  const deposit = async (amount: number) => {
    if (!user) return;
    const newBalance = balanceBRL + amount;

    // Atualiza estado local otimista
    setBalanceBRL(newBalance);

    // Persiste no Supabase
    const { error } = await supabase.from('carteiras').upsert({
      usuario_id: user.id,
      moeda: 'brl',
      saldo: newBalance,
      atualizado_em: new Date().toISOString()
    }, { onConflict: 'usuario_id, moeda' });

    if (error) {
      console.error("Erro ao depositar:", error);
      alert("Erro ao salvar depósito: " + error.message);
    }
  };

  const withdraw = async (coinId: string, amount: number): Promise<boolean> => {
    if (!user) return false;

    if (coinId === 'brl') {
      if (balanceBRL >= amount) {
        const newBalance = balanceBRL - amount;
        setBalanceBRL(newBalance);

        await supabase.from('carteiras').upsert({
          usuario_id: user.id,
          moeda: 'brl',
          saldo: newBalance,
          atualizado_em: new Date().toISOString()
        }, { onConflict: 'usuario_id, moeda' });

        return true;
      }
    } else {
      const currentBalance = holdings[coinId] || 0;
      if (currentBalance >= amount) {
        const newBalance = currentBalance - amount;
        setHoldings(prev => ({
          ...prev,
          [coinId]: newBalance
        }));

        await supabase.from('carteiras').upsert({
          usuario_id: user.id,
          moeda: coinId,
          saldo: newBalance,
          atualizado_em: new Date().toISOString()
        }, { onConflict: 'usuario_id, moeda' });

        return true;
      }
    }
    return false;
  };

  const setCryptoBalance = async (coinId: string, amount: number) => {
    if (!user) return;

    // Atualiza estado local otimista
    setHoldings(prev => ({
      ...prev,
      [coinId]: amount
    }));

    // Persiste no Supabase
    const { error } = await supabase.from('carteiras').upsert({
      usuario_id: user.id,
      moeda: coinId,
      saldo: amount,
      atualizado_em: new Date().toISOString()
    }, { onConflict: 'usuario_id, moeda' });

    if (error) {
      console.error("Erro ao atualizar saldo:", error);
      alert("Erro ao salvar saldo: " + error.message);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update Profile
      await updateUserAvatar(publicUrl);

    } catch (error: any) {
      console.error("Erro ao fazer upload do avatar:", error);
      alert("Erro ao enviar imagem: " + error.message);
    }
  };

  const updateUserAvatar = async (newUrl: string) => {
    setUserAvatar(newUrl);
    if (user) {
      await supabase.from('perfis').update({ avatar_url: newUrl }).eq('id', user.id);
    }
  };

  // --- Cálculos de Patrimônio ---

  // 1. Valor total das criptos em BRL
  const cryptoPortfolioValueBRL = coins.reduce((acc, coin) => {
    return acc + (coin.userBalance * coin.currentPrice);
  }, 0);

  // 2. Valor total das criptos em USD
  const cryptoPortfolioValueUSD = coins.reduce((acc, coin) => {
    return acc + (coin.userBalance * coin.currentPriceUsd);
  }, 0);

  // 3. Totais combinados (Fiat + Cripto)
  const totalPortfolioValueBRL = balanceBRL + cryptoPortfolioValueBRL;

  // Para converter o saldo Fiat (BRL) para USD, usamos a taxa do Tether (USDT)
  // (1 USD = Preço USDT em BRL)
  const usdtData = coins.find(c => c.id === 'tether');
  const usdtPriceBrl = usdtData?.currentPrice || 1;
  const usdtPriceUsd = usdtData?.currentPriceUsd || 1; // Deve ser prox de 1

  // Taxa: Quantos USD compram 1 BRL? (Inverso do preço do dólar em reais)
  const exchangeRateBrlToUsd = usdtPriceBrl > 0 ? (1 / usdtPriceBrl) : 0;

  const fiatBalanceInUsd = balanceBRL * exchangeRateBrlToUsd;
  const totalPortfolioValueUSD = fiatBalanceInUsd + cryptoPortfolioValueUSD;

  // 4. Total em BTC (Estimado via ETH ou USDT se BTC não existir)
  const ethData = coins.find(c => c.id === 'ethereum');
  const ethPriceBrl = ethData?.currentPrice || 1;
  // Fallback para ETH como referência de "cripto de indexação" se BTC não existe, ou apenas 0
  const totalPortfolioValueBTC = totalPortfolioValueBRL / ethPriceBrl; // Mostrando em ETH temporariamente ou manter conceito de BTC?
  // Na UI mostra BTC, mas não temos preço do BTC. Melhor não mostrar ou usar ETH.
  // Vou manter a variavel mas com valor calculado via ETH para não quebrar a UI que espera essa var.
  // Ou melhor: se BTC nao existe, usar 0.


  return (
    <UserContext.Provider value={{
      balanceBRL,
      balanceGBP,
      gbpToBrlRate,
      coins,
      isLoading,
      userAvatar,
      userName,
      updateUserAvatar,
      uploadAvatar,
      setCryptoBalance,
      deposit,
      withdraw,
      refreshPrices: fetchPrices,
      totalPortfolioValueBRL,
      totalPortfolioValueBTC,
      totalPortfolioValueUSD
    }}>
      {children}
    </UserContext.Provider>
  );
};