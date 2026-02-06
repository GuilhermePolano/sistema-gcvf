@echo off
REM ============================================
REM Script de Instalacao do Banco de Dados
REM Sistema GCVF - FIERGS
REM ============================================

echo.
echo ========================================
echo   Sistema GCVF - FIERGS
echo   Instalacao do Banco de Dados
echo ========================================
echo.

REM Verificar se MySQL/MariaDB esta instalado
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] MySQL/MariaDB nao encontrado!
    echo.
    echo Por favor, instale o MariaDB primeiro:
    echo - Download: https://mariadb.org/download/
    echo - Ou via Docker: docker run --name gcvf-mariadb -e MYSQL_ROOT_PASSWORD=root123 -p 3306:3306 -d mariadb:latest
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL/MariaDB encontrado!
echo.

REM Solicitar credenciais
set /p DB_HOST="Host do banco de dados [localhost]: " || set DB_HOST=localhost
set /p DB_PORT="Porta [3306]: " || set DB_PORT=3306
set /p DB_USER="Usuario [root]: " || set DB_USER=root
set /p DB_PASS="Senha: "

echo.
echo ========================================
echo   Configuracao
echo ========================================
echo Host: %DB_HOST%
echo Porta: %DB_PORT%
echo Usuario: %DB_USER%
echo.

REM Testar conexao
echo [1/4] Testando conexao com o banco...
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% -e "SELECT 1;" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Nao foi possivel conectar ao banco de dados!
    echo Verifique as credenciais e tente novamente.
    pause
    exit /b 1
)
echo [OK] Conexao estabelecida!
echo.

REM Criar estrutura
echo [2/4] Criando estrutura do banco de dados...
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% < schema.sql
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao criar estrutura do banco!
    pause
    exit /b 1
)
echo [OK] Estrutura criada com sucesso!
echo.

REM Inserir dados de teste
echo [3/4] Inserindo dados de teste...
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% < seed-data.sql
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao inserir dados de teste!
    pause
    exit /b 1
)
echo [OK] Dados de teste inseridos!
echo.

REM Verificar instalacao
echo [4/4] Verificando instalacao...
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% -D gcvf_fiergs -e "SELECT COUNT(*) as total_usuarios FROM usuarios;" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha na verificacao!
    pause
    exit /b 1
)
echo [OK] Instalacao verificada!
echo.

echo ========================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ========================================
echo.
echo Banco de dados: gcvf_fiergs
echo.
echo USUARIOS DE TESTE:
echo.
echo 1. Funcionario (Desenvolvedor)
echo    Email: joao.silva@fiergs.org.br
echo    Senha: Teste@2024
echo.
echo 2. Coordenador (Gestao de Equipe)
echo    Email: maria.santos@fiergs.org.br
echo    Senha: Teste@2024
echo.
echo 3. Administrador (Acesso Total)
echo    Email: carlos.oliveira@fiergs.org.br
echo    Senha: Teste@2024
echo.
echo ========================================
echo.
echo Proximos passos:
echo 1. Configure a conexao no arquivo .env do projeto
echo 2. Execute: npm run dev
echo 3. Acesse: http://localhost:3000
echo.
pause
