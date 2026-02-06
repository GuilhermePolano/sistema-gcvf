# 🗄️ Banco de Dados - Sistema GCVF

## 📋 Visão Geral

Este diretório contém os scripts SQL para criação e população do banco de dados MariaDB/MySQL do Sistema GCVF.

## 🚀 Instalação Rápida

### 1. Instalar MariaDB

**Windows:**
```bash
# Download do instalador oficial
https://mariadb.org/download/

# Ou via Chocolatey
choco install mariadb
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mariadb-server
sudo mysql_secure_installation
```

**Docker (Recomendado para desenvolvimento):**
```bash
docker run --name gcvf-mariadb \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=gcvf_fiergs \
  -p 3306:3306 \
  -d mariadb:latest
```

### 2. Executar Scripts SQL

**Opção A: Via linha de comando**
```bash
# Criar estrutura do banco
mysql -u root -p < schema.sql

# Inserir dados de teste
mysql -u root -p < seed-data.sql
```

**Opção B: Via MySQL Workbench / DBeaver**
1. Conecte ao servidor MariaDB
2. Abra o arquivo `schema.sql`
3. Execute o script completo
4. Abra o arquivo `seed-data.sql`
5. Execute o script completo

**Opção C: Via Docker**
```bash
# Copiar scripts para o container
docker cp schema.sql gcvf-mariadb:/schema.sql
docker cp seed-data.sql gcvf-mariadb:/seed-data.sql

# Executar scripts
docker exec -i gcvf-mariadb mysql -uroot -proot123 < schema.sql
docker exec -i gcvf-mariadb mysql -uroot -proot123 < seed-data.sql
```

## 👥 Usuários de Teste

O sistema vem com 3 usuários pré-cadastrados para teste:

### 🔵 Usuário 1: Funcionário (Desenvolvedor)
- **Email:** `joao.silva@fiergs.org.br`
- **Senha:** `Teste@2024`
- **Perfil:** Funcionário
- **Cargo:** Desenvolvedor Pleno
- **Setor:** Desenvolvimento (TI)
- **Descrição:** Desenvolvedor com foco em Frontend (React, Next.js, TypeScript)
- **Acesso:** Dashboard pessoal, PDI, autoavaliação, competências

### 🟢 Usuário 2: Coordenador
- **Email:** `maria.santos@fiergs.org.br`
- **Senha:** `Teste@2024`
- **Perfil:** Coordenador
- **Cargo:** Coordenadora de TI
- **Setor:** Tecnologia da Informação
- **Descrição:** Coordenadora técnica, gestora do João Silva
- **Acesso:** Gestão de equipe, avaliações, configuração de ciclos, relatórios do setor

### 🔴 Usuário 3: Administrador
- **Email:** `carlos.oliveira@fiergs.org.br`
- **Senha:** `Teste@2024`
- **Perfil:** Administrador
- **Cargo:** Gerente de RH
- **Setor:** Recursos Humanos
- **Descrição:** Gerente com acesso total ao sistema
- **Acesso:** Todas as funcionalidades, gestão global, configurações, auditoria

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### 👤 Gestão de Pessoas
- `entidades` - Organizações FIERGS (FIERGS, SESI, SENAI, IEL)
- `setores` - Departamentos e setores
- `cargos` - Cargos e níveis hierárquicos
- `usuarios` - Autenticação e perfis de acesso
- `funcionarios` - Dados completos dos funcionários

#### 🎯 Competências
- `areas_competencia` - Áreas de conhecimento
- `competencias` - Competências técnicas e comportamentais
- `funcionario_competencias` - Níveis de competência por funcionário

#### 📝 Feedback
- `ciclos_feedback` - Ciclos de avaliação (trimestral, semestral, anual)
- `perguntas_feedback` - Perguntas dos formulários
- `avaliacoes_feedback` - Avaliações 180° e 360°
- `respostas_feedback` - Respostas das avaliações

#### 📈 PDI (Plano de Desenvolvimento Individual)
- `pdis` - PDIs anuais dos funcionários
- `objetivos_pdi` - Objetivos SMART
- `atualizacoes_objetivo` - Histórico de progresso

#### 🔔 Sistema
- `notificacoes` - Notificações para usuários
- `logs_auditoria` - Registro de todas as ações

### Views Úteis

- `vw_funcionarios_completo` - Funcionários com dados completos
- `vw_matriz_competencias` - Matriz de competências consolidada
- `vw_pdis_ativos` - PDIs ativos com progresso

## 🔐 Segurança

### Senhas
- Todas as senhas de teste usam bcrypt com 10 rounds
- **Senha padrão:** `Teste@2024`
- **IMPORTANTE:** Altere as senhas em produção!

### Perfis de Acesso

| Perfil | Descrição | Permissões |
|--------|-----------|------------|
| **funcionario** | Usuário padrão | Visualizar próprios dados, PDI, autoavaliação |
| **coordenador** | Gestor de equipe | + Gerenciar equipe, avaliar subordinados, relatórios do setor |
| **gerente** | Gerente de área | + Visão ampliada, múltiplas equipes, aprovações |
| **administrador** | Admin global | Acesso total, configurações, auditoria |

## 📈 Dados de Teste Incluídos

### ✅ O que está populado:
- ✅ 4 Entidades (FIERGS, SESI, SENAI, IEL)
- ✅ 10 Setores
- ✅ 10 Cargos
- ✅ 3 Usuários com perfis diferentes
- ✅ 3 Funcionários completos
- ✅ 6 Áreas de competência
- ✅ 27 Competências (técnicas e comportamentais)
- ✅ 32 Avaliações de competências
- ✅ 1 Ciclo de feedback ativo (Q1 2026)
- ✅ 8 Perguntas de feedback
- ✅ 3 Avaliações de feedback
- ✅ 8 Respostas de feedback (autoavaliação do João)
- ✅ 2 PDIs aprovados (2026)
- ✅ 5 Objetivos SMART
- ✅ 6 Atualizações de progresso
- ✅ 4 Notificações
- ✅ 6 Logs de auditoria

### 📊 Cenário de Teste

**João Silva** (Desenvolvedor):
- Tem 12 competências avaliadas (Frontend, Backend, DevOps)
- PDI 2026 aprovado com 3 objetivos:
  - AWS Certification (45% concluído)
  - Docker/Kubernetes (30% concluído)
  - Liderança de projeto (15% concluído)
- Completou autoavaliação Q1 2026
- Aguardando avaliação do gestor

**Maria Santos** (Coordenadora):
- Gestora do João Silva
- 12 competências avaliadas (nível avançado)
- PDI 2026 com 2 objetivos (MBA e OKRs)
- Precisa avaliar João no ciclo Q1 2026

**Carlos Oliveira** (Administrador):
- Gerente de RH com acesso total
- 8 competências comportamentais e de gestão
- Aprovou os PDIs de João e Maria

## 🔍 Queries Úteis

### Listar todos os funcionários ativos
```sql
SELECT * FROM vw_funcionarios_completo;
```

### Ver matriz de competências
```sql
SELECT * FROM vw_matriz_competencias 
WHERE funcionario_id = 1;
```

### Verificar PDIs ativos
```sql
SELECT * FROM vw_pdis_ativos;
```

### Feedbacks pendentes por usuário
```sql
SELECT 
  u.email,
  COUNT(*) as feedbacks_pendentes
FROM avaliacoes_feedback af
JOIN funcionarios f ON af.avaliador_id = f.id
JOIN usuarios u ON f.usuario_id = u.id
WHERE af.status = 'PENDENTE'
GROUP BY u.email;
```

### Competências com maior gap (diferença entre atual e desejado)
```sql
SELECT 
  f.nome_completo,
  c.nome AS competencia,
  fc.nivel_atual,
  fc.nivel_desejado,
  (fc.nivel_desejado - fc.nivel_atual) AS gap
FROM funcionario_competencias fc
JOIN funcionarios f ON fc.funcionario_id = f.id
JOIN competencias c ON fc.competencia_id = c.id
WHERE fc.nivel_desejado > fc.nivel_atual
ORDER BY gap DESC;
```

## 🛠️ Manutenção

### Backup
```bash
# Backup completo
mysqldump -u root -p gcvf_fiergs > backup_gcvf_$(date +%Y%m%d).sql

# Backup apenas estrutura
mysqldump -u root -p --no-data gcvf_fiergs > schema_backup.sql

# Backup apenas dados
mysqldump -u root -p --no-create-info gcvf_fiergs > data_backup.sql
```

### Restauração
```bash
mysql -u root -p gcvf_fiergs < backup_gcvf_20260206.sql
```

### Limpar dados de teste
```sql
-- CUIDADO: Remove todos os dados, mantém estrutura
USE gcvf_fiergs;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE logs_auditoria;
TRUNCATE TABLE notificacoes;
TRUNCATE TABLE atualizacoes_objetivo;
TRUNCATE TABLE objetivos_pdi;
TRUNCATE TABLE pdis;
TRUNCATE TABLE respostas_feedback;
TRUNCATE TABLE avaliacoes_feedback;
TRUNCATE TABLE perguntas_feedback;
TRUNCATE TABLE ciclos_feedback;
TRUNCATE TABLE funcionario_competencias;
TRUNCATE TABLE competencias;
TRUNCATE TABLE areas_competencia;
TRUNCATE TABLE funcionarios;
TRUNCATE TABLE usuarios;
TRUNCATE TABLE cargos;
TRUNCATE TABLE setores;
TRUNCATE TABLE entidades;
SET FOREIGN_KEY_CHECKS = 1;
```

## 📞 Suporte

Para dúvidas sobre o banco de dados:
- Consulte a documentação em `docs/database-model.md`
- Verifique o modelo ER completo
- Entre em contato com a equipe de TI

---

**Sistema GCVF - FIERGS**  
*Gestão de Ciclo de Vida do Funcionário*
