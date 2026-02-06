# 🚀 Quick Start - Banco de Dados GCVF

## ⚡ Instalação Rápida (5 minutos)

### Opção 1: Docker (Mais Fácil) 🐳

```bash
# 1. Iniciar MariaDB com Docker
docker run --name gcvf-mariadb \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=gcvf_fiergs \
  -p 3306:3306 \
  -d mariadb:latest

# 2. Aguardar 10 segundos para o banco iniciar
timeout /t 10

# 3. Executar scripts SQL
docker exec -i gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs < schema.sql
docker exec -i gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs < seed-data.sql

# 4. Pronto! ✅
```

### Opção 2: Windows (Instalação Local) 💻

```bash
# 1. Execute o instalador automático
cd database
install.bat

# 2. Siga as instruções na tela
# 3. Pronto! ✅
```

### Opção 3: Manual 📝

```bash
# 1. Instalar MariaDB
# Download: https://mariadb.org/download/

# 2. Executar scripts
mysql -u root -p < schema.sql
mysql -u root -p < seed-data.sql

# 3. Pronto! ✅
```

## 👥 Usuários de Teste

### 🔵 Funcionário
```
Email: joao.silva@fiergs.org.br
Senha: Teste@2024
Perfil: Desenvolvedor Pleno
```

### 🟢 Coordenador
```
Email: maria.santos@fiergs.org.br
Senha: Teste@2024
Perfil: Coordenadora de TI
```

### 🔴 Administrador
```
Email: carlos.oliveira@fiergs.org.br
Senha: Teste@2024
Perfil: Gerente de RH
```

## ⚙️ Configurar Aplicação

```bash
# 1. Copiar arquivo de configuração
cp .env.example .env

# 2. Editar .env com suas credenciais
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=root123
# DB_NAME=gcvf_fiergs

# 3. Instalar dependências (se ainda não fez)
npm install

# 4. Iniciar aplicação
npm run dev

# 5. Acessar
# http://localhost:3000
```

## ✅ Verificar Instalação

```sql
-- Conectar ao banco
mysql -u root -p gcvf_fiergs

-- Verificar usuários
SELECT email, perfil FROM usuarios;

-- Verificar funcionários
SELECT nome_completo, matricula FROM funcionarios;

-- Verificar competências
SELECT COUNT(*) FROM competencias;
```

## 🎯 Cenário de Teste Pronto

O banco já vem com:
- ✅ 3 usuários com perfis diferentes
- ✅ 27 competências técnicas e comportamentais
- ✅ 1 ciclo de feedback ativo (Q1 2026)
- ✅ 2 PDIs aprovados com objetivos SMART
- ✅ Avaliações e respostas de exemplo
- ✅ Notificações e logs de auditoria

## 🔧 Comandos Úteis

### Docker
```bash
# Parar banco
docker stop gcvf-mariadb

# Iniciar banco
docker start gcvf-mariadb

# Ver logs
docker logs gcvf-mariadb

# Acessar MySQL
docker exec -it gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs

# Remover tudo
docker rm -f gcvf-mariadb
```

### Backup
```bash
# Fazer backup
mysqldump -u root -p gcvf_fiergs > backup.sql

# Restaurar backup
mysql -u root -p gcvf_fiergs < backup.sql
```

## 📊 Dados Incluídos

| Tabela | Registros |
|--------|-----------|
| Entidades | 4 |
| Setores | 10 |
| Cargos | 10 |
| Usuários | 3 |
| Funcionários | 3 |
| Áreas de Competência | 6 |
| Competências | 27 |
| Avaliações de Competências | 32 |
| Ciclos de Feedback | 1 |
| Perguntas de Feedback | 8 |
| PDIs | 2 |
| Objetivos PDI | 5 |
| Notificações | 4 |

## 🆘 Problemas Comuns

### Erro: "Access denied"
```bash
# Verificar senha do MySQL
mysql -u root -p

# Resetar senha (se necessário)
# Consulte documentação do MariaDB
```

### Erro: "Can't connect to MySQL server"
```bash
# Verificar se o serviço está rodando
# Windows: services.msc -> MySQL/MariaDB
# Linux: sudo systemctl status mariadb
# Docker: docker ps
```

### Erro: "Database already exists"
```bash
# Remover banco existente
mysql -u root -p -e "DROP DATABASE IF EXISTS gcvf_fiergs;"

# Executar scripts novamente
mysql -u root -p < schema.sql
```

## 📞 Suporte

- 📖 Documentação completa: `database/README.md`
- 🗺️ Modelo ER: `docs/database-model.md`
- 💬 Dúvidas: Entre em contato com a equipe de TI

---

**Pronto para começar!** 🎉

Execute `npm run dev` e acesse http://localhost:3000
