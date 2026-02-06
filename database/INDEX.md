# 📚 Índice - Documentação do Banco de Dados

## 🎯 Guias Rápidos

### Para Começar Agora
1. **[QUICK-START.md](QUICK-START.md)** ⚡
   - Instalação em 5 minutos
   - Comandos prontos para copiar e colar
   - Opções Docker, Windows e Manual

### Para Entender o Sistema
2. **[README.md](README.md)** 📖
   - Documentação completa
   - Instruções detalhadas de instalação
   - Queries úteis e manutenção

### Para Validar a Instalação
3. **[CHECKLIST-VALIDACAO.md](CHECKLIST-VALIDACAO.md)** ✅
   - Checklist passo a passo
   - Comandos de teste
   - Troubleshooting

---

## 👥 Informações de Usuários

### Usuários de Teste
4. **[USUARIOS-TESTE.md](USUARIOS-TESTE.md)** 👤
   - 3 usuários pré-configurados
   - Dados completos de cada perfil
   - Competências e PDIs de exemplo
   - Cenários de teste sugeridos

---

## 🗺️ Arquitetura e Modelo

### Modelo de Dados
5. **[DIAGRAMA-ER.md](DIAGRAMA-ER.md)** 🗺️
   - Diagrama entidade-relacionamento visual
   - Relacionamentos entre tabelas
   - Índices e constraints
   - Estatísticas do modelo

### Documentação Técnica
6. **[../docs/database-model.md](../docs/database-model.md)** 📊
   - Recomendação de banco de dados (MariaDB vs PostgreSQL)
   - Modelo ER completo
   - Descrição detalhada de cada tabela
   - Justificativas técnicas

---

## 📜 Scripts SQL

### Scripts de Instalação
7. **[schema.sql](schema.sql)** 🔧
   - Criação do banco de dados
   - Estrutura de todas as tabelas
   - Foreign keys e constraints
   - Índices para performance

8. **[seed-data.sql](seed-data.sql)** 🌱
   - Dados iniciais de teste
   - 3 usuários com perfis diferentes
   - Competências e áreas
   - Ciclos de feedback e PDIs
   - Views úteis

### Scripts de Automação
9. **[install.bat](install.bat)** 🤖
   - Instalador automático para Windows
   - Testa conexão
   - Executa scripts SQL
   - Valida instalação

---

## 📋 Estrutura do Banco

### Módulos Principais

#### 🏢 Estrutura Organizacional
- `entidades` - Organizações FIERGS
- `setores` - Departamentos
- `cargos` - Cargos e níveis
- `usuarios` - Autenticação
- `funcionarios` - Dados dos funcionários

#### 🎯 Competências
- `areas_competencia` - Áreas de conhecimento
- `competencias` - Habilidades técnicas e comportamentais
- `funcionario_competencias` - Avaliações de competências

#### 📝 Feedback
- `ciclos_feedback` - Ciclos de avaliação
- `perguntas_feedback` - Formulários
- `avaliacoes_feedback` - Avaliações 180°/360°
- `respostas_feedback` - Respostas

#### 📈 PDI
- `pdis` - Planos de desenvolvimento
- `objetivos_pdi` - Objetivos SMART
- `atualizacoes_objetivo` - Histórico de progresso

#### 🔔 Sistema
- `notificacoes` - Notificações
- `logs_auditoria` - Auditoria completa

---

## 🎓 Tutoriais por Perfil

### Desenvolvedor Frontend/Backend
```
1. Ler: QUICK-START.md
2. Executar: install.bat ou Docker
3. Testar: Login com joao.silva@fiergs.org.br
4. Explorar: Dashboard e competências
```

### DBA / Administrador de Sistemas
```
1. Ler: README.md completo
2. Revisar: DIAGRAMA-ER.md
3. Validar: CHECKLIST-VALIDACAO.md
4. Configurar: Backup e monitoramento
```

### Gerente de Projeto / Product Owner
```
1. Ler: USUARIOS-TESTE.md
2. Entender: Cenários de teste
3. Validar: Fluxos de trabalho
4. Aprovar: Estrutura de dados
```

---

## 📊 Estatísticas

### Dados de Teste Incluídos
- ✅ 4 Entidades (FIERGS, SESI, SENAI, IEL)
- ✅ 10 Setores
- ✅ 10 Cargos
- ✅ 3 Usuários (funcionário, coordenador, administrador)
- ✅ 3 Funcionários completos
- ✅ 6 Áreas de competência
- ✅ 27 Competências (técnicas e comportamentais)
- ✅ 32 Avaliações de competências
- ✅ 1 Ciclo de feedback ativo (Q1 2026)
- ✅ 8 Perguntas de feedback
- ✅ 3 Avaliações de feedback
- ✅ 8 Respostas de feedback
- ✅ 2 PDIs aprovados (2026)
- ✅ 5 Objetivos SMART
- ✅ 6 Atualizações de progresso
- ✅ 4 Notificações
- ✅ 6 Logs de auditoria

### Estrutura do Banco
- 📊 19 Tabelas
- 🔗 35+ Relacionamentos
- 📈 50+ Índices
- 👁️ 3 Views

---

## 🚀 Fluxo de Instalação Recomendado

```
┌─────────────────────────────────────────┐
│  1. Ler QUICK-START.md                  │
│     (5 minutos)                         │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  2. Instalar MariaDB                    │
│     Docker ou Local                     │
│     (10 minutos)                        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  3. Executar Scripts SQL                │
│     schema.sql + seed-data.sql          │
│     (2 minutos)                         │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  4. Validar com CHECKLIST               │
│     CHECKLIST-VALIDACAO.md              │
│     (5 minutos)                         │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  5. Testar Usuários                     │
│     USUARIOS-TESTE.md                   │
│     (10 minutos)                        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  ✅ PRONTO PARA USO!                    │
│     Total: ~30 minutos                  │
└─────────────────────────────────────────┘
```

---

## 🔍 Busca Rápida

### Preciso de...

**Instalar rapidamente?**
→ [QUICK-START.md](QUICK-START.md)

**Entender o modelo de dados?**
→ [DIAGRAMA-ER.md](DIAGRAMA-ER.md)

**Testar o sistema?**
→ [USUARIOS-TESTE.md](USUARIOS-TESTE.md)

**Validar a instalação?**
→ [CHECKLIST-VALIDACAO.md](CHECKLIST-VALIDACAO.md)

**Fazer backup?**
→ [README.md](README.md) - Seção Manutenção

**Resolver problemas?**
→ [CHECKLIST-VALIDACAO.md](CHECKLIST-VALIDACAO.md) - Seção Problemas Comuns

**Ver queries úteis?**
→ [README.md](README.md) - Seção Queries Úteis

**Entender relacionamentos?**
→ [DIAGRAMA-ER.md](DIAGRAMA-ER.md) - Seção Relacionamentos

---

## 📞 Suporte

### Documentação
- 📖 Documentação completa: `README.md`
- 🗺️ Modelo ER: `DIAGRAMA-ER.md`
- ⚡ Início rápido: `QUICK-START.md`
- ✅ Validação: `CHECKLIST-VALIDACAO.md`

### Arquivos de Configuração
- 🔧 Estrutura: `schema.sql`
- 🌱 Dados: `seed-data.sql`
- 🤖 Instalador: `install.bat`
- ⚙️ Ambiente: `../.env.example`

### Contato
- 💬 Equipe de TI FIERGS
- 📧 suporte.ti@fiergs.org.br
- 📞 (51) 3347-8800

---

## 🎯 Próximos Passos

Após instalar e validar o banco de dados:

1. ✅ Configure o arquivo `.env` da aplicação
2. ✅ Execute `npm install` no projeto
3. ✅ Inicie a aplicação com `npm run dev`
4. ✅ Acesse http://localhost:3000
5. ✅ Faça login com os usuários de teste
6. ✅ Explore as funcionalidades
7. ✅ Valide os fluxos de trabalho
8. ✅ Personalize conforme necessário

---

**Sistema GCVF - FIERGS**  
*Gestão de Ciclo de Vida do Funcionário*

**Versão do Banco:** 1.0.0  
**Última Atualização:** Fevereiro 2026  
**Banco Recomendado:** MariaDB 10.x+ ou MySQL 8.0+
