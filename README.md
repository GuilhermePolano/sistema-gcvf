# Sistema GCVF - FIERGS

Sistema de Gestão de Ciclo de Vida do Funcionário desenvolvido para a FIERGS (Federação das Indústrias do Estado do Rio Grande do Sul).

## 🎯 Sobre o Projeto

O Sistema GCVF é uma plataforma web responsiva para gerenciar o ciclo completo de vida dos funcionários, incluindo:

- **Cadastro de Funcionários**: Gestão completa de dados pessoais e profissionais
- **Competências Técnicas**: Matriz de habilidades com níveis de proficiência (0-5)
- **PDI (Plano de Desenvolvimento Individual)**: Acompanhamento de objetivos SMART
- **Ciclos de Feedback**: Avaliações 180° e 360° com periodicidade flexível
- **Relatórios e Analytics**: Dashboards e métricas para tomada de decisão

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Estilização**: CSS Modules com variáveis CSS customizadas
- **Ícones**: Lucide React
- **Arquitetura**: Componentes reutilizáveis e design system
- **Responsividade**: Mobile-first design

## 🎨 Design System

### Cores Principais (Identidade FIERGS)
- **Azul Primário**: `#003366` (azul institucional)
- **Azul Secundário**: `#0066CC` (azul médio)
- **Azul Claro**: `#E6F2FF` (backgrounds)

### Cores de Status
- **Sucesso**: `#28A745`
- **Atenção**: `#FFC107`
- **Erro**: `#DC3545`
- **Info**: `#FD7E14`

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para executar

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd sistema-gcvf-fiergs
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linting do código

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── dashboard/         # Dashboard principal
│   ├── funcionarios/      # Gestão de funcionários
│   ├── competencias/      # Matriz de competências
│   ├── login/            # Página de login
│   └── layout.tsx        # Layout raiz
├── components/           # Componentes reutilizáveis
│   └── Layout/          # Componentes de layout
│       ├── Header.tsx   # Cabeçalho da aplicação
│       ├── Sidebar.tsx  # Menu lateral
│       └── MainLayout.tsx # Layout principal
└── styles/
    └── globals.css      # Estilos globais e design system
```

## 👥 Perfis de Usuário

O sistema suporta 4 perfis diferentes com permissões específicas:

### 1. **Funcionário**
- Visualizar próprios dados e competências
- Realizar autoavaliações
- Acompanhar PDI pessoal
- Visualizar feedbacks recebidos

### 2. **Coordenador**
- Todas as funcionalidades do Funcionário
- Gerenciar funcionários da equipe
- Configurar ciclos de feedback
- Criar e editar perguntas de avaliação
- Acesso restrito à própria entidade/setor

### 3. **Gerente**
- Todas as funcionalidades do Coordenador
- Visão ampliada de múltiplas equipes
- Relatórios agregados
- Aprovações de PDIs

### 4. **Administrador Global**
- Acesso irrestrito a todas as funcionalidades
- Gerenciar usuários e perfis
- Configurações globais do sistema
- Auditoria completa
- Visão de todas as entidades

## 🖥️ Telas Principais

### 1. **Dashboard**
- Métricas pessoais (status, PDI, próximo feedback)
- Competências técnicas com níveis visuais
- Lista de ações pendentes

### 2. **Gestão de Funcionários**
- Lista com filtros avançados
- Cards informativos com dados principais
- Ações rápidas (visualizar, editar)

### 3. **Matriz de Competências**
- Visualização em grade das habilidades da equipe
- Filtros por entidade, setor, nível, área
- Estatísticas e identificação de gaps
- Exportação de relatórios

### 4. **Login**
- Interface moderna com identidade FIERGS
- Validação em tempo real
- Opções de recuperação de senha
- Informações de suporte

## 🎯 Funcionalidades Implementadas

### ✅ Concluído
- [x] Sistema de design com cores FIERGS
- [x] Layout responsivo (Header + Sidebar)
- [x] Dashboard do funcionário
- [x] Lista de funcionários com filtros
- [x] Matriz de competências interativa
- [x] Página de login completa
- [x] Navegação por perfis de usuário
- [x] Componentes reutilizáveis

### 🚧 Em Desenvolvimento
- [ ] Formulário de cadastro de funcionário
- [ ] Configuração de ciclos de feedback
- [ ] Formulários de autoavaliação
- [ ] Dashboard de PDI
- [ ] Relatórios de feedback
- [ ] Integração com APIs
- [ ] Autenticação real
- [ ] Testes automatizados

## 🔧 Personalização

### Alterando Cores
As cores podem ser modificadas no arquivo `src/styles/globals.css` nas variáveis CSS:

```css
:root {
  --primary-dark: #003366;    /* Azul FIERGS */
  --primary-medium: #0066CC;  /* Azul médio */
  --primary-light: #E6F2FF;   /* Azul claro */
  /* ... outras variáveis */
}
```

### Adicionando Novas Telas
1. Crie um novo diretório em `src/app/`
2. Adicione o arquivo `page.tsx`
3. Use o `MainLayout` para consistência
4. Adicione a rota no `Sidebar.tsx`

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px  
- **Mobile**: < 768px

### Adaptações Mobile
- Menu lateral vira hambúrguer
- Tabelas com scroll horizontal
- Cards empilhados verticalmente
- Botões em largura total

## 🔒 Segurança

### Implementações Planejadas
- Autenticação JWT
- Integração com Active Directory/LDAP
- Controle de acesso baseado em papéis (RBAC)
- Criptografia de dados sensíveis
- Logs de auditoria
- Conformidade com LGPD

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da FIERGS - Federação das Indústrias do Estado do Rio Grande do Sul.

## 📞 Suporte

Para suporte técnico:
- **Email**: suporte.ti@fiergs.org.br
- **Telefone**: (51) 3347-8800

---

**Desenvolvido com ❤️ para a FIERGS**