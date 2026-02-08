@echo off
REM ============================================
REM Script Completo de Instalacao MariaDB
REM Sistema GCVF - FIERGS
REM ============================================

echo.
echo ========================================
echo   Sistema GCVF - FIERGS
echo   Instalacao Completa do MariaDB
echo ========================================
echo.

REM Verificar Docker
echo [1/7] Verificando Docker...
docker --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Docker nao encontrado!
    pause
    exit /b 1
)
echo [OK] Docker instalado!
echo.

REM Verificar se Docker esta rodando
echo [2/7] Verificando se Docker Desktop esta rodando...
docker ps >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [AVISO] Docker Desktop nao esta rodando!
    echo.
    echo Por favor:
    echo 1. Abra o Docker Desktop
    echo 2. Aguarde ate ver "Docker Desktop is running"
    echo 3. Pressione qualquer tecla para continuar...
    pause >nul
    
    REM Tentar novamente
    docker ps >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Docker Desktop ainda nao esta rodando!
        echo Abra o Docker Desktop e tente novamente.
        pause
        exit /b 1
    )
)
echo [OK] Docker Desktop rodando!
echo.

REM Remover container anterior
echo [3/7] Removendo container anterior (se existir)...
docker stop gcvf-mariadb >nul 2>nul
docker rm gcvf-mariadb >nul 2>nul
echo [OK] Limpeza concluida!
echo.

REM Criar container MariaDB
echo [4/7] Criando container MariaDB...
docker run --name gcvf-mariadb ^
  -e MYSQL_ROOT_PASSWORD=root123 ^
  -e MYSQL_DATABASE=gcvf_fiergs ^
  -p 3306:3306 ^
  -d mariadb:latest

if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao criar container!
    pause
    exit /b 1
)
echo [OK] Container criado!
echo.

REM Aguardar MariaDB inicializar
echo [5/7] Aguardando MariaDB inicializar (30 segundos)...
timeout /t 30 /nobreak >nul
echo [OK] MariaDB pronto!
echo.

REM Executar script de estrutura
echo [6/7] Criando estrutura do banco (19 tabelas)...
docker exec -i gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs < schema.sql
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao criar estrutura!
    pause
    exit /b 1
)
echo [OK] Estrutura criada!
echo.

REM Executar script de dados
echo [7/7] Inserindo dados de teste...
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
docker exec gcvf-mariadb mysql -uroot -proot123 -D gcvf_fiergs -e "SELECT COUNT(*) as total_usuarios FROM usuarios;"
echo.

echo ========================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ========================================
echo.
echo Configuracao do Banco:
echo   Host: localhost
echo   Porta: 3306
echo   Usuario: root
echo   Senha: root123
echo   Database: gcvf_fiergs
echo.
echo ========================================
echo   USUARIOS DE TESTE
echo ========================================
echo.
echo 1. FUNCIONARIO (Desenvolvedor Pleno)
echo    Email: joao.silva@fiergs.org.br
echo    Senha: Teste@2024
echo    Perfil: funcionario
echo.
echo 2. COORDENADOR (Coordenadora de TI)
echo    Email: maria.santos@fiergs.org.br
echo    Senha: Teste@2024
echo    Perfil: coordenador
echo.
echo 3. ADMINISTRADOR (Gerente de RH)
echo    Email: carlos.oliveira@fiergs.org.br
echo    Senha: Teste@2024
echo    Perfil: administrador
echo.
echo ========================================
echo   PROXIMOS PASSOS
echo ========================================
echo.
echo 1. Volte para a raiz do projeto:
echo    cd ..
echo.
echo 2. Reinicie o servidor Next.js:
echo    npm run dev
echo.
echo 3. Acesse o sistema:
echo    http://localhost:3000/login
echo.
echo 4. Faca login com um dos usuarios acima
echo.
echo ========================================
echo.
pause
