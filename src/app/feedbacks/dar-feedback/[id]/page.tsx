'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/Layout/MainLayout'
import {
  ChevronLeft,
  Save,
  Send,
  User,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface FeedbackData {
  feedbackTecnico: string
  feedbackComportamental: string
  faseEmocional: string
}

export default function DarFeedbackPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [showSaveNotification, setShowSaveNotification] = useState(false)
  
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    feedbackTecnico: '',
    feedbackComportamental: '',
    faseEmocional: ''
  })

  const user = {
    name: 'Maria Santos',
    role: 'Coordenadora de Desenvolvimento',
    entity: 'FIERGS - GINFO',
    userRole: 'coordenador' as const
  }

  // Dados do funcionário que está sendo avaliado
  const funcionario = {
    id: 1,
    name: 'João Silva',
    role: 'Desenvolvedor Pleno',
    entity: 'FIERGS - GINFO',
    admissionDate: '15/03/2023',
    avatar: '/avatars/joao-silva.jpg'
  }

  const cicloInfo = {
    name: 'Avaliação Q1 2026',
    type: 'Feedback do Gestor',
    deadline: '28/02/2026'
  }

  const handleInputChange = (field: keyof FeedbackData, value: string) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setShowSaveNotification(true)
    setTimeout(() => setShowSaveNotification(false), 3000)
  }

  const handleSubmit = async () => {
    // Validar se todos os campos estão preenchidos
    if (!feedbackData.feedbackTecnico.trim() || 
        !feedbackData.feedbackComportamental.trim() || 
        !feedbackData.faseEmocional.trim()) {
      alert('Por favor, preencha todos os campos de feedback antes de enviar.')
      return
    }

    setSaving(true)
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert('Feedback enviado com sucesso!')
    router.push('/feedbacks')
  }

  const isFormComplete = feedbackData.feedbackTecnico.trim() && 
                        feedbackData.feedbackComportamental.trim() && 
                        feedbackData.faseEmocional.trim()

  return (
    <MainLayout user={user}>
      <div className="dar-feedback-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span>Feedbacks</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Dar Feedback</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => router.back()}
          >
            <ChevronLeft size={18} />
            Voltar
          </button>
          
          <div className="header-info">
            <h1>Feedback para Funcionário</h1>
            <div className="cycle-info">
              <span className="cycle-name">{cicloInfo.name}</span>
              <span className="cycle-type">{cicloInfo.type}</span>
              <span className="deadline">
                <Calendar size={16} />
                Prazo: {cicloInfo.deadline}
              </span>
            </div>
          </div>
        </div>

        {/* Informações do Funcionário */}
        <div className="employee-card">
          <div className="employee-avatar">
            <User size={32} />
          </div>
          <div className="employee-info">
            <h2>{funcionario.name}</h2>
            <p className="employee-role">{funcionario.role}</p>
            <div className="employee-meta">
              <span>{funcionario.entity}</span>
              <span>Admissão: {funcionario.admissionDate}</span>
            </div>
          </div>
        </div>

        {/* Formulário de Feedback */}
        <div className="feedback-form">
          <div className="form-header">
            <h3>Avaliação do Funcionário</h3>
            <p className="form-description">
              Forneça um feedback detalhado e construtivo para apoiar o desenvolvimento do funcionário.
            </p>
          </div>

          <div className="feedback-fields">
            {/* Feedback Técnico */}
            <div className="feedback-field">
              <div className="field-header">
                <label htmlFor="feedbackTecnico" className="field-label">
                  Feedback Técnico *
                </label>
                <span className="field-description">
                  Avalie as competências técnicas, conhecimentos específicos e habilidades profissionais
                </span>
              </div>
              <textarea
                id="feedbackTecnico"
                className="feedback-textarea"
                rows={6}
                placeholder="Descreva o desempenho técnico do funcionário, pontos fortes, áreas de melhoria e sugestões específicas para desenvolvimento técnico..."
                value={feedbackData.feedbackTecnico}
                onChange={(e) => handleInputChange('feedbackTecnico', e.target.value)}
              />
              <div className="char-count">
                {feedbackData.feedbackTecnico.length} caracteres
              </div>
            </div>

            {/* Feedback Comportamental */}
            <div className="feedback-field">
              <div className="field-header">
                <label htmlFor="feedbackComportamental" className="field-label">
                  Feedback Comportamental *
                </label>
                <span className="field-description">
                  Avalie habilidades interpessoais, trabalho em equipe, comunicação e atitudes profissionais
                </span>
              </div>
              <textarea
                id="feedbackComportamental"
                className="feedback-textarea"
                rows={6}
                placeholder="Comente sobre a postura profissional, relacionamento com a equipe, comunicação, proatividade, colaboração e outros aspectos comportamentais..."
                value={feedbackData.feedbackComportamental}
                onChange={(e) => handleInputChange('feedbackComportamental', e.target.value)}
              />
              <div className="char-count">
                {feedbackData.feedbackComportamental.length} caracteres
              </div>
            </div>

            {/* Fase Emocional */}
            <div className="feedback-field">
              <div className="field-header">
                <label htmlFor="faseEmocional" className="field-label">
                  Fase Emocional *
                </label>
                <span className="field-description">
                  Observe o estado emocional, motivação, engajamento e bem-estar do funcionário
                </span>
              </div>
              <textarea
                id="faseEmocional"
                className="feedback-textarea"
                rows={6}
                placeholder="Descreva como você percebe o estado emocional do funcionário, seu nível de motivação, engajamento com o trabalho, sinais de estresse ou satisfação..."
                value={feedbackData.faseEmocional}
                onChange={(e) => handleInputChange('faseEmocional', e.target.value)}
              />
              <div className="char-count">
                {feedbackData.faseEmocional.length} caracteres
              </div>
            </div>
          </div>

          {/* Dicas para Feedback */}
          <div className="feedback-tips">
            <h4>💡 Dicas para um Feedback Efetivo:</h4>
            <ul>
              <li><strong>Seja específico:</strong> Use exemplos concretos e situações reais</li>
              <li><strong>Seja construtivo:</strong> Foque em comportamentos que podem ser melhorados</li>
              <li><strong>Seja equilibrado:</strong> Destaque pontos fortes e áreas de desenvolvimento</li>
              <li><strong>Seja orientado ao futuro:</strong> Sugira ações práticas para crescimento</li>
              <li><strong>Seja empático:</strong> Considere o contexto e as circunstâncias do funcionário</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="footer-actions">
          <div className="form-status">
            {isFormComplete ? (
              <div className="status-complete">
                <CheckCircle size={20} />
                <span>Formulário completo</span>
              </div>
            ) : (
              <div className="status-incomplete">
                <AlertCircle size={20} />
                <span>Preencha todos os campos obrigatórios</span>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-secondary"
              onClick={handleSave}
              disabled={saving}
            >
              <Save size={18} />
              {saving ? 'Salvando...' : 'Salvar Rascunho'}
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={saving || !isFormComplete}
            >
              <Send size={18} />
              {saving ? 'Enviando...' : 'Enviar Feedback'}
            </button>
          </div>
        </div>

        {/* Save Notification */}
        {showSaveNotification && (
          <div className="save-notification">
            <CheckCircle size={20} />
            Rascunho salvo com sucesso!
          </div>
        )}
      </div>

      <style jsx>{`
        .dar-feedback-page {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          max-width: 1000px;
          margin: 0 auto;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .breadcrumb-separator {
          color: var(--gray-400);
        }

        .breadcrumb-current {
          color: var(--primary-dark);
          font-weight: 500;
        }

        .page-header {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-lg);
        }

        .header-info {
          flex: 1;
        }

        .header-info h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .cycle-info {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          font-size: 0.875rem;
        }

        .cycle-name {
          font-weight: 600;
          color: var(--primary-dark);
        }

        .cycle-type {
          color: var(--gray-600);
        }

        .deadline {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--gray-600);
        }

        /* Employee Card */
        .employee-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
        }

        .employee-avatar {
          width: 64px;
          height: 64px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .employee-info h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .employee-role {
          font-size: 1rem;
          color: var(--gray-700);
          margin-bottom: var(--spacing-sm);
        }

        .employee-meta {
          display: flex;
          gap: var(--spacing-lg);
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        /* Feedback Form */
        .feedback-form {
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .form-header {
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
          border-bottom: 1px solid var(--gray-200);
        }

        .form-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .form-description {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin: 0;
        }

        .feedback-fields {
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xl);
        }

        .feedback-field {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .field-header {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .field-label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .field-description {
          font-size: 0.875rem;
          color: var(--gray-600);
          line-height: 1.4;
        }

        .feedback-textarea {
          width: 100%;
          padding: var(--spacing-md);
          border: 2px solid var(--gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-family: inherit;
          line-height: 1.5;
          resize: vertical;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          min-height: 120px;
        }

        .feedback-textarea:focus {
          outline: none;
          border-color: var(--primary-medium);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .feedback-textarea::placeholder {
          color: var(--gray-500);
        }

        .char-count {
          font-size: 0.75rem;
          color: var(--gray-500);
          text-align: right;
        }

        /* Feedback Tips */
        .feedback-tips {
          margin: var(--spacing-lg);
          margin-top: 0;
          padding: var(--spacing-lg);
          background-color: var(--primary-light);
          border-radius: var(--radius-md);
          border-left: 4px solid var(--primary-dark);
        }

        .feedback-tips h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary-dark);
          margin-bottom: var(--spacing-md);
        }

        .feedback-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feedback-tips li {
          font-size: 0.875rem;
          color: var(--gray-700);
          margin-bottom: var(--spacing-sm);
          padding-left: var(--spacing-md);
          position: relative;
        }

        .feedback-tips li::before {
          content: '•';
          color: var(--primary-dark);
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        /* Footer Actions */
        .footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          position: sticky;
          bottom: var(--spacing-lg);
        }

        .form-status {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
        }

        .status-complete {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--success);
        }

        .status-incomplete {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--warning);
        }

        .action-buttons {
          display: flex;
          gap: var(--spacing-sm);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 12px 24px;
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          text-decoration: none;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-outline {
          background-color: transparent;
          border: 1px solid var(--gray-300);
          color: var(--gray-700);
        }

        .btn-outline:hover:not(:disabled) {
          border-color: var(--primary-dark);
          color: var(--primary-dark);
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.8125rem;
        }

        .btn-primary {
          background-color: var(--primary-dark);
          color: var(--white);
        }

        .btn-primary:hover:not(:disabled) {
          background-color: var(--primary-medium);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .btn-secondary {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: var(--primary-dark);
          color: var(--white);
        }

        /* Save Notification */
        .save-notification {
          position: fixed;
          bottom: 100px;
          right: var(--spacing-lg);
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background-color: var(--success);
          color: var(--white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          animation: slideIn 0.3s ease;
          z-index: 100;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .dar-feedback-page {
            padding: 0 var(--spacing-md);
          }

          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .employee-card {
            flex-direction: column;
            text-align: center;
          }

          .employee-meta {
            justify-content: center;
            flex-wrap: wrap;
          }

          .cycle-info {
            justify-content: center;
          }

          .footer-actions {
            flex-direction: column;
            position: relative;
            bottom: 0;
          }

          .action-buttons {
            width: 100%;
          }

          .action-buttons .btn {
            flex: 1;
            justify-content: center;
          }

          .feedback-tips {
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </MainLayout>
  )
}