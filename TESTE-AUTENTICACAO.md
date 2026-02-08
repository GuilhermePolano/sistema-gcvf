# Guia de Teste - Sistema de Autenticação GCVF

## ✅ Status da Implementação

### Concluído:
- ✅ MariaDB instalado e rodando no Docker
- ✅ Schema do banco de dados criado (19 tabelas)
- ✅ Dados de teste inseridos (3 usuários)
- ✅ API de autenticação implementada (`/api/auth/login` e `/api/auth/logout`)
- ✅ AuthContext criado para gerenciar estado de autenticação
- ✅ Componente ProtectedRoute para proteger rotas
- ✅ Todas as páginas atualizadas para usar autenticação real
- ✅ Servidor Next.js rodando em http://localhost:3000

---

## 👥 Usuários de Teste

### 1. Funcionário
- **Email:** joao.silva@fiergs.org.br
- **Senha:** Teste@2024
- **Perfil:** funcionario
- **Acesso:** Dashboard, Meu Perfil, Meu PDI, Feedbacks, Meu Desempenho

### 2. Coordenador
- **Email:** maria.santos@fiergs.org.br
- **Senha:** Teste@2024
- **Perfil:** coordenador
- **Acesso:** Todas as funcionalidades do Funcionário + Funcionários, Competências, Ciclos de Avaliação, Relatórios Gerenciais, Configurações

### 3. Administrador
- **Email:** carlos.oliveira@fiergs.org.br
- **Senha:** Teste@2024
- **Perfil:** administrador
- **Acesso:** Todas as funcionalidades + Usuários, Auditoria, Matriz de Skills

---

## 🧪 Roteiro de Testes

### Teste 1: Login com Funcionário
1. Acesse http://localhost:3000
2. Você será redirecionado para http://localhost:3000/login
3. Faça login com:
   - Email: joao.silva@fiergs.org.br
   - Senha: Teste@2024
4. Verifique que você foi redirecionado para o Dashboard
5. Verifique que o menu lateral mostra apenas as opções permitidas para funcionário
6. Verifique que o nome "João Silva" aparece no cabeçalho

### Teste 2: Controle de Acesso por Perfil
1. Logado como funcionário, tente acessar:
   - ✅ `/dashboard` - Deve funcionar
   - ✅ `/perfil` - Deve funcionar
   - ✅ `/pdi` - Deve funcionar
   - ✅ `/feedbacks` - Deve funcionar
   - ❌ `/funcionarios` - Deve redirecionar para dashboard
   - ❌ `/usuarios` - Deve redirecionar para dashboard
   - ❌ `/auditoria` - Deve redirecionar para dashboard

### Teste 3: Logout
1. Clique no botão de logout no cabeçalho (ícone de sair)
2. Verifique que você foi redirecionado para a página de login
3. Tente acessar `/dashboard` diretamente
4. Verifique que você é redirecionado para `/login`

### Teste 4: Login com Coordenador
1. Faça login com:
   - Email: maria.santos@fiergs.org.br
   - Senha: Teste@2024
2. Verifique que o menu lateral mostra mais opções que o funcionário
3. Acesse `/funcionarios` - Deve funcionar
4. Acesse `/competencias` - Deve funcionar
5. Tente acessar `/usuarios` - Deve redirecionar para dashboard (apenas admin)

### Teste 5: Login com Administrador
1. Faça logout
2. Faça login com:
   - Email: carlos.oliveira@fiergs.org.br
   - Senha: Teste@2024
3. Verifique que o menu lateral mostra TODAS as opções
4. Acesse `/usuarios` - Deve funcionar
5. Acesse `/auditoria` - Deve funcionar
6. Acesse `/matriz-skills` - Deve funcionar

### Teste 6: Troca de Usuários
1. Faça logout do administrador
2. Faça login como funcionário
3. Verifique que o menu mudou
4. Faça logout
5. Faça login como coordenador
6. Verifique que o menu mudou novamente

### Teste 7: Senha Incorreta
1. Tente fazer login com:
   - Email: joao.silva@fiergs.org.br
   - Senha: SenhaErrada123
2. Verifique que aparece mensagem de erro
3. Verifique que você permanece na página de login

### Teste 8: Email Inexistente
1. Tente fazer login com:
   - Email: usuario.inexistente@fiergs.org.br
   - Senha: Teste@2024
2. Verifique que aparece mensagem de erro

---

## 🔧 Comandos Úteis

### Verificar se o MariaDB está rodando:
```bash
docker ps
```

### Ver logs do MariaDB:
```bash
docker logs gcvf-mariadb
```

### Acessar o MariaDB via linha de comando:
```bash
docker exec -it gcvf-mariadb mariadb -uroot -proot123 gcvf_fiergs
```

### Verificar usuários no banco:
```bash
docker exec gcvf-mariadb mariadb -uroot -proot123 -D gcvf_fiergs -e "SELECT id, email, perfil FROM usuarios;"
```

### Parar o MariaDB:
```bash
docker stop gcvf-mariadb
```

### Iniciar o MariaDB:
```bash
docker start gcvf-mariadb
```

### Reiniciar o servidor Next.js:
```bash
# Parar: Ctrl+C no terminal onde está rodando
# Iniciar:
npm run dev
```

---

## 📊 Estrutura de Autenticação

### Fluxo de Login:
1. Usuário acessa qualquer página
2. `ProtectedRoute` verifica se há usuário autenticado
3. Se não houver, redireciona para `/login`
4. Usuário preenche email e senha
5. Frontend chama `/api/auth/login`
6. API verifica credenciais no banco de dados
7. Se válido, cria token JWT e retorna dados do usuário
8. `AuthContext` armazena usuário no estado
9. Usuário é redirecionado para `/dashboard`

### Fluxo de Logout:
1. Usuário clica no botão de logout
2. Frontend chama `/api/auth/logout`
3. `AuthContext` limpa o estado do usuário
4. Usuário é redirecionado para `/login`

### Proteção de Rotas:
- Todas as páginas (exceto `/login`) estão envolvidas em `<ProtectedRoute>`
- `ProtectedRoute` verifica se há usuário autenticado
- Se não houver, redireciona para `/login`
- Se houver `requiredRoles`, verifica se o perfil do usuário está na lista
- Se não estiver, redireciona para `/dashboard`

---

## 🐛 Troubleshooting

### Problema: "Cannot connect to database"
**Solução:** Verifique se o MariaDB está rodando:
```bash
docker ps
docker start gcvf-mariadb
```

### Problema: "Invalid credentials"
**Solução:** Verifique se os usuários foram criados:
```bash
docker exec gcvf-mariadb mariadb -uroot -proot123 -D gcvf_fiergs -e "SELECT email FROM usuarios;"
```

### Problema: Redirecionamento infinito
**Solução:** Limpe o cache do navegador e cookies, depois tente novamente

### Problema: Página em branco após login
**Solução:** Verifique o console do navegador (F12) para erros JavaScript

---

## ✨ Próximos Passos

1. ✅ Implementar refresh token para sessões longas
2. ✅ Adicionar "Lembrar-me" no login
3. ✅ Implementar recuperação de senha
4. ✅ Adicionar log de auditoria de logins
5. ✅ Implementar timeout de sessão
6. ✅ Adicionar autenticação de dois fatores (2FA)
7. ✅ Integrar com dados reais dos funcionários
8. ✅ Implementar permissões granulares por funcionalidade

---

## 📝 Notas Importantes

- As senhas são armazenadas com hash bcrypt (nunca em texto plano)
- Os tokens JWT expiram em 7 dias
- A conexão com o banco usa pool de conexões para melhor performance
- Todos os endpoints de API validam a autenticação
- O sistema suporta múltiplas entidades FIERGS (FIERGS, SESI, SENAI, IEL)

---

**Data de Criação:** 07/02/2026
**Versão:** 1.0
**Status:** ✅ Pronto para Testes
