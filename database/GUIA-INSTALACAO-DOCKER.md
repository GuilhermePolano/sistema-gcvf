# 🐳 Guia de Instalação do Banco de Dados via Docker

## ✅ Checklist Pré-Instalação

- [ ] Docker Desktop instalado
- [ ] Docker Desktop **RODANDO** (ícone da baleia verde no system tray)
- [ ] Aguardou 1-2 minutos após abrir o Docker Desktop

---

## 🚀 Passo a Passo

### 1. Abrir Docker Desktop

1. Pressione **Windows + S**
2. Digite: **Docker Desktop**
3. Clique para abrir
4. **AGUARDE** até aparecer: "Docker Desktop is running"
5. Verifique o ícone da baleia no system tray (deve estar verde)

### 2. Abrir PowerShell como Administrador

1. Pressione **Windows + X**
2. Selecione: **Windows PowerShell (Admin)** ou **Terminal (Admin)**
3. Clique em **Sim** na janela de confirmação

### 3. Navegar até a pasta do projeto

```powershell
cd C:\Users\guilherme.correa\Desktop\ferramenta_de_pdi\database
```

### 4. Executar o instalador

```powershell
.\install-docker.bat
```

**OU execute os comandos manualmente:**

```powershell
# Remover container anterior (se existir)
docker stop gcvf-mariadb 2>$null
docker rm gcvf-mariadb 2>$null

# Criar container MariaDB
docker run --name gcvf-mariadb `
  -e MYSQL_ROOT_PASSWORD=root123 `
  -e MYSQL_DATABASE=gcvf_fiergs `
  -p 3306:3306 `
  -d mariadb:latest

# Aguardar 30 segundos
Start-Sleep -Seconds 30

# Executar script de estrutura
Get-Content schema.sql | docker exec -i gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs

# Executar script de dados
Get-Content seed-data.sql | docker exec -i gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs

# Verificar instalação
docker exec gcvf-mariadb mysql -uroot -proot123 -D gcvf_fiergs -e "SELECT COUNT(*) as total_usuarios FROM usuarios;"
```

### 5. Verificar se funcionou

Você deve ver:

```
+----------------+
| total_usuarios |
+----------------+
|              3 |
+----------------+
```

---

## 🎯 Usuários de Teste Criados

Após a instalação, você terá 3 usuários:

### 👤 Funcionário (Desenvolvedor)
- **Email:** joao.silva@fiergs.org.br
- **Senha:** Teste@2024
- **Perfil:** funcionario

### 👥 Coordenador (Gestão)
- **Email:** maria.santos@fiergs.org.br
- **Senha:** Teste@2024
- **Perfil:** coordenador

### 👨‍💼 Administrador (Acesso Total)
- **Email:** carlos.oliveira@fiergs.org.br
- **Senha:** Teste@2024
- **Perfil:** administrador

---

## 🔧 Comandos Úteis do Docker

### Ver containers rodando
```powershell
docker ps
```

### Ver todos os containers (incluindo parados)
```powershell
docker ps -a
```

### Parar o container
```powershell
docker stop gcvf-mariadb
```

### Iniciar o container
```powershell
docker start gcvf-mariadb
```

### Ver logs do container
```powershell
docker logs gcvf-mariadb
```

### Acessar o MySQL dentro do container
```powershell
docker exec -it gcvf-mariadb mysql -uroot -proot123 gcvf_fiergs
```

### Remover o container
```powershell
docker stop gcvf-mariadb
docker rm gcvf-mariadb
```

---

## ❌ Problemas Comuns

### Erro: "Cannot connect to Docker daemon"
**Solução:** Abra o Docker Desktop e aguarde inicializar

### Erro: "Port 3306 is already in use"
**Solução:** Você já tem MySQL/MariaDB rodando. Pare o serviço:
```powershell
# Parar serviço MySQL/MariaDB
net stop MySQL
# ou
net stop MariaDB
```

### Erro: "Container name already in use"
**Solução:** Remova o container existente:
```powershell
docker rm -f gcvf-mariadb
```

---

## 📞 Suporte

Se continuar com problemas:
1. Verifique se o Docker Desktop está atualizado
2. Reinicie o Docker Desktop
3. Reinicie o computador
4. Tente a instalação do MariaDB direto no Windows (sem Docker)

---

**Sistema GCVF - FIERGS**  
*Guia de Instalação do Banco de Dados*
