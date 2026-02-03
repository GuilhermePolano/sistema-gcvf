# Fluxo de Telas e Personas - Sistema GCVF

## 1. Personas e Permissoes de Acesso

### 1.1 Funcionario
**Descricao:** Colaborador individual que utiliza o sistema para gerenciar seu proprio desenvolvimento profissional.

**Permissoes:**
- Visualizar e editar seu proprio perfil
- Gerenciar suas competencias tecnicas (stack tecnologica)
- Acessar e atualizar seu PDI pessoal
- Responder autoavaliacoes de feedback
- Visualizar relatorios do proprio desempenho

**Menus Visiveis:**
| Menu | Acesso |
|------|--------|
| Dashboard | Visao pessoal |
| Meu Perfil | Proprio perfil |
| Meu PDI | Objetivos pessoais |
| Feedbacks | Autoavaliacoes |

---

### 1.2 Coordenador
**Descricao:** Lider de equipe responsavel pela gestao direta de um grupo de funcionarios dentro de um setor.

**Permissoes:**
- Todas as permissoes do Funcionario
- Cadastrar e gerenciar funcionarios da sua equipe
- Gerenciar competencias e categorias de avaliacao
- Configurar perguntas e questionarios
- Visualizar PDIs da equipe
- Acessar relatorios da equipe

**Menus Visiveis:**
| Menu | Acesso |
|------|--------|
| Dashboard | Visao de equipe |
| Funcionarios | Cadastro e gestao |
| Competencias | Categorias e skills |
| Meu PDI | Objetivos pessoais |
| Feedbacks | Ciclos e respostas |
| Relatorios | Equipe |
| Configuracoes | Perguntas e categorias |

---

### 1.3 Gerente
**Descricao:** Gestor com visao ampla de multiplas equipes ou setores, responsavel por decisoes estrategicas de desenvolvimento.

**Permissoes:**
- Todas as permissoes do Coordenador
- Configurar ciclos de feedback (180 e 360 graus)
- Visualizar matriz de competencias agregada
- Acessar analytics e dashboards gerenciais
- Gerenciar multiplas equipes
- Aprovar e revisar PDIs

**Menus Visiveis:**
| Menu | Acesso |
|------|--------|
| Dashboard | Visao gerencial |
| Funcionarios | Todas as equipes |
| Competencias | Matriz completa |
| Meu PDI | Objetivos pessoais |
| Feedbacks | Configurar ciclos |
| Relatorios | Analytics gerencial |
| Configuracoes | Sistema |

---

### 1.4 Administrador Global
**Descricao:** Usuario com acesso irrestrito a todas as funcionalidades e dados do sistema, responsavel pela administracao geral.

**Permissoes:**
- Acesso total a todas as funcionalidades
- Gerenciar usuarios e permissoes
- Acessar dados de todas as entidades (FIERGS, SESI, SENAI, IEL, CIERGS)
- Visualizar logs de auditoria
- Configurar parametros do sistema
- Gerenciar integracao entre entidades

**Menus Visiveis:**
| Menu | Acesso |
|------|--------|
| Dashboard | Visao global |
| Funcionarios | Todas as entidades |
| Competencias | Gestao global |
| Meu PDI | Objetivos pessoais |
| Feedbacks | Todos os ciclos |
| Relatorios | Consolidado |
| Configuracoes | Administracao total |
| Usuarios | Gestao de acessos |
| Auditoria | Logs do sistema |

---

## 2. Fluxo de Telas

### 2.1 Fluxo de Autenticacao

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login     │────▶│  Validacao  │────▶│  Dashboard  │
│             │     │  de Acesso  │     │ (por perfil)│
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  Esqueci    │     │   Erro de   │
│   Senha     │     │   Acesso    │
└─────────────┘     └─────────────┘
```

### 2.2 Fluxo Principal - Funcionario

```
┌─────────────────────────────────────────────────────────────┐
│                      DASHBOARD PESSOAL                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Status   │  │PDI Ativo │  │ Proximo  │  │Competencias│   │
│  │ Pessoal  │  │          │  │ Feedback │  │           │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
    │ Perfil  │   │   PDI   │   │Feedback │   │  Stack  │
    │ Pessoal │   │ Detalhe │   │Responder│   │ Tecnica │
    └─────────┘   └─────────┘   └─────────┘   └─────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
    │ Editar  │   │  Novo   │   │Resultado│   │Adicionar│
    │ Dados   │   │Objetivo │   │Feedback │   │  Skill  │
    └─────────┘   └─────────┘   └─────────┘   └─────────┘
```

### 2.3 Fluxo Principal - Coordenador/Gerente

```
┌─────────────────────────────────────────────────────────────┐
│                     DASHBOARD GERENCIAL                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Equipe  │  │PDIs Ativos│  │Feedbacks │  │ Alertas  │    │
│  │  (qtd)   │  │  (qtd)   │  │Pendentes │  │          │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│Funcionarios │  │   Matriz    │  │   Ciclos    │  │  Relatorios │
│   Lista     │  │Competencias │  │  Feedback   │  │   Equipe    │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
      │                │                │                │
      ▼                ▼                ▼                ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Detalhe   │  │   Filtrar   │  │ Novo Ciclo  │  │   Exportar  │
│ Funcionario │  │   Skills    │  │             │  │    PDF      │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
      │                                   │
      ▼                                   ▼
┌─────────────┐                    ┌─────────────┐
│  Cadastrar  │                    │  Selecionar │
│    Novo     │                    │Participantes│
└─────────────┘                    └─────────────┘
```

### 2.4 Fluxo de Feedback Completo

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Coordenador │     │   Sistema    │     │ Funcionario  │
│ Cria Ciclo   │────▶│Envia Convite │────▶│   Recebe     │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Relatorio   │◀────│  Consolida   │◀────│  Responde    │
│  Gerado      │     │  Respostas   │     │Autoavaliacao │
└──────────────┘     └──────────────┘     └──────────────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│   Reuniao    │────▶│   PDI        │
│    1:1       │     │  Atualizado  │
└──────────────┘     └──────────────┘
```

### 2.5 Fluxo de PDI

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Resultado   │     │   Criar      │     │  Definir     │
│  Feedback    │────▶│  Objetivo    │────▶│   Acoes      │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Objetivo    │◀────│  Revisar     │◀────│  Executar    │
│  Concluido   │     │  Progresso   │     │   Acoes      │
└──────────────┘     └──────────────┘     └──────────────┘
       │
       ▼
┌──────────────┐
│   Proximo    │
│  Objetivo    │
└──────────────┘
```

---

## 3. Estrutura de Navegacao

### 3.1 Menu Lateral (Sidebar)

```
┌────────────────────────────────────┐
│  [Logo FIERGS]                     │
│  Sistema GCVF                      │
├────────────────────────────────────┤
│                                    │
│  PRINCIPAL                         │
│  ├── Dashboard                     │
│  └── Meu Perfil (*)               │
│                                    │
│  GESTAO DE PESSOAS                 │
│  ├── Funcionarios (**)            │
│  ├── Competencias (**)            │
│  └── Matriz de Skills (**)        │
│                                    │
│  DESENVOLVIMENTO                   │
│  ├── Meu PDI                      │
│  ├── Feedbacks                    │
│  └── Ciclos de Avaliacao (**)     │
│                                    │
│  RELATORIOS                        │
│  ├── Meus Relatorios              │
│  └── Relatorios Gerenciais (**)   │
│                                    │
│  SISTEMA (***)                     │
│  ├── Configuracoes                │
│  ├── Usuarios                     │
│  └── Auditoria                    │
│                                    │
├────────────────────────────────────┤
│  [Avatar] Nome do Usuario          │
│  Cargo - Entidade                  │
│  [Sair]                            │
└────────────────────────────────────┘

Legenda:
(*)   Todos os perfis
(**)  Coordenador, Gerente, Administrador
(***) Apenas Administrador
```

---

## 4. Entidades do Sistema

O sistema suporta multiplas entidades do Sistema FIERGS:

| Entidade | Descricao |
|----------|-----------|
| FIERGS | Federacao das Industrias do RS |
| SESI | Servico Social da Industria |
| SENAI | Servico Nacional de Aprendizagem Industrial |
| IEL | Instituto Euvaldo Lodi |
| CIERGS | Centro das Industrias do RS |

Cada entidade possui:
- Setores proprios (ex: GINFO, RH, Financeiro)
- Funcionarios vinculados
- Gestores responsaveis
- Ciclos de feedback independentes

---

## 5. Niveis de Competencia

Escala padrao para avaliacao de competencias tecnicas:

| Nivel | Descricao | Indicador Visual |
|-------|-----------|------------------|
| 0 | Sem conhecimento | ○○○○○ |
| 1 | Iniciante | ●○○○○ |
| 2 | Basico | ●●○○○ |
| 3 | Intermediario | ●●●○○ |
| 4 | Avancado | ●●●●○ |
| 5 | Expert/Referencia | ●●●●● |

---

## 6. Estados de PDI

| Status | Cor | Descricao |
|--------|-----|-----------|
| Nao Iniciado | Cinza | Objetivo criado, sem acoes executadas |
| Em Andamento | Azul | Acoes em execucao |
| Atrasado | Vermelho | Prazo ultrapassado |
| Em Revisao | Amarelo | Aguardando validacao do gestor |
| Concluido | Verde | Objetivo alcancado |

---

## 7. Tipos de Feedback

### 7.1 Feedback 180 Graus
- Autoavaliacao do funcionario
- Avaliacao do gestor direto

### 7.2 Feedback 360 Graus
- Autoavaliacao do funcionario
- Avaliacao do gestor direto
- Avaliacao de pares (colegas)
- Avaliacao de subordinados (se aplicavel)

---

## 8. Periodicidade de Ciclos

| Periodo | Frequencia | Uso Recomendado |
|---------|------------|-----------------|
| Mensal | 12x/ano | Acompanhamento intensivo |
| Bimestral | 6x/ano | Equipes em formacao |
| Trimestral | 4x/ano | Padrao recomendado |
| Semestral | 2x/ano | Equipes estaveis |
| Anual | 1x/ano | Avaliacao formal |
