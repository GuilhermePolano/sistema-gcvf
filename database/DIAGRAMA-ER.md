# 🗺️ Diagrama Entidade-Relacionamento - Sistema GCVF

## 📊 Visão Geral do Modelo

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SISTEMA GCVF - FIERGS                            │
│              Gestão de Ciclo de Vida do Funcionário                 │
└─────────────────────────────────────────────────────────────────────┘
```

## 🏢 Módulo: Estrutura Organizacional

```
┌──────────────┐
│  entidades   │
│──────────────│
│ id (PK)      │
│ codigo       │◄────┐
│ nome         │     │
│ sigla        │     │
│ tipo         │     │
│ ativo        │     │
└──────────────┘     │
                     │
                     │ 1:N
                     │
┌──────────────┐     │
│   setores    │     │
│──────────────│     │
│ id (PK)      │     │
│ entidade_id  │─────┘
│ codigo       │
│ nome         │◄────┐
│ setor_pai_id │─┐   │
│ ativo        │ │   │
└──────────────┘ │   │
       │         │   │
       └─────────┘   │ 1:N
                     │
┌──────────────┐     │
│    cargos    │     │
│──────────────│     │
│ id (PK)      │     │
│ codigo       │     │
│ nome         │◄────┼───┐
│ nivel        │     │   │
│ descricao    │     │   │
│ ativo        │     │   │
└──────────────┘     │   │
                     │   │
                     │   │
┌──────────────┐     │   │
│   usuarios   │     │   │
│──────────────│     │   │
│ id (PK)      │◄─┐  │   │
│ email        │  │  │   │
│ senha_hash   │  │  │   │
│ perfil       │  │  │   │
│ ativo        │  │  │   │
└──────────────┘  │  │   │
                  │  │   │
                  │  │   │
                  │  │   │
┌──────────────┐  │  │   │
│ funcionarios │  │  │   │
│──────────────│  │  │   │
│ id (PK)      │  │  │   │
│ usuario_id   │──┘  │   │
│ matricula    │     │   │
│ cpf          │     │   │
│ nome_completo│     │   │
│ entidade_id  │─────┘   │
│ setor_id     │─────────┘
│ cargo_id     │─────────────┐
│ gestor_id    │─┐           │
│ status       │ │           │
└──────────────┘ │           │
       │         │           │
       └─────────┘           │
                             │
```

## 🎯 Módulo: Competências

```
┌──────────────────┐
│ areas_competencia│
│──────────────────│
│ id (PK)          │
│ nome             │◄────┐
│ descricao        │     │
│ cor              │     │
│ ativo            │     │
└──────────────────┘     │
                         │ 1:N
                         │
┌──────────────────┐     │
│  competencias    │     │
│──────────────────│     │
│ id (PK)          │     │
│ area_id          │─────┘
│ nome             │◄────┐
│ descricao        │     │
│ tipo             │     │
│ nivel_maximo     │     │
│ ativo            │     │
└──────────────────┘     │
                         │ N:M
                         │
┌──────────────────────┐ │
│funcionario_competencias│
│──────────────────────│ │
│ id (PK)              │ │
│ funcionario_id (FK)  │─┼───► funcionarios
│ competencia_id (FK)  │─┘
│ nivel_atual          │
│ nivel_desejado       │
│ data_avaliacao       │
│ avaliado_por (FK)    │────► funcionarios
└──────────────────────┘
```

## 📝 Módulo: Feedback e Avaliações

```
┌──────────────────┐
│ ciclos_feedback  │
│──────────────────│
│ id (PK)          │
│ nome             │◄────┐
│ descricao        │     │
│ tipo             │     │
│ data_inicio      │     │
│ data_fim         │     │
│ status           │     │
│ entidade_id (FK) │     │
│ criado_por (FK)  │     │
└──────────────────┘     │
         │               │ 1:N
         │               │
         ├───────────────┘
         │
         │ 1:N
         │
┌──────────────────┐     │
│perguntas_feedback│     │
│──────────────────│     │
│ id (PK)          │     │
│ ciclo_id (FK)    │─────┘
│ ordem            │◄────┐
│ pergunta         │     │
│ tipo_resposta    │     │
│ obrigatoria      │     │
│ categoria        │     │
└──────────────────┘     │
                         │
                         │ 1:N
                         │
┌──────────────────┐     │
│avaliacoes_feedback│    │
│──────────────────│     │
│ id (PK)          │     │
│ ciclo_id (FK)    │─────┤
│ avaliado_id (FK) │────►│ funcionarios
│ avaliador_id(FK) │────►│ funcionarios
│ tipo             │     │
│ status           │◄────┤
└──────────────────┘     │
         │               │
         │ 1:N           │
         │               │
┌──────────────────┐     │
│respostas_feedback│     │
│──────────────────│     │
│ id (PK)          │     │
│ avaliacao_id(FK) │─────┘
│ pergunta_id (FK) │─────┘
│ resposta_texto   │
│ resposta_numerica│
│ resposta_opcao   │
└──────────────────┘
```

## 📈 Módulo: PDI (Plano de Desenvolvimento Individual)

```
┌──────────────┐
│ funcionarios │
│──────────────│
│ id (PK)      │◄────┐
└──────────────┘     │
                     │ 1:N
                     │
┌──────────────┐     │
│     pdis     │     │
│──────────────│     │
│ id (PK)      │     │
│funcionario_id│─────┘
│ ano          │◄────┐
│ status       │     │
│ aprovado_por │────►│ funcionarios
└──────────────┘     │
         │           │
         │ 1:N       │
         │           │
┌──────────────┐     │
│objetivos_pdi │     │
│──────────────│     │
│ id (PK)      │     │
│ pdi_id (FK)  │─────┘
│ titulo       │◄────┐
│ descricao    │     │
│ especifico   │     │
│ mensuravel   │     │
│ atingivel    │     │
│ relevante    │     │
│ temporal     │     │
│ data_inicio  │     │
│ data_fim     │     │
│ progresso    │     │
│ status       │     │
│competencia_id│────► competencias
└──────────────┘     │
         │           │
         │ 1:N       │
         │           │
┌──────────────────┐ │
│atualizacoes_objetivo│
│──────────────────│ │
│ id (PK)          │ │
│ objetivo_id (FK) │─┘
│funcionario_id(FK)│────► funcionarios
│ data_atualizacao │
│ progresso_anterior│
│ progresso_novo   │
│ descricao        │
└──────────────────┘
```

## 🔔 Módulo: Sistema e Auditoria

```
┌──────────────┐
│   usuarios   │
│──────────────│
│ id (PK)      │◄────┐
└──────────────┘     │
                     │ 1:N
                     │
┌──────────────┐     │
│notificacoes  │     │
│──────────────│     │
│ id (PK)      │     │
│ usuario_id   │─────┤
│ tipo         │     │
│ titulo       │     │
│ mensagem     │     │
│ link         │     │
│ lida         │     │
└──────────────┘     │
                     │
┌──────────────┐     │
│logs_auditoria│     │
│──────────────│     │
│ id (PK)      │     │
│ usuario_id   │─────┘
│ acao         │
│ tabela       │
│ registro_id  │
│ dados_anteriores│
│ dados_novos  │
│ ip_address   │
└──────────────┘
```

## 🔗 Relacionamentos Principais

### 1:N (Um para Muitos)
- **entidades** → **setores** (uma entidade tem vários setores)
- **setores** → **funcionarios** (um setor tem vários funcionários)
- **cargos** → **funcionarios** (um cargo pode ter vários funcionários)
- **funcionarios** → **funcionarios** (gestor → subordinados)
- **areas_competencia** → **competencias** (uma área tem várias competências)
- **ciclos_feedback** → **perguntas_feedback** (um ciclo tem várias perguntas)
- **ciclos_feedback** → **avaliacoes_feedback** (um ciclo tem várias avaliações)
- **avaliacoes_feedback** → **respostas_feedback** (uma avaliação tem várias respostas)
- **funcionarios** → **pdis** (um funcionário tem vários PDIs)
- **pdis** → **objetivos_pdi** (um PDI tem vários objetivos)
- **objetivos_pdi** → **atualizacoes_objetivo** (um objetivo tem várias atualizações)

### N:M (Muitos para Muitos)
- **funcionarios** ↔ **competencias** (através de funcionario_competencias)

### Chaves Estrangeiras Importantes
- `funcionarios.gestor_id` → `funcionarios.id` (auto-relacionamento)
- `funcionarios.usuario_id` → `usuarios.id` (1:1)
- `funcionario_competencias.avaliado_por` → `funcionarios.id`
- `avaliacoes_feedback.avaliado_id` → `funcionarios.id`
- `avaliacoes_feedback.avaliador_id` → `funcionarios.id`
- `pdis.aprovado_por` → `funcionarios.id`
- `objetivos_pdi.competencia_id` → `competencias.id`

## 📐 Índices para Performance

### Índices Primários (PK)
Todas as tabelas possuem `id` como chave primária auto-incremento.

### Índices Únicos
- `entidades.codigo`
- `setores.codigo`
- `cargos.codigo`
- `usuarios.email`
- `funcionarios.usuario_id`
- `funcionarios.matricula`
- `funcionarios.cpf`
- `areas_competencia.nome`
- `funcionario_competencias(funcionario_id, competencia_id)`
- `pdis(funcionario_id, ano)`

### Índices Compostos
- `avaliacoes_feedback(status, tipo)`
- `objetivos_pdi(status, data_inicio, data_fim)`
- `competencias(tipo, ativo)`

### Índices de Busca
- `funcionarios.nome_completo`
- `funcionarios.status`
- `notificacoes.lida`
- `logs_auditoria.created_at`

## 🎨 Legenda

```
┌──────────┐
│  Tabela  │  = Entidade
└──────────┘

───►  = Relacionamento (Foreign Key)
◄───  = Relacionamento Reverso
1:N   = Um para Muitos
N:M   = Muitos para Muitos
(PK)  = Primary Key
(FK)  = Foreign Key
```

## 📊 Estatísticas do Modelo

| Métrica | Valor |
|---------|-------|
| Total de Tabelas | 19 |
| Tabelas de Entidades | 15 |
| Tabelas de Relacionamento | 2 |
| Tabelas de Sistema | 2 |
| Total de Relacionamentos | 35+ |
| Índices Criados | 50+ |
| Views Criadas | 3 |

## 🔍 Views Disponíveis

### vw_funcionarios_completo
Funcionários com todos os dados relacionados (cargo, setor, entidade, gestor).

### vw_matriz_competencias
Matriz completa de competências por funcionário.

### vw_pdis_ativos
PDIs ativos com estatísticas de progresso.

---

**Sistema GCVF - FIERGS**  
*Modelo de Dados Relacional - MariaDB/MySQL*
