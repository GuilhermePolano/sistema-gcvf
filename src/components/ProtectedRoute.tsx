'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: ('funcionario' | 'coordenador' | 'gerente' | 'administrador')[]
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!loading && user && requiredRoles && !requiredRoles.includes(user.perfil)) {
      router.push('/dashboard')
    }
  }, [user, loading, requiredRoles, router])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#F3F4F6'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#003366'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E6F2FF',
            borderTop: '4px solid #003366',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p>Carregando...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRoles && !requiredRoles.includes(user.perfil)) {
    return null
  }

  return <>{children}</>
}
