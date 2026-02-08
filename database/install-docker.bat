@echo off
REM ============================================
REM Script de Instalacao Automatica - MariaDB Docker
REM Sistema GCVF - FIERGS
REM ============================================

echo.
echo ========================================
echo   Sistema GCVF - FIERGS
echo   Instalacao MariaDB via Docker
echo ========================================
echo.

REM Verificar se Docker esta instalado
docker --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Docker nao encontrado!
    echo.
    echo Por favor, instale o Docker Desktop:
    echo https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)

echo [OK] Docker encontrado!
echo.

REM Parar e remover container existente (se houver)
echo [1/5] Removendo container anterior (se existir)...
docker stop gcvf-mariadb >nul 2>nul
docker rm gcvf-mariadb >nul 2>nul
echo [OK] Limpeza concluida
echo.

REM Iniciar container MariaDB
echo [2/5] Iniciando container MariaDB...
docker run --name gcvf-mariadb ^
  -e MYSQL_ROOT_PASSWORD=root123 ^
  -e MYSQL_DATABASE=gcvf_fiergs ^
  -p 3306:3306 ^
  -d mariadb:latest

if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao iniciar container!
    pause
    exit /b 1
)
echo [OK] Container iniciado!
echo.

REM Aguardar MariaDB inicializar
echo [3/5] Aguardando MariaDB inicializar (30 segundos)...
timeout /t 30 /nobreak >nul
echo [OK] MariaDB pronto!
echo.

REM Executar script de estrutura
echo [4/5] Criando estrutura do banco de dados...
docker exec -i gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs < schema.sql
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao criar estrutura!
    pause
    exit /b 1
)
echo [OK] Estrutura criada!
echo.

REM Executar script de dados
echo [5/5] Inserindo dados de teste...
docker exec -i gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs < seed-data.sql
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao inserir dados!
    pause
    exit /b 1
)
echo [OK] Dados inseridos!
echo.

REM Verificar instalacao
echo [VERIFICACAO] Testando banco de dados...
docker exec -i gcvf-mariadb mysql -uroot -proot123 -D gcvf_fiergs -e "SELECT COUNT(*) as total_usuarios FROM usuarios;" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha na verificacao!
    pause
    exit /b 1
)
echo [OK] Banco de dados funcionando!
echo.

echo ========================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ========================================
echo.
echo Banco de dados: gcvf_fiergs
echo Host: localhost
echo Porta: 3306
echo Usuario: root
echo Senha: root123
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
echo 1. Volte para a raiz do projeto: cd ..
echo 2. Reinicie o servidor: npm run dev
echo 3. Acesse: http://localhost:3000/login
echo.
pause
