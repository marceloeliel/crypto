# Como Gerar o APK

## Problema Atual
Você tem Java 19, mas precisa do JDK 17 para gerar o APK.

## Solução Rápida (5 minutos)

### 1. Baixar JDK 17
Link direto: https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe

OU

Link alternativo (sem login): https://adoptium.net/temurin/releases/?version=17
- Escolha: Windows x64 JDK .msi

### 2. Instalar
- Execute o instalador
- Next → Next → Install
- Feche este PowerShell

### 3. Gerar APK
Abra um NOVO PowerShell e execute:

```powershell
cd C:\Users\Marcelo\Downloads\binance-clone\android
.\gradlew.bat assembleDebug
```

### 4. Copiar APK para pasta fácil
Depois do build, execute:

```powershell
Copy-Item app\build\outputs\apk\debug\app-debug.apk ..\apk-output\binance-clone.apk
```

## Resultado
O APK estará em:
`C:\Users\Marcelo\Downloads\binance-clone\apk-output\binance-clone.apk`

## Alternativa: Sem instalar nada
Se não quiser instalar JDK 17, me avise que eu uso outro método!
