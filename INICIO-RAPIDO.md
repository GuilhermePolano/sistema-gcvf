# 🚀 Início Rápido - Sistema GCVF

## ⚡ Acesso Imediato

### 1. Abra o navegador e acesse:
```
http://localhost:3000
```

### 2. Faça login com um dos usuários:

#### 👤 Funcionário
```
Email: joao.silva@fiergs.org.br
Senha: Teste@2024
```

#### 👨‍💼 Coordenador
```
Email: maria.santos@fiergs.org.br
Senha: Teste@2024
```

#### 👨‍💻 Administrador
```
Email: carlos.oliveira@fiergs.org.br
Senha: Teste@2024
```

---

## 🔧 Comandos Úteis

### Verificar se tudo está rodando:
```bash
# MariaDB
docker ps

# Next.js (deve mostrar http://localhost:3000)
# Verifique o terminal onde executou npm run dev
```

### Reiniciar o MariaDB:
```bash
docker restart gcvf-mariadb
```

### Reiniciar o Next.js:
```bash
# Parar: Ctrl+C no terminal
# Iniciar:
npm run dev
```

---

## 📚 Documentação Completa

- **TESTE-AUTENTICACAO.md** - Guia completo de testes
- **RESUMO-IMPLEMENTACAO-AUTH.md** - Detalhes técnicos da implementação
- **database/README.md** - Documentação do banco de dados
- **database/USUARIOS-TESTE.md** - Lista de usuários de teste

---

## ❓ Problemas Comuns

### "Cannot connect to database"
```bash
docker start gcvf-mariadb
```

### "Port 3000 already in use"
```bash
# Encontre o processo usando a porta 3000
netstat -ano | findstr :3000
# Mate o processo ou use outra porta
```

### Página em branco após login
```
1. Abra o Console do navegador (F12)
2. Verifique se há erros JavaScript
3. Limpe o cache e cookies
4. Tente novamente
```

---

## ✅ Tudo Pronto!

O sistema está 100% funcional com:
- ✅ Autenticação completa
- ✅ Banco de dados MariaDB
- ✅ 3 usuários de teste
- ✅ Controle de acesso por perfil
- ✅ Login/Logout funcionando

**Bons testes! 🎉**
