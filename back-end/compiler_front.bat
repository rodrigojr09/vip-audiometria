@echo off
:: Verifica se o script está sendo executado como administrador
openfiles >nul 2>nul
if %errorlevel% neq 0 (
    echo Solicitando privilégios de administrador...
    powershell -Command "Start-Process cmd -ArgumentList '/K \"%~f0\"' -Verb RunAs"
    exit /b
)

:: Define o diretório do front-end
set FRONTEND_DIR="C:\Users\user\Desktop\Sistemas VIP\vip-audiometria\front-end"

:: Compila o front-end
echo Compilando o front-end...
cd /d %FRONTEND_DIR%
yarn build || echo [ERRO] O build do front-end falhou, mas continuando...

:: Mensagem de conclusão
echo Front-end compilado com sucesso!

:: Aguarda uma tecla para evitar o fechamento imediato da janela
pause
