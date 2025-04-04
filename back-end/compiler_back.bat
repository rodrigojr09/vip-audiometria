@echo off
:: Verifica se o script está sendo executado como administrador
openfiles >nul 2>nul
if %errorlevel% neq 0 (
    echo Solicitando privilégios de administrador...
    powershell -Command "Start-Process cmd -ArgumentList '/K \"%~f0\"' -Verb RunAs"
    exit /b
)

:: Define o diretório do back-end
set BACKEND_DIR="C:\Users\user\Desktop\Sistemas VIP\vip-audiometria\back-end"

:: Compila o back-end
echo Compilando o back-end...
cd /d %BACKEND_DIR%
yarn compile > build_logs.txt 2>&1
if %errorlevel% neq 0 (
    echo Erro ao compilar o back-end. Verifique build_logs.txt.
    pause
    exit /b
)

:: Mensagem de conclusão
echo Back-end compilado com sucesso! Logs salvos em build_logs.txt

:: Aguarda uma tecla para evitar o fechamento imediato da janela
pause
