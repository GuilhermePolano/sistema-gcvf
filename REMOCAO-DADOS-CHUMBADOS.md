# Remoção de Dados Chumbados (Hardcoded) - Status

## ✅ CONCLUÍDO

### 1. Página de Login (`src/app/login/page.tsx`)
- **Status**: ✅ Concluído
- **Alterações**:
  - Criada API `/api/auth/test-users` que busca usuários do banco de dados
  - Removidos usuários hardcoded (João Silva, Maria Santos, Carlos Oliveira)
  - Implementado carregamento dinâmico de usuários de teste
  - Adicionado loading state durante busca
  - Suporte para múltiplos perfis (Funcionário, Coordenador, Gerente, Administrador)
  - Alinhamento de texto nos inputs corrigido (text-align: left)
  - Labels mais próximos dos campos (gap: 6px)
  - Ícones com melhor espaçamento

### 2. Autenticação
- **Status**: ✅ Já estava usando banco de dados
- Login via API `/api/auth/login` consulta banco
- Senhas com bcrypt
- JWT para sessão

---

## ⚠️ PENDENTE - Páginas com Dados Chumbados

### 3. Página de Funcionários (`src/app/funcionarios/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**:
  ```typescript
  const funcionarios = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@fiergs.org.br', ... },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@fiergs.org.br', ... },
    // ... mais funcionários
  ]
  ```
- **Ação Necessária**:
  - Criar API `/api/funcionarios` para buscar da tabela `funcionarios`
  - Implementar paginação
  - Implementar filtros (nome, setor, entidade, status)

### 4. Página de Visualização de Funcionário (`src/app/funcionarios/[id]/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**: Objeto completo com 60+ campos mockados
- **Ação Necessária**:
  - Criar API `/api/funcionarios/[id]` para buscar dados completos
  - Buscar dados relacionados (competências, idiomas, formação, etc.)

### 5. Página de Edição de Funcionário (`src/app/funcionarios/[id]/editar/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**: FormData com valores iniciais hardcoded
- **Ação Necessária**:
  - Buscar dados do funcionário via API
  - Implementar PUT/PATCH para atualizar dados

### 6. Página de Perfil (`src/app/perfil/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**:
  ```typescript
  const [profileData, setProfileData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@fiergs.org.br',
    // ...
  })
  ```
- **Ação Necessária**:
  - Buscar dados do usuário logado via API
  - Usar `user.id` do AuthContext

### 7. Página de Usuários (`src/app/usuarios/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**: Array de usuários mockados
- **Ação Necessária**:
  - Criar API `/api/usuarios` para buscar da tabela `usuarios`
  - JOIN com `funcionarios` e `perfis_acesso`

### 8. Página de Feedbacks (`src/app/feedbacks/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**:
  - `pendingFeedbacks` array
  - `feedbackCycles` array
- **Ação Necessária**:
  - Criar API `/api/feedbacks/pending` para feedbacks pendentes
  - Criar API `/api/feedbacks/cycles` para ciclos de feedback

### 9. Página de Relatórios (`src/app/relatorios/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**: Array `reports` com relatórios mockados
- **Ação Necessária**:
  - Criar API `/api/relatorios` para buscar relatórios do banco

### 10. Página de Ciclos (`src/app/ciclos/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**: Array `ciclos` com ciclos mockados
- **Ação Necessária**:
  - Criar API `/api/ciclos` para buscar da tabela `ciclos_avaliacao`

### 11. Página de Auditoria (`src/app/auditoria/page.tsx`)
- **Status**: ⚠️ Pendente
- **Dados Chumbados**: Array `logs` com logs mockados
- **Ação Necessária**:
  - Criar API `/api/auditoria` para buscar da tabela `logs_auditoria`
  - Implementar paginação e filtros

---

## 📋 PRIORIDADES SUGERIDAS

### Alta Prioridade (Funcionalidades Críticas)
1. ✅ Login (Concluído)
2. ⚠️ Perfil do usuário
3. ⚠️ Funcionários (listagem e visualização)
4. ⚠️ Feedbacks

### Média Prioridade
5. ⚠️ Usuários
6. ⚠️ Ciclos de avaliação
7. ⚠️ Relatórios

### Baixa Prioridade
8. ⚠️ Auditoria (pode usar dados mockados inicialmente)

---

## 🔧 PADRÃO PARA IMPLEMENTAÇÃO

### Estrutura de API Route
```typescript
// src/app/api/[recurso]/route.ts
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const results = await query(
      `SELECT * FROM tabela LIMIT ? OFFSET ?`,
      [limit, offset]
    )

    return NextResponse.json({ data: results })
  } catch (error) {
    console.error('Erro:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar dados' },
      { status: 500 }
    )
  }
}
```

### Estrutura de Página
```typescript
'use client'
import { useState, useEffect } from 'react'

export default function Page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/recurso')
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Carregando...</div>

  return (
    // Renderizar dados
  )
}
```

---

## 📊 PROGRESSO GERAL

- ✅ Concluído: 2/11 (18%)
- ⚠️ Pendente: 9/11 (82%)

---

## 🎯 PRÓXIMOS PASSOS RECOMENDADOS

1. Implementar API e página de Perfil (usa dados do usuário logado)
2. Implementar API de listagem de Funcionários
3. Implementar API de visualização de Funcionário individual
4. Implementar APIs de Feedbacks
5. Continuar com as demais páginas conforme prioridade

---

**Última Atualização**: 08/02/2026
**Responsável**: Sistema GCVF - FIERGS
