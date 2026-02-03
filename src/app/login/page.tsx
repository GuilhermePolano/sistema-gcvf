'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simular chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Em produção, aqui seria feita a autenticação real
      console.log('Login attempt:', formData)
      
      // Redirecionar para dashboard
      window.location.href = '/dashboard'
      
    } catch (error) {
      setErrors({ general: 'Erro ao fazer login. Tente novamente.' })
    } finally {
      setIsLoading(false)
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
            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
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
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="seu.email@fiergs.org.br"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <div className="input-container">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <span className="checkbox-checkmark"></span>
                Lembrar-me
              </label>

              <a href="/esqueci-senha" className="forgot-password">
                Esqueci minha senha
              </a>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary btn-login ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Entrando...
                </>
              ) : (
                'Entrar no Sistema'
              )}
            </button>
          </form>

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
          max-width: 400px;
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

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
          user-select: none;
        }

        .checkbox-container input[type="checkbox"] {
          display: none;
        }

        .checkbox-checkmark {
          width: 16px;
          height: 16px;
          border: 2px solid var(--gray-400);
          border-radius: 3px;
          position: relative;
          transition: all 0.2s ease;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkbox-checkmark {
          background-color: var(--primary-dark);
          border-color: var(--primary-dark);
        }

        .checkbox-container input[type="checkbox"]:checked + .checkbox-checkmark::after {
          content: '✓';
          position: absolute;
          top: -2px;
          left: 2px;
          color: var(--white);
          font-size: 12px;
          font-weight: bold;
        }

        .forgot-password {
          color: var(--primary-medium);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .forgot-password:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .btn-login {
          width: 100%;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          margin-top: var(--spacing-md);
          position: relative;
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
          margin-right: var(--spacing-sm);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          color: var(--error);
          font-size: 0.75rem;
          margin-top: var(--spacing-xs);
        }

        .general-error {
          background-color: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: var(--radius-sm);
          padding: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          text-align: center;
        }

        .login-footer {
          margin-top: var(--spacing-2xl);
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
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