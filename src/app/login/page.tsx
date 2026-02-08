'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Lock, Mail, AlertCircle, Building2, Users, Target, TrendingUp, Shield } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showTestUsers, setShowTestUsers] = useState(false)
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

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail)
    setSenha('Teste@2024')
  }

  return (
    <div className="login-page">
      {/* Background Pattern */}
      <div className="background-pattern"></div>
      
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="branding-section">
          <div className="branding-content">
            {/* Logo */}
            <div className="brand-logo">
              <Building2 size={48} strokeWidth={1.5} />
              <div className="brand-text">
                <h1 className="brand-name">FIERGS</h1>
                <p className="brand-tagline">Sistema GCVF</p>
              </div>
            </div>

            {/* Title */}
            <div className="branding-title">
              <h2>Gestão de Ciclo de Vida do Funcionário</h2>
              <p>Plataforma integrada para desenvolvimento e gestão de pessoas</p>
            </div>

            {/* Features */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Users size={24} />
                </div>
                <div className="feature-text">
                  <h3>Gestão de Pessoas</h3>
                  <p>Controle completo do ciclo de vida</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Target size={24} />
                </div>
                <div className="feature-text">
                  <h3>PDI Personalizado</h3>
                  <p>Planos de desenvolvimento individual</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="feature-text">
                  <h3>Avaliações</h3>
                  <p>Feedbacks e ciclos de avaliação</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Shield size={24} />
                </div>
                <div className="feature-text">
                  <h3>Segurança</h3>
                  <p>Controle de acesso e auditoria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="form-section">
          <div className="form-container">
            {/* Form Header */}
            <div className="form-header">
              <h2>Bem-vindo de volta</h2>
              <p>Entre com suas credenciais corporativas</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="alert alert-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Login
                </label>
                <div className="input-wrapper">
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
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="senha"
                    className="form-input"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={loading}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Entrando...</span>
                  </>
                ) : (
                  <span>Entrar no Sistema</span>
                )}
              </button>
            </form>

            {/* Test Users Section */}
            <div className="test-users-section">
              <button 
                type="button"
                className="test-users-toggle"
                onClick={() => setShowTestUsers(!showTestUsers)}
              >
                {showTestUsers ? '▼' : '▶'} Usuários de Teste
              </button>
              
              {showTestUsers && (
                <div className="test-users-list">
                  <button
                    type="button"
                    className="test-user-btn"
                    onClick={() => quickLogin('joao.silva@fiergs.org.br')}
                  >
                    <div className="test-user-badge funcionario">F</div>
                    <div className="test-user-info">
                      <strong>João Silva</strong>
                      <span>Funcionário</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="test-user-btn"
                    onClick={() => quickLogin('maria.santos@fiergs.org.br')}
                  >
                    <div className="test-user-badge coordenador">C</div>
                    <div className="test-user-info">
                      <strong>Maria Santos</strong>
                      <span>Coordenador</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="test-user-btn"
                    onClick={() => quickLogin('carlos.oliveira@fiergs.org.br')}
                  >
                    <div className="test-user-badge administrador">A</div>
                    <div className="test-user-info">
                      <strong>Carlos Oliveira</strong>
                      <span>Administrador</span>
                    </div>
                  </button>

                  <p className="test-users-note">
                    Senha para todos: <code>Teste@2024</code>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="form-footer">
              <p>Problemas para acessar?</p>
              <a href="mailto:suporte.ti@fiergs.org.br">suporte.ti@fiergs.org.br</a>
            </div>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="page-footer">
        <p>© 2026 FIERGS - Federação das Indústrias do Estado do Rio Grande do Sul</p>
      </footer>

      <style jsx>{`
        /* === BASE === */
        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          background: linear-gradient(135deg, #003366 0%, #0066CC 100%);
          overflow: hidden;
        }

        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        /* === CONTAINER === */
        .login-container {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 40px;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* === BRANDING SECTION === */
        .branding-section {
          color: white;
          padding: 40px;
        }

        .branding-content {
          max-width: 560px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 48px;
        }

        .brand-logo svg {
          color: white;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .brand-tagline {
          font-size: 1.125rem;
          font-weight: 500;
          margin: 4px 0 0 0;
          opacity: 0.9;
        }

        .branding-title {
          margin-bottom: 48px;
        }

        .branding-title h2 {
          font-size: 2.25rem;
          font-weight: 600;
          margin: 0 0 16px 0;
          line-height: 1.2;
        }

        .branding-title p {
          font-size: 1.125rem;
          margin: 0;
          opacity: 0.85;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-text h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .feature-text p {
          font-size: 0.875rem;
          margin: 0;
          opacity: 0.8;
        }

        /* === FORM SECTION === */
        .form-section {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .form-container {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 48px;
          width: 100%;
          max-width: 480px;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1F2937;
          margin: 0 0 8px 0;
        }

        .form-header p {
          font-size: 1rem;
          color: #6B7280;
          margin: 0;
        }

        /* === FORM === */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .alert {
          padding: 14px 16px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .alert-error {
          background: #FEF2F2;
          color: #DC2626;
          border: 1px solid #FECACA;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 14px 50px 14px 52px;
          font-size: 1rem;
          border: 2px solid #E5E7EB;
          border-radius: 12px;
          background: #F9FAFB;
          color: #1F2937;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #003366;
          background: white;
          box-shadow: 0 0 0 4px rgba(0, 51, 102, 0.1);
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-input::placeholder {
          color: #9CA3AF;
        }

        .password-toggle {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: #003366;
          background: #F3F4F6;
        }

        .password-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .btn-submit {
          width: 100%;
          padding: 16px 24px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #003366 0%, #0066CC 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
          font-family: inherit;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 51, 102, 0.4);
        }

        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-submit:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* === TEST USERS === */
        .test-users-section {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #E5E7EB;
        }

        .test-users-toggle {
          background: none;
          border: none;
          color: #6B7280;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s ease;
          font-family: inherit;
        }

        .test-users-toggle:hover {
          color: #003366;
        }

        .test-users-list {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .test-user-btn {
          width: 100%;
          background: #F9FAFB;
          border: 2px solid #E5E7EB;
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .test-user-btn:hover {
          background: white;
          border-color: #003366;
          transform: translateX(4px);
        }

        .test-user-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          color: white;
          flex-shrink: 0;
        }

        .test-user-badge.funcionario {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        }

        .test-user-badge.coordenador {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
        }

        .test-user-badge.administrador {
          background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
        }

        .test-user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .test-user-info strong {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1F2937;
        }

        .test-user-info span {
          font-size: 0.8125rem;
          color: #6B7280;
        }

        .test-users-note {
          margin-top: 12px;
          font-size: 0.8125rem;
          color: #6B7280;
          text-align: center;
        }

        .test-users-note code {
          background: #F3F4F6;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          color: #003366;
          font-weight: 600;
        }

        /* === FORM FOOTER === */
        .form-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 0.875rem;
          color: #6B7280;
        }

        .form-footer p {
          margin: 0 0 4px 0;
        }

        .form-footer a {
          color: #003366;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .form-footer a:hover {
          color: #0066CC;
          text-decoration: underline;
        }

        /* === PAGE FOOTER === */
        .page-footer {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 0.875rem;
          position: relative;
          z-index: 1;
        }

        .page-footer p {
          margin: 0;
          opacity: 0.9;
        }

        /* === RESPONSIVE === */
        @media (max-width: 1024px) {
          .login-container {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 32px 24px;
          }

          .branding-section {
            padding: 0;
            text-align: center;
          }

          .branding-content {
            max-width: 100%;
          }

          .brand-logo {
            justify-content: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 0;
          }

          .form-container {
            padding: 32px 24px;
          }
        }

        @media (max-width: 640px) {
          .login-container {
            padding: 24px 16px;
          }

          .brand-name {
            font-size: 2rem;
          }

          .brand-tagline {
            font-size: 1rem;
          }

          .branding-title h2 {
            font-size: 1.75rem;
          }

          .branding-title p {
            font-size: 1rem;
          }

          .form-header h2 {
            font-size: 1.5rem;
          }

          .form-container {
            padding: 24px 20px;
          }

          .features-grid {
            gap: 12px;
          }

          .feature-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}
