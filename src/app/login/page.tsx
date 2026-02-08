'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, senha)
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Logo e Título */}
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-fiergs">FIERGS</div>
              <div className="system-title">Sistema GCVF</div>
            </div>
            <p className="login-subtitle">
              Gestão de Ciclo de Vida do Funcionário
            </p>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message general-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Corporativo
              </label>
              <div className="input-container">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="seu.email@fiergs.org.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <div className="input-container">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  className="form-input"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary btn-login ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Entrando...
                </>
              ) : (
                'Entrar no Sistema'
              )}
            </button>
          </form>

          {/* Usuários de Teste */}
          <div className="test-users-section">
            <p className="test-users-title">👤 Usuários de Teste:</p>
            <div className="test-users-list">
              <div className="test-user-item">
                <strong>Funcionário:</strong>
                <code>joao.silva@fiergs.org.br</code>
                <code>Teste@2024</code>
              </div>
              <div className="test-user-item">
                <strong>Coordenador:</strong>
                <code>maria.santos@fiergs.org.br</code>
                <code>Teste@2024</code>
              </div>
              <div className="test-user-item">
                <strong>Administrador:</strong>
                <code>carlos.oliveira@fiergs.org.br</code>
                <code>Teste@2024</code>
              </div>
            </div>
          </div>

          {/* Informações de Suporte */}
          <div className="login-footer">
            <p className="support-text">
              Problemas para acessar? Entre em contato com o suporte:
            </p>
            <p className="support-contact">
              <strong>suporte.ti@fiergs.org.br</strong> | (51) 3347-8800
            </p>
          </div>
        </div>

        {/* Informações da Empresa */}
        <div className="company-info">
          <h2>Sistema de Gestão de Pessoas</h2>
          <p>
            Plataforma integrada para gerenciamento do ciclo de vida dos 
            funcionários, desenvolvimento individual e processos de feedback.
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <span>Gestão de Funcionários</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <span>Matriz de Competências</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <span>Planos de Desenvolvimento</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📝</div>
              <span>Ciclos de Feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-page-footer">
        <p>© 2026 FIERGS - Federação das Indústrias do Estado do Rio Grande do Sul</p>
        <p>Todos os direitos reservados</p>
      </footer>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--white) 100%);
          display: flex;
          flex-direction: column;
        }

        .login-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
          gap: var(--spacing-2xl);
        }

        .login-card {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: var(--spacing-2xl);
          width: 100%;
          max-width: 420px;
          border: 1px solid var(--gray-200);
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .logo-fiergs {
          background-color: var(--primary-dark);
          color: var(--white);
          padding: 12px 20px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 1.25rem;
        }

        .system-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .login-subtitle {
          color: var(--gray-600);
          font-size: 0.875rem;
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--gray-400);
          z-index: 1;
        }

        .form-input {
          padding-left: 44px;
          padding-right: 44px;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: var(--gray-400);
          cursor: pointer;
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color 0.2s ease;
        }

        .password-toggle:hover {
          color: var(--gray-600);
        }

        .password-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .btn-login {
          width: 100%;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          margin-top: var(--spacing-md);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
        }

        .btn-login.loading {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          color: var(--error);
          font-size: 0.875rem;
        }

        .general-error {
          background-color: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: var(--radius-sm);
          padding: var(--spacing-md);
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .test-users-section {
          margin-top: var(--spacing-2xl);
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        .test-users-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
          margin-bottom: var(--spacing-md);
        }

        .test-users-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .test-user-item {
          background-color: var(--gray-50);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .test-user-item strong {
          color: var(--gray-700);
          font-size: 0.8125rem;
        }

        .test-user-item code {
          background-color: var(--white);
          padding: 4px 8px;
          border-radius: 3px;
          border: 1px solid var(--gray-200);
          font-family: 'Courier New', monospace;
          color: var(--primary-dark);
        }

        .login-footer {
          margin-top: var(--spacing-lg);
          text-align: center;
        }

        .support-text {
          font-size: 0.75rem;
          color: var(--gray-600);
          margin-bottom: var(--spacing-xs);
        }

        .support-contact {
          font-size: 0.75rem;
          color: var(--gray-700);
          margin: 0;
        }

        .company-info {
          max-width: 400px;
          color: var(--gray-700);
        }

        .company-info h2 {
          font-size: 2rem;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: var(--spacing-lg);
        }

        .company-info p {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: var(--spacing-2xl);
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          font-size: 1rem;
          font-weight: 500;
        }

        .feature-icon {
          font-size: 1.5rem;
          width: 40px;
          text-align: center;
        }

        .login-page-footer {
          background-color: var(--primary-dark);
          color: var(--white);
          text-align: center;
          padding: var(--spacing-lg);
          font-size: 0.875rem;
        }

        .login-page-footer p {
          margin: 0;
          opacity: 0.9;
        }

        .login-page-footer p:first-child {
          font-weight: 500;
          margin-bottom: var(--spacing-xs);
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
            gap: var(--spacing-xl);
            padding: var(--spacing-md);
          }

          .company-info {
            order: -1;
            text-align: center;
          }

          .company-info h2 {
            font-size: 1.5rem;
          }

          .company-info p {
            font-size: 1rem;
          }

          .login-card {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
