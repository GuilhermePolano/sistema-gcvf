# ✅ Checklist de Validação - Banco de Dados GCVF

## 📋 Validação da Instalação

Use este checklist para validar se o banco de dados foi instalado corretamente.

---

## 🔧 1. Instalação do MariaDB/MySQL

- [ ] MariaDB/MySQL instalado e rodando
- [ ] Serviço iniciado automaticamente
- [ ] Porta 3306 acessível
- [ ] Senha do root configurada
- [ ] Acesso via linha de comando funcionando

**Comando de teste:**
```bash
mysql -u root -p -e "SELECT VERSION();"
```

**Resultado esperado:**
```
+------------------+
| VERSION()        |
+------------------+
| 10.x.x-MariaDB   |
+------------------+
```

---

## 📊 2. Criação do Banco de Dados

- [ ] Banco `gcvf_fiergs` criado
- [ ] Character set: `utf8mb4`
- [ ] Collation: `utf8mb4_unicode_ci`

**Comando de teste:**
```sql
SHOW DATABASES LIKE 'gcvf_fiergs';
```

**Resultado esperado:**
```
+-------------------------+
| Database (gcvf_fiergs)  |
+-------------------------+
| gcvf_fiergs             |
+-------------------------+
```

---

## 🗂️ 3. Estrutura das Tabelas

- [ ] 19 tabelas criadas
- [ ] Todas as foreign keys configuradas
- [ ] Índices criados corretamente
- [ ] Views criadas

**Comando de teste:**
```sql
USE gcvf_fiergs;
SHOW TABLES;
```

**Resultado esperado (19 tabelas):**
```
+---------------------------+
| Tables_in_gcvf_fiergs     |
+---------------------------+
| areas_competencia         |
| atualizacoes_objetivo     |
| avaliacoes_feedback       |
| cargos                    |
| ciclos_feedback           |
| competencias              |
| entidades                 |
| funcionario_competencias  |
| funcionarios              |
| logs_auditoria            |
| notificacoes              |
| objetivos_pdi             |
| pdis                      |
| perguntas_feedback        |
| respostas_feedback        |
| setores                   |
| usuarios                  |
+---------------------------+
```

---

## 👥 4. Dados de Teste - Usuários

- [ ] 3 usuários criados
- [ ] Senhas hash configuradas
- [ ] Perfis corretos (funcionario, coordenador, administrador)

**Comando de teste:**
```sql
SELECT id, email, perfil, ativo FROM usuarios;
```

**Resultado esperado:**
```
+----+----------------------------------+---------------+-------+
| id | email                            | perfil        | ativo |
+----+----------------------------------+---------------+-------+
|  1 | joao.silva@fiergs.org.br         | funcionario   |     1 |
|  2 | maria.santos@fiergs.org.br       | coordenador   |     1 |
|  3 | carlos.oliveira@fiergs.org.br    | administrador |     1 |
+----+----------------------------------+---------------+-------+
```

---

## 👤 5. Dados de Teste - Funcionários

- [ ] 3 funcionários criados
- [ ] Dados completos preenchidos
- [ ] Relacionamentos corretos (entidade, setor, cargo)
- [ ] Gestor configurado (João → Maria)

**Comando de teste:**
```sql
SELECT 
  id, 
  matricula, 
  nome_completo, 
  status,
  gestor_id
FROM funcionarios;
```

**Resultado esperado:**
```
+----+-----------------+---------------------------+--------+-----------+
| id | matricula       | nome_completo             | status | gestor_id |
+----+-----------------+---------------------------+--------+-----------+
|  1 | FIERGS-2021-001 | João Pedro da Silva       | ATIVO  |         2 |
|  2 | FIERGS-2018-045 | Maria Fernanda Santos     | ATIVO  |      NULL |
|  3 | FIERGS-2015-012 | Carlos Eduardo Oliveira   | ATIVO  |      NULL |
+----+-----------------+---------------------------+--------+-----------+
```

---

## 🎯 6. Competências

- [ ] 6 áreas de competência criadas
- [ ] 27 competências criadas
- [ ] 32 avaliações de competências

**Comando de teste:**
```sql
SELECT 
  (SELECT COUNT(*) FROM areas_competencia) as areas,
  (SELECT COUNT(*) FROM competencias) as competencias,
  (SELECT COUNT(*) FROM funcionario_competencias) as avaliacoes;
```

**Resultado esperado:**
```
+-------+--------------+------------+
| areas | competencias | avaliacoes |
+-------+--------------+------------+
|     6 |           27 |         32 |
+-------+--------------+------------+
```

---

## 📝 7. Ciclos de Feedback

- [ ] 1 ciclo criado (Q1 2026)
- [ ] 8 perguntas configuradas
- [ ] 3 avaliações criadas
- [ ] 8 respostas registradas

**Comando de teste:**
```sql
SELECT 
  (SELECT COUNT(*) FROM ciclos_feedback) as ciclos,
  (SELECT COUNT(*) FROM perguntas_feedback) as perguntas,
  (SELECT COUNT(*) FROM avaliacoes_feedback) as avaliacoes,
  (SELECT COUNT(*) FROM respostas_feedback) as respostas;
```

**Resultado esperado:**
```
+--------+-----------+------------+-----------+
| ciclos | perguntas | avaliacoes | respostas |
+--------+-----------+------------+-----------+
|      1 |         8 |          3 |         8 |
+--------+-----------+------------+-----------+
```

---

## 📈 8. PDIs e Objetivos

- [ ] 2 PDIs criados (João e Maria)
- [ ] 5 objetivos SMART criados
- [ ] 6 atualizações de progresso
- [ ] Status corretos

**Comando de teste:**
```sql
SELECT 
  (SELECT COUNT(*) FROM pdis) as pdis,
  (SELECT COUNT(*) FROM objetivos_pdi) as objetivos,
  (SELECT COUNT(*) FROM atualizacoes_objetivo) as atualizacoes;
```

**Resultado esperado:**
```
+------+-----------+--------------+
| pdis | objetivos | atualizacoes |
+------+-----------+--------------+
|    2 |         5 |            6 |
+------+-----------+--------------+
```

---

## 🔔 9. Sistema e Auditoria

- [ ] 4 notificações criadas
- [ ] 6 logs de auditoria
- [ ] Notificações vinculadas aos usuários corretos

**Comando de teste:**
```sql
SELECT 
  (SELECT COUNT(*) FROM notificacoes) as notificacoes,
  (SELECT COUNT(*) FROM logs_auditoria) as logs;
```

**Resultado esperado:**
```
+---------------+------+
| notificacoes  | logs |
+---------------+------+
|             4 |    6 |
+---------------+------+
```

---

## 📊 10. Views

- [ ] vw_funcionarios_completo criada
- [ ] vw_matriz_competencias criada
- [ ] vw_pdis_ativos criada
- [ ] Views retornam dados corretos

**Comando de teste:**
```sql
SHOW FULL TABLES WHERE Table_type = 'VIEW';
```

**Resultado esperado:**
```
+---------------------------+------------+
| Tables_in_gcvf_fiergs     | Table_type |
+---------------------------+------------+
| vw_funcionarios_completo  | VIEW       |
| vw_matriz_competencias    | VIEW       |
| vw_pdis_ativos            | VIEW       |
+---------------------------+------------+
```

---

## 🔗 11. Integridade Referencial

- [ ] Todas as foreign keys funcionando
- [ ] Cascatas configuradas corretamente
- [ ] Constraints validando dados

**Comando de teste:**
```sql
SELECT 
  TABLE_NAME,
  CONSTRAINT_NAME,
  REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'gcvf_fiergs'
  AND REFERENCED_TABLE_NAME IS NOT NULL
LIMIT 10;
```

**Resultado esperado:**
```
Deve listar várias foreign keys configuradas
```

---

## 🎯 12. Testes Funcionais

### Teste 1: Login de Usuário
```sql
SELECT 
  u.email,
  u.perfil,
  f.nome_completo,
  f.matricula
FROM usuarios u
JOIN funcionarios f ON u.id = f.usuario_id
WHERE u.email = 'joao.silva@fiergs.org.br';
```

**Resultado esperado:**
```
+------------------------------+-------------+---------------------+-----------------+
| email                        | perfil      | nome_completo       | matricula       |
+------------------------------+-------------+---------------------+-----------------+
| joao.silva@fiergs.org.br     | funcionario | João Pedro da Silva | FIERGS-2021-001 |
+------------------------------+-------------+---------------------+-----------------+
```

### Teste 2: Competências do Funcionário
```sql
SELECT * FROM vw_matriz_competencias 
WHERE funcionario_id = 1 
LIMIT 5;
```

**Resultado esperado:**
```
Deve retornar 5 competências do João com níveis
```

### Teste 3: PDI Ativo
```sql
SELECT * FROM vw_pdis_ativos 
WHERE funcionario_id = 1;
```

**Resultado esperado:**
```
Deve retornar PDI 2026 do João com progresso médio
```

### Teste 4: Feedbacks Pendentes
```sql
SELECT 
  af.id,
  av.nome_completo as avaliado,
  ar.nome_completo as avaliador,
  af.tipo,
  af.status
FROM avaliacoes_feedback af
JOIN funcionarios av ON af.avaliado_id = av.id
JOIN funcionarios ar ON af.avaliador_id = ar.id
WHERE af.status = 'PENDENTE';
```

**Resultado esperado:**
```
Deve retornar 2 avaliações pendentes
```

---

## ⚡ 13. Performance

- [ ] Queries executando em < 100ms
- [ ] Índices sendo utilizados
- [ ] Sem queries lentas

**Comando de teste:**
```sql
EXPLAIN SELECT * FROM vw_funcionarios_completo;
```

**Resultado esperado:**
```
Deve mostrar uso de índices (key column preenchida)
```

---

## 🔐 14. Segurança

- [ ] Senhas armazenadas com hash bcrypt
- [ ] Perfis de acesso configurados
- [ ] Logs de auditoria funcionando

**Comando de teste:**
```sql
SELECT 
  email,
  LEFT(senha_hash, 10) as senha_preview,
  perfil
FROM usuarios;
```

**Resultado esperado:**
```
Senhas devem começar com $2b$ (bcrypt)
```

---

## 📱 15. Integração com Aplicação

- [ ] Arquivo .env configurado
- [ ] Conexão da aplicação funcionando
- [ ] Login na aplicação funcionando
- [ ] Dados sendo exibidos corretamente

**Teste manual:**
1. Configurar .env com credenciais do banco
2. Executar `npm run dev`
3. Acessar http://localhost:3000
4. Fazer login com joao.silva@fiergs.org.br
5. Verificar se dashboard carrega

---

## ✅ Checklist Final

### Instalação Básica
- [ ] MariaDB instalado e rodando
- [ ] Banco gcvf_fiergs criado
- [ ] 19 tabelas criadas
- [ ] 3 views criadas

### Dados de Teste
- [ ] 3 usuários criados
- [ ] 3 funcionários criados
- [ ] 27 competências criadas
- [ ] 32 avaliações de competências
- [ ] 1 ciclo de feedback ativo
- [ ] 2 PDIs com objetivos
- [ ] 4 notificações

### Funcionalidades
- [ ] Foreign keys funcionando
- [ ] Índices criados
- [ ] Views retornando dados
- [ ] Queries performáticas

### Integração
- [ ] .env configurado
- [ ] Aplicação conectando ao banco
- [ ] Login funcionando
- [ ] Dados sendo exibidos

---

## 🎉 Validação Completa

Se todos os itens acima estiverem marcados, o banco de dados está **100% funcional** e pronto para uso!

### Próximos Passos:
1. ✅ Testar todos os 3 perfis de usuário
2. ✅ Validar fluxos de trabalho
3. ✅ Personalizar dados conforme necessário
4. ✅ Configurar backup automático
5. ✅ Documentar customizações

---

## 🆘 Problemas Comuns

### Erro: "Table doesn't exist"
```sql
-- Verificar se scripts foram executados
SHOW TABLES;

-- Re-executar se necessário
SOURCE schema.sql;
SOURCE seed-data.sql;
```

### Erro: "Foreign key constraint fails"
```sql
-- Verificar integridade
SET FOREIGN_KEY_CHECKS=0;
-- Executar operação
SET FOREIGN_KEY_CHECKS=1;
```

### Erro: "Duplicate entry"
```sql
-- Limpar dados e reinserir
TRUNCATE TABLE nome_da_tabela;
SOURCE seed-data.sql;
```

---

**Sistema GCVF - FIERGS**  
*Checklist de Validação do Banco de Dados*
