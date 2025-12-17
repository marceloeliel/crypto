export const translations = {
    pt: {
        wallet: {
            title: "Saldo Total Estimado",
            deposit: "Receber",
            withdraw: "Transferir",
            history: "Histórico",
            assets: "Meus Ativos",
            searchPlaceholder: "Pesquisar ativo",
            fiatName: "Real Brasileiro",
            stable: "Stable",
            settings: "Configurações",
            language: "Idioma",
            cancel: "Cancelar",
            manageAssets: "Gerenciar Ativos",
            addAsset: "Adicionar Ativo",
            save: "Salvar",
            quantity: "Quantidade"
        },
        nav: {
            home: "Início",
            markets: "Mercados",
            trade: "Trade",
            futures: "Futuros",
            wallets: "Carteiras"
        },
        profile: {
            verified: "Verificado",
            vip: "VIP Borrower Program",
            panel: "Painel de Controle",
            wallet: "Carteira",
            security: "Segurança",
            orders: "Ordens",
            referral: "Indicação",
            rewards: "Hub de Recompensas",
            settings: "Configurações",
            help: "Ajuda e Suporte",
            logout: "Sair",
            version: "Versão 1.0.4 - Coinbase"
        },
        login: {
            welcome: "Bem-vindo à Coinbase",
            login: "Entrar",
            register: "Registrar",
            fullName: "Nome Completo",
            fullNamePlaceholder: "Ex: João Silva",
            email: "Email",
            emailPlaceholder: "Ex: joao@email.com",
            password: "Senha",
            passwordPlaceholder: "Sua senha segura",
            confirmPassword: "Confirmar Senha",
            confirmPasswordPlaceholder: "Confirme sua senha",
            forgotPassword: "Esqueceu a senha?",
            or: "ou",
            continueGoogle: "Continuar com Google",
            continueApple: "Continuar com Apple",
            alerts: {
                fillFullName: "Por favor, preencha seu nome completo.",
                passwordMismatch: "As senhas não coincidem.",
                registerError: "Erro ao registrar: ",
                registerSuccess: "Registro realizado com sucesso! Faça login.",
                loginError: "Erro ao fazer login: "
            }
        }
    },
    en: {
        wallet: {
            title: "Estimated Total Balance",
            deposit: "Receive",
            withdraw: "Transfer",
            history: "History",
            assets: "My Assets",
            searchPlaceholder: "Search asset",
            fiatName: "Brazilian Real",
            stable: "Stable",
            settings: "Settings",
            language: "Language",
            cancel: "Cancel",
            manageAssets: "Manage Assets",
            addAsset: "Add Asset",
            save: "Save",
            quantity: "Quantity"
        },
        nav: {
            home: "Home",
            markets: "Markets",
            trade: "Trade",
            futures: "Futures",
            wallets: "Wallets"
        },
        profile: {
            verified: "Verified",
            vip: "VIP Borrower Program",
            panel: "Dashboard",
            wallet: "Wallet",
            security: "Security",
            orders: "Orders",
            referral: "Referral",
            rewards: "Rewards Hub",
            settings: "Settings",
            help: "Help & Support",
            logout: "Log Out",
            version: "Version 1.0.4 - Coinbase"
        },
        login: {
            welcome: "Welcome to Coinbase",
            login: "Log In",
            register: "Register",
            fullName: "Full Name",
            fullNamePlaceholder: "Ex: John Doe",
            email: "Email",
            emailPlaceholder: "Ex: john@email.com",
            password: "Password",
            passwordPlaceholder: "Your secure password",
            confirmPassword: "Confirm Password",
            confirmPasswordPlaceholder: "Confirm your password",
            forgotPassword: "Forgot password?",
            or: "or",
            continueGoogle: "Continue with Google",
            continueApple: "Continue with Apple",
            alerts: {
                fillFullName: "Please fill in your full name.",
                passwordMismatch: "Passwords do not match.",
                registerError: "Error registering: ",
                registerSuccess: "Registration successful! Please log in.",
                loginError: "Error logging in: "
            }
        }
    },
    es: {
        wallet: {
            title: "Saldo Total Estimado",
            deposit: "Recibir",
            withdraw: "Transferir",
            history: "Historial",
            assets: "Mis Activos",
            searchPlaceholder: "Buscar activo",
            fiatName: "Real Brasileño",
            stable: "Estable",
            settings: "Configuración",
            language: "Idioma",
            cancel: "Cancelar",
            manageAssets: "Administrar Activos",
            addAsset: "Agregar Activo",
            save: "Guardar",
            quantity: "Cantidad"
        },
        nav: {
            home: "Inicio",
            markets: "Mercados",
            trade: "Operar",
            futures: "Futuros",
            wallets: "Billeteras"
        },
        profile: {
            verified: "Verificado",
            vip: "Programa VIP Borrower",
            panel: "Panel de Control",
            wallet: "Billetera",
            security: "Seguridad",
            orders: "Órdenes",
            referral: "Referidos",
            rewards: "Centro de Recompensas",
            settings: "Configuración",
            help: "Ayuda y Soporte",
            logout: "Cerrar Sesión",
            version: "Versión 1.0.4 - Coinbase"
        },
        login: {
            welcome: "Bienvenido a Coinbase",
            login: "Iniciar Sesión",
            register: "Registrarse",
            fullName: "Nombre Completo",
            fullNamePlaceholder: "Ej: Juan Pérez",
            email: "Correo Electrónico",
            emailPlaceholder: "Ej: juan@email.com",
            password: "Contraseña",
            passwordPlaceholder: "Tu contraseña segura",
            confirmPassword: "Confirmar Contraseña",
            confirmPasswordPlaceholder: "Confirma tu contraseña",
            forgotPassword: "¿Olvidaste tu contraseña?",
            or: "o",
            continueGoogle: "Continuar con Google",
            continueApple: "Continuar con Apple",
            alerts: {
                fillFullName: "Por favor complete su nombre completo.",
                passwordMismatch: "Las contraseñas no coinciden.",
                registerError: "Error al registrarse: ",
                registerSuccess: "¡Registro exitoso! Por favor inicie sesión.",
                loginError: "Error al iniciar sesión: "
            }
        }
    }
};

export type Language = 'pt' | 'en' | 'es';
export type TranslationState = typeof translations.pt;
