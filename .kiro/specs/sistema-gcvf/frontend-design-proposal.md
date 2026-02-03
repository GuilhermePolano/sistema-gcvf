# Proposta de Design Frontend - Sistema GCVF

## Estrutura Geral da Interface

### Layout Principal
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo FIERGS + Título Sistema + Perfil Usuário      │
├─────────────────────────────────────────────────────────────┤
│ Sidebar │                Main Content                       │
│ Menu    │                                                   │
│ - Home  │  ┌─────────────────────────────────────────────┐ │
│ - Func. │  │           Breadcrumb                        │ │
│ - PDI   │  ├─────────────────────────────────────────────┤ │
│ - Feed. │  │                                             │ │
│ - Rel.  │  │            Conteúdo Principal               │ │
│ - Conf. │  │                                             │ │
│         │  │                                             │ │
│         │  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Telas Principais

### 1. Dashboard Principal
**Objetivo**: Visão geral do sistema para cada perfil de usuário

**Elementos:**
- **Header com métricas**: Cards com números principais (funcionários ativos, PDIs em andamento, feedbacks pendentes)
- **Gráficos de status**: Pizza/barras mostrando distribuição de níveis, tecnologias mais usadas
- **Lista de ações pendentes**: Feedbacks para completar, PDIs vencendo
- **Acesso rápido**: Botões para ações mais comuns

**Cores aplicadas:**
- Background: #F5F5F5
- Cards: #FFFFFF com sombra sutil
- Métricas positivas: #28A745
- Alertas: #FFC107
- Ações pendentes: #003366

### 2. Cadastro/Edição de Funcionário
**Objetivo**: Formulário completo para gestão de dados do funcionário

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Dados Básicos                                    [Salvar]   │
├─────────────────────────────────────────────────────────────┤
│ Nome: [________________] Cargo: [________________]          │
│ Nível: [Dropdown ▼] Área: [Técnico/Negócios ▼]           │
│ Entidade: [FIERGS ▼] Setor: [GINFO ▼]                     │
│ Email: [________________] Telefone: [________________]      │
├─────────────────────────────────────────────────────────────┤
│ Stacks Tecnológicas                           [+ Adicionar] │
├─────────────────────────────────────────────────────────────┤
│ JavaScript    [●●●○○] Nível 3  [Editar] [Remover]         │
│ React         [●●○○○] Nível 2  [Editar] [Remover]         │
│ Node.js       [●●●●○] Nível 4  [Editar] [Remover]         │
└─────────────────────────────────────────────────────────────┘
```

**Elementos específicos:**
- **Campos obrigatórios**: Marcados com asterisco vermelho
- **Validação em tempo real**: Bordas vermelhas para erros
- **Níveis de conhecimento**: Visualização com círculos preenchidos (0-5)
- **Categorização de stacks**: Agrupadas por Frontend, Backend, DevOps, etc.

### 3. Matriz de Competências (Skills Matrix)
**Objetivo**: Visualização consolidada das competências da equipe

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Filtros: Entidade [FIERGS ▼] Setor [Todos ▼] Nível [▼]    │
├─────────────────────────────────────────────────────────────┤
│           │JavaScript│React│Node.js│Python│Docker│...      │
├───────────┼──────────┼─────┼───────┼──────┼──────┼─────────┤
│João Silva │    ●●●   │ ●●  │  ●●●● │  ●   │  ●●● │         │
│Maria Souza│    ●●●●● │ ●●● │   ●●  │ ●●●● │   ●  │         │
│Pedro Lima │    ●●    │ ●●● │  ●●●● │  ●●  │ ●●●● │         │
└─────────────────────────────────────────────────────────────┘
```

**Elementos específicos:**
- **Heatmap de cores**: Verde (alto), amarelo (médio), vermelho (baixo)
- **Filtros avançados**: Por entidade, setor, cargo, tecnologia
- **Exportação**: PDF/Excel para relatórios
- **Drill-down**: Clique para ver detalhes do funcionário

### 4. Configuração de Feedback
**Objetivo**: Setup de ciclos de avaliação 180°/360°

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Novo Ciclo de Feedback                          [Criar]     │
├─────────────────────────────────────────────────────────────┤
│ Nome: [________________] Tipo: [360° ▼]                     │
│ Periodicidade: [Trimestral ▼] Início: [01/04/2026]        │
│ Participantes: [Selecionar Funcionários...]                │
├─────────────────────────────────────────────────────────────┤
│ Categorias de Perguntas                      [+ Adicionar]  │
├─────────────────────────────────────────────────────────────┤
│ ☑ Competências Técnicas (12 perguntas)                     │
│ ☑ Habilidades Comportamentais (8 perguntas)                │
│ ☑ Liderança (5 perguntas)                                  │
│ ☐ Inovação (6 perguntas)                                   │
└─────────────────────────────────────────────────────────────┘
```

### 5. Formulário de Autoavaliação
**Objetivo**: Interface para funcionários preencherem feedback

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Autoavaliação - Q1 2026                    Progresso: 60%  │
├─────────────────────────────────────────────────────────────┤
│ Competências Técnicas (3 de 5 respondidas)                 │
├─────────────────────────────────────────────────────────────┤
│ Como você avalia seu conhecimento em JavaScript?            │
│ ○ Iniciante ○ Básico ● Intermediário ○ Avançado ○ Expert   │
│                                                             │
│ Descreva um projeto onde aplicou essa tecnologia:          │
│ [_____________________________________________]             │
│ [_____________________________________________]             │
├─────────────────────────────────────────────────────────────┤
│                              [Anterior] [Próxima] [Salvar] │
└─────────────────────────────────────────────────────────────┘
```

### 6. Dashboard de PDI
**Objetivo**: Acompanhamento do Plano de Desenvolvimento Individual

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Meu PDI - João Silva                                        │
├─────────────────────────────────────────────────────────────┤
│ Objetivo 1: Certificação AWS                    [75%] ●●●○  │
│ Prazo: 30/06/2026 | Status: Em andamento                   │
│ Ações: ☑ Curso online ☑ Projeto prático ☐ Prova           │
├─────────────────────────────────────────────────────────────┤
│ Objetivo 2: Liderança de Equipe                 [25%] ●○○○  │
│ Prazo: 31/12/2026 | Status: Iniciado                       │
│ Ações: ☑ Workshop ☐ Mentoria ☐ Projeto piloto             │
├─────────────────────────────────────────────────────────────┤
│                                          [+ Novo Objetivo] │
└─────────────────────────────────────────────────────────────┘
```

### 7. Relatórios de Feedback
**Objetivo**: Visualização consolidada dos resultados de avaliação

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Relatório de Feedback - João Silva - Q1 2026               │
├─────────────────────────────────────────────────────────────┤
│ Pontos Fortes                    │ Áreas de Melhoria        │
│ • Conhecimento técnico sólido    │ • Comunicação em público │
│ • Proatividade                   │ • Gestão de tempo        │
│ • Trabalho em equipe             │ • Documentação           │
├──────────────────────────────────┼───────────────────────────┤
│ Acordos e Planos de Ação                                    │
│ 1. Participar de curso de oratória até maio/2026           │
│ 2. Implementar metodologia de documentação no projeto      │
│ 3. Usar ferramenta de gestão de tempo por 3 meses         │
└─────────────────────────────────────────────────────────────┘
```

## Componentes Reutilizáveis

### Paleta de Cores Aplicada
```css
:root {
  /* Cores Primárias FIERGS */
  --primary-dark: #003366;
  --primary-medium: #0066CC;
  --primary-light: #E6F2FF;
  
  /* Cores Neutras */
  --gray-900: #333333;
  --gray-600: #666666;
  --gray-100: #F5F5F5;
  --white: #FFFFFF;
  
  /* Cores de Status */
  --success: #28A745;
  --warning: #FFC107;
  --error: #DC3545;
  --info: #FD7E14;
}
```

### Componentes Base

#### Botões
```css
.btn-primary {
  background: var(--primary-dark);
  color: white;
  border-radius: 4px;
  padding: 12px 24px;
}

.btn-secondary {
  border: 1px solid var(--primary-dark);
  color: var(--primary-dark);
  background: transparent;
}
```

#### Cards
```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 24px;
}
```

#### Indicadores de Nível
```css
.skill-level {
  display: flex;
  gap: 4px;
}

.skill-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--gray-100);
}

.skill-dot.filled {
  background: var(--primary-medium);
}
```

## Responsividade

### Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Adaptações Mobile
- **Sidebar**: Converte para menu hambúrguer
- **Tabelas**: Scroll horizontal ou cards empilhados
- **Formulários**: Campos em largura total
- **Gráficos**: Versões simplificadas

## Acessibilidade

### Diretrizes WCAG
- **Contraste**: Mínimo 4.5:1 para textos
- **Navegação**: Suporte completo por teclado
- **Screen readers**: Labels e ARIA adequados
- **Foco**: Indicadores visuais claros

### Implementação
- **Focus trap**: Em modais e dropdowns
- **Skip links**: Para navegação rápida
- **Alt texts**: Para todas as imagens
- **Semantic HTML**: Estrutura correta

Esta proposta mantém a identidade visual da FIERGS enquanto oferece uma experiência moderna e eficiente para o sistema GCVF. As cores azuis institucionais criam confiança e profissionalismo, enquanto os elementos de interface são otimizados para as tarefas específicas de gestão de RH e desenvolvimento de funcionários.