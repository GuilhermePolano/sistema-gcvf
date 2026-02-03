# Arquitetura do Sistema GCVF FIERGS

## 1. Estrutura de Arquivos

```
ferramenta_de_pdi/
├── .claude/                    # Configuracoes do Claude Code
├── .kiro/                      # Especificacoes de design
│   └── specs/                  # Documentos de especificacao
├── .next/                      # Build do Next.js (gerado)
├── .vscode/                    # Configuracoes do VS Code
├── docs/                       # Documentacao do projeto
│   ├── ARQUITETURA.md          # Este arquivo
│   └── fluxo-telas-personas.md # Fluxos e personas
├── node_modules/               # Dependencias (gerado)
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── layout.tsx          # Layout raiz da aplicacao
│   │   ├── page.tsx            # Pagina inicial (redirect)
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Dashboard principal
│   │   ├── login/
│   │   │   └── page.tsx        # Pagina de login
│   │   ├── funcionarios/
│   │   │   ├── page.tsx        # Lista de funcionarios
│   │   │   └── novo/
│   │   │       └── page.tsx    # Cadastro de funcionario
│   │   ├── competencias/
│   │   │   └── page.tsx        # Matriz de competencias
│   │   ├── pdi/
│   │   │   └── page.tsx        # Plano de Desenvolvimento
│   │   ├── feedbacks/
│   │   │   ├── page.tsx        # Lista de feedbacks
│   │   │   └── responder/
│   │   │       └── [id]/
│   │   │           └── page.tsx # Responder feedback
│   │   ├── relatorios/
│   │   │   └── page.tsx        # Relatorios gerenciais
│   │   └── configuracoes/
│   │       └── page.tsx        # Configuracoes do sistema
│   ├── components/
│   │   └── Layout/
│   │       ├── MainLayout.tsx  # Layout com sidebar e header
│   │       ├── Sidebar.tsx     # Menu lateral
│   │       └── Header.tsx      # Cabecalho superior
│   └── styles/
│       └── globals.css         # Estilos globais e design system
├── next.config.js              # Configuracao do Next.js
├── package.json                # Dependencias e scripts
├── tsconfig.json               # Configuracao do TypeScript
└── README.md                   # Documentacao principal
```

## 2. Arquitetura de Componentes

### 2.1 Hierarquia de Layouts

```
RootLayout (src/app/layout.tsx)
├── Paginas Publicas
│   └── LoginPage (sem MainLayout)
└── Paginas Autenticadas
    └── MainLayout
        ├── Header (topo)
        ├── Sidebar (lateral esquerda)
        └── Content (area principal)
```

### 2.2 Componentes de Layout

| Componente | Arquivo | Responsabilidade |
|------------|---------|------------------|
| MainLayout | `Layout/MainLayout.tsx` | Wrapper para paginas autenticadas |
| Sidebar | `Layout/Sidebar.tsx` | Menu lateral com navegacao |
| Header | `Layout/Header.tsx` | Cabecalho com busca e perfil |

### 2.3 Design System

As cores e espacamentos sao definidos em `src/styles/globals.css`:

```css
:root {
  /* Cores Primarias FIERGS */
  --primary-dark: #003366;
  --primary-medium: #0066CC;
  --primary-light: #E6F2FF;

  /* Cores de Status */
  --success: #28A745;
  --warning: #FFC107;
  --error: #DC3545;
  --info: #FD7E14;
}
```

## 3. Regras de Negocio

### 3.1 Ciclo de Vida do Funcionario

1. **Cadastro**: Funcionario e cadastrado no sistema com dados pessoais e profissionais
2. **Competencias**: Define-se a stack tecnica com niveis de 0 a 5
3. **PDI**: Objetivos SMART sao criados com base em gaps identificados
4. **Feedback**: Ciclos periodicos de avaliacao 180/360 graus
5. **Desenvolvimento**: Acompanhamento continuo de evolucao

### 3.2 Niveis de Competencia

| Nivel | Descricao | Significado |
|-------|-----------|-------------|
| 0 | Sem conhecimento | Nunca trabalhou com a tecnologia |
| 1 | Iniciante | Conhecimento teorico basico |
| 2 | Basico | Pode executar tarefas simples com supervisao |
| 3 | Intermediario | Trabalha de forma independente |
| 4 | Avancado | Pode orientar outros profissionais |
| 5 | Expert | Referencia tecnica na organizacao |

### 3.3 Fluxo de Feedback

```
Coordenador cria ciclo → Sistema notifica participantes
→ Funcionarios respondem autoavaliacao → Gestores avaliam
→ Sistema consolida resultados → Reuniao 1:1
→ PDI e atualizado com novos objetivos
```

### 3.4 Estados do PDI

| Status | Cor | Proximo Estado |
|--------|-----|----------------|
| Nao Iniciado | Cinza | Em Andamento |
| Em Andamento | Azul | Em Revisao, Atrasado ou Concluido |
| Atrasado | Vermelho | Em Andamento ou Cancelado |
| Em Revisao | Amarelo | Concluido ou Em Andamento |
| Concluido | Verde | (final) |

### 3.5 Tipos de Avaliacao

- **180 Graus**: Autoavaliacao + Avaliacao do gestor
- **360 Graus**: Autoavaliacao + Gestor + Pares + Subordinados

## 4. Perfis de Usuario e Credenciais de Teste

### 4.1 Funcionario

**Credenciais de Teste:**
- Email: `funcionario@fiergs.org.br`
- Senha: `func123`

**Permissoes:**
- Visualizar e editar proprio perfil
- Gerenciar proprias competencias
- Acessar e atualizar PDI pessoal
- Responder autoavaliacoes
- Visualizar relatorios pessoais

**Menus Visiveis:**
- Dashboard (visao pessoal)
- Meu Perfil
- Meu PDI
- Feedbacks (autoavaliacoes)
- Meu Desempenho

---

### 4.2 Coordenador

**Credenciais de Teste:**
- Email: `coordenador@fiergs.org.br`
- Senha: `coord123`

**Permissoes:**
- Todas do Funcionario
- Cadastrar/gerenciar funcionarios da equipe
- Gerenciar competencias e categorias
- Configurar perguntas de avaliacao
- Visualizar PDIs da equipe
- Acessar relatorios da equipe

**Menus Adicionais:**
- Funcionarios
- Competencias
- Ciclos de Avaliacao
- Relatorios Gerenciais
- Configuracoes

---

### 4.3 Gerente

**Credenciais de Teste:**
- Email: `gerente@fiergs.org.br`
- Senha: `ger123`

**Permissoes:**
- Todas do Coordenador
- Configurar ciclos de feedback
- Visualizar matriz de competencias agregada
- Acessar analytics gerenciais
- Gerenciar multiplas equipes
- Aprovar/revisar PDIs

**Menus Adicionais:**
- Matriz de Skills

---

### 4.4 Administrador

**Credenciais de Teste:**
- Email: `admin@fiergs.org.br`
- Senha: `admin123`

**Permissoes:**
- Acesso total a todas funcionalidades
- Gerenciar usuarios e permissoes
- Acessar dados de todas entidades
- Visualizar logs de auditoria
- Configurar parametros do sistema

**Menus Adicionais:**
- Usuarios
- Auditoria

## 5. Rotas e Permissoes

| Rota | Funcionario | Coordenador | Gerente | Admin |
|------|:-----------:|:-----------:|:-------:|:-----:|
| `/dashboard` | X | X | X | X |
| `/perfil` | X | X | X | X |
| `/pdi` | X | X | X | X |
| `/feedbacks` | X | X | X | X |
| `/relatorios/pessoal` | X | X | X | X |
| `/funcionarios` | - | X | X | X |
| `/funcionarios/novo` | - | X | X | X |
| `/competencias` | - | X | X | X |
| `/ciclos` | - | X | X | X |
| `/relatorios` | - | X | X | X |
| `/configuracoes` | - | X | X | X |
| `/matriz-skills` | - | - | X | X |
| `/usuarios` | - | - | - | X |
| `/auditoria` | - | - | - | X |

## 6. Entidades do Sistema FIERGS

| Sigla | Nome Completo | Descricao |
|-------|---------------|-----------|
| FIERGS | Federacao das Industrias do RS | Entidade principal |
| SESI | Servico Social da Industria | Servicos de saude e educacao |
| SENAI | Servico Nacional de Aprendizagem | Formacao profissional |
| IEL | Instituto Euvaldo Lodi | Inovacao e estagio |
| CIERGS | Centro das Industrias do RS | Representacao industrial |

Cada entidade possui setores proprios (ex: GINFO, RH, Financeiro) com funcionarios e gestores independentes.

## 7. Tecnologias Utilizadas

| Categoria | Tecnologia | Versao |
|-----------|------------|--------|
| Framework | Next.js | 14.x |
| Linguagem | TypeScript | 5.x |
| UI | React | 18.x |
| Estilos | CSS Modules + JSX | - |
| Icones | Lucide React | - |
| Fontes | Roboto (Google Fonts) | - |

## 8. Scripts Disponiveis

```bash
npm run dev      # Servidor de desenvolvimento (localhost:3000)
npm run build    # Build de producao
npm run start    # Executa build de producao
npm run lint     # Verifica qualidade do codigo
```

## 9. Proximos Passos (Roadmap)

### Em Desenvolvimento
- [ ] Integracao com APIs REST
- [ ] Autenticacao JWT/LDAP
- [ ] Testes automatizados
- [ ] PWA (Progressive Web App)

### Planejado
- [ ] Notificacoes push
- [ ] Exportacao PDF de relatorios
- [ ] Dashboard mobile nativo
- [ ] Integracao com sistemas legados FIERGS
