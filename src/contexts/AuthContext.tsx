'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  email: string
  nome: string
  matricula: string
  cargo: string
  setor: string
  entidade: string
  perfil: 'funcionario' | 'coordenador' | 'gerente' | 'administrador'
  funcionario_id: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('gcvf_user')
    const savedToken = localStorage.getItem('gcvf_token')

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, senha: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login')
      }

      // Salvar token e usuário
      localStorage.setItem('gcvf_token', data.token)
      localStorage.setItem('gcvf_user', JSON.stringify(data.user))
      setUser(data.user)

      // Redirecionar para dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('gcvf_token')
    localStorage.removeItem('gcvf_user')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
