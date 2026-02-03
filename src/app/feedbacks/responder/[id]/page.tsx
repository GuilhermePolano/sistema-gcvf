'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/components/Layout/MainLayout'
import {
  ChevronLeft,
  ChevronRight,
  Save,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface Question {
  id: number
  category: string
  text: string
  type: 'scale' | 'multiple' | 'text'
  options?: string[]
  answer?: string | number
}

export default function ResponderFeedbackPage() {
  const router = useRouter()
  const [currentCategory, setCurrentCategory] = useState(0)
  const [saving, setSaving] = useState(false)
  const [showSaveNotification, setShowSaveNotification] = useState(false)

  const user = {
    name: 'João Silva',
    role: 'Desenvolvedor Pleno',
    entity: 'FIERGS - GINFO',
    userRole: 'funcionario' as const
  }

  const feedbackInfo = {
    name: 'Avaliação Q1 2026',
    type: 'Autoavaliação',
    deadline: '15/02/2026'
  }

  const categories = [
    'Competências Técnicas',
    'Habilidades Comportamentais',
    'Trabalho em Equipe',
    'Desenvolvimento Pessoal'
  ]

  const [questions, setQuestions] = useState<Question[]>([
    // Competências Técnicas
    {
      id: 1,
      category: 'Competências Técnicas',
      text: 'Como você avalia seu conhecimento atual em JavaScript?',
      type: 'multiple',
      options: ['Iniciante (0-1)', 'Básico (2)', 'Intermediário (3)', 'Avançado (4)', 'Expert (5)'],
      answer: 'Intermediário (3)'
    },
    {
      id: 2,
      category: 'Competências Técnicas',
      text: 'Descreva um projeto recente onde você aplicou JavaScript de forma significativa:',
      type: 'text',
      answer: 'Desenvolvi uma API REST usando Node.js e Express para o sistema de gestão de vendas. Implementei autenticação JWT, validação de dados e integração com banco PostgreSQL.'
    },
    {
      id: 3,
      category: 'Competências Técnicas',
      text: 'Quais são seus principais desafios com esta tecnologia?',
      type: 'text',
      answer: ''
    },
    {
      id: 4,
      category: 'Competências Técnicas',
      text: 'De 0 a 5, como você avalia sua capacidade de resolver problemas técnicos complexos?',
      type: 'scale',
      answer: 4
    },
    // Habilidades Comportamentais
    {
      id: 5,
      category: 'Habilidades Comportamentais',
      text: 'Como você avalia sua comunicação com a equipe?',
      type: 'multiple',
      options: ['Precisa melhorar', 'Regular', 'Boa', 'Muito boa', 'Excelente'],
      answer: 'Boa'
    },
    {
      id: 6,
      category: 'Habilidades Comportamentais',
      text: 'De 0 a 5, avalie sua proatividade em identificar e resolver problemas:',
      type: 'scale',
      answer: undefined
    },
    {
      id: 7,
      category: 'Habilidades Comportamentais',
      text: 'Descreva uma situação onde você demonstrou adaptabilidade:',
      type: 'text',
      answer: ''
    },
    // Trabalho em Equipe
    {
      id: 8,
      category: 'Trabalho em Equipe',
      text: 'Como você avalia sua colaboração com outros membros da equipe?',
      type: 'multiple',
      options: ['Precisa melhorar', 'Regular', 'Boa', 'Muito boa', 'Excelente'],
      answer: undefined
    },
    {
      id: 9,
      category: 'Trabalho em Equipe',
      text: 'De 0 a 5, avalie sua capacidade de dar e receber feedback construtivo:',
      type: 'scale',
      answer: undefined
    },
    // Desenvolvimento Pessoal
    {
      id: 10,
      category: 'Desenvolvimento Pessoal',
      text: 'Quais são seus principais objetivos de desenvolvimento para os próximos 6 meses?',
      type: 'text',
      answer: ''
    },
    {
      id: 11,
      category: 'Desenvolvimento Pessoal',
      text: 'Que tipo de suporte você precisa da empresa para atingir esses objetivos?',
      type: 'text',
      answer: ''
    }
  ])

  const categoryQuestions = questions.filter(q => q.category === categories[currentCategory])
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => q.answer !== undefined && q.answer !== '').length
  const progress = Math.round((answeredQuestions / totalQuestions) * 100)

  const updateAnswer = (questionId: number, answer: string | number) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, answer } : q
    ))
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
    if (answeredQuestions < totalQuestions) {
      alert('Por favor, responda todas as perguntas antes de enviar.')
      return
    }
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push('/feedbacks')
  }

  const goToCategory = (index: number) => {
    if (index >= 0 && index < categories.length) {
      setCurrentCategory(index)
    }
  }

  return (
    <MainLayout user={user}>
      <div className="responder-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span>Feedbacks</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">{feedbackInfo.name}</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-info">
            <h1>{feedbackInfo.type} - {feedbackInfo.name}</h1>
            <div className="header-meta">
              <span className="deadline">
                <Clock size={16} />
                Prazo: {feedbackInfo.deadline}
              </span>
            </div>
          </div>
          <div className="progress-header">
            <span>Progresso: {answeredQuestions} de {totalQuestions}</span>
            <div className="progress-bar-lg">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-percent">{progress}%</span>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="category-nav">
          {categories.map((cat, index) => {
            const catQuestions = questions.filter(q => q.category === cat)
            const catAnswered = catQuestions.filter(q => q.answer !== undefined && q.answer !== '').length
            const isComplete = catAnswered === catQuestions.length

            return (
              <button
                key={index}
                className={`category-btn ${currentCategory === index ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                onClick={() => setCurrentCategory(index)}
              >
                <span className="category-name">{cat}</span>
                <span className="category-progress">
                  {isComplete ? (
                    <CheckCircle size={16} className="complete-icon" />
                  ) : (
                    `${catAnswered}/${catQuestions.length}`
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Questions */}
        <div className="questions-section">
          <div className="section-header">
            <h2>{categories[currentCategory]}</h2>
            <span className="section-count">
              ({categoryQuestions.filter(q => q.answer !== undefined && q.answer !== '').length} de {categoryQuestions.length} respondidas)
            </span>
          </div>

          <div className="questions-list">
            {categoryQuestions.map((question, index) => (
              <div key={question.id} className="question-card">
                <div className="question-number">{index + 1}</div>
                <div className="question-content">
                  <p className="question-text">{question.text}</p>

                  {question.type === 'multiple' && question.options && (
                    <div className="options-grid">
                      {question.options.map((option, optIndex) => (
                        <label key={optIndex} className="option-label">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={question.answer === option}
                            onChange={() => updateAnswer(question.id, option)}
                          />
                          <span className="option-text">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === 'scale' && (
                    <div className="scale-input">
                      <div className="scale-buttons">
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <button
                            key={num}
                            className={`scale-btn ${question.answer === num ? 'selected' : ''}`}
                            onClick={() => updateAnswer(question.id, num)}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <div className="scale-labels">
                        <span>Baixo</span>
                        <span>Alto</span>
                      </div>
                    </div>
                  )}

                  {question.type === 'text' && (
                    <textarea
                      className="text-input"
                      rows={4}
                      placeholder="Digite sua resposta..."
                      value={question.answer as string || ''}
                      onChange={(e) => updateAnswer(question.id, e.target.value)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="footer-actions">
          <button
            className="btn btn-outline"
            onClick={() => goToCategory(currentCategory - 1)}
            disabled={currentCategory === 0}
          >
            <ChevronLeft size={18} />
            Anterior
          </button>

          <div className="center-actions">
            <button
              className="btn btn-secondary"
              onClick={handleSave}
              disabled={saving}
            >
              <Save size={18} />
              {saving ? 'Salvando...' : 'Salvar Rascunho'}
            </button>
          </div>

          {currentCategory < categories.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={() => goToCategory(currentCategory + 1)}
            >
              Próxima
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={saving || answeredQuestions < totalQuestions}
            >
              {saving ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          )}
        </div>

        {/* Save Notification */}
        {showSaveNotification && (
          <div className="save-notification">
            <CheckCircle size={20} />
            Rascunho salvo com sucesso!
          </div>
        )}

        {/* Warning */}
        <div className="warning-box">
          <AlertCircle size={18} />
          <span>Lembre-se de salvar periodicamente suas respostas!</span>
        </div>
      </div>

      <style jsx>{`
        .responder-page {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
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
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .header-info h1 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .header-meta {
          display: flex;
          gap: var(--spacing-lg);
        }

        .deadline {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .progress-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          font-size: 0.875rem;
          color: var(--gray-700);
        }

        .progress-bar-lg {
          width: 200px;
          height: 8px;
          background-color: var(--gray-200);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--primary-medium);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-percent {
          font-weight: 600;
          min-width: 40px;
        }

        /* Category Navigation */
        .category-nav {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
          background-color: var(--white);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
        }

        .category-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-md) var(--spacing-lg);
          background-color: var(--gray-50);
          border: 2px solid transparent;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
          min-width: 150px;
        }

        .category-btn:hover {
          background-color: var(--primary-light);
        }

        .category-btn.active {
          background-color: var(--primary-light);
          border-color: var(--primary-dark);
        }

        .category-btn.complete .category-progress {
          color: var(--success);
        }

        .category-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-900);
          text-align: center;
        }

        .category-progress {
          font-size: 0.75rem;
          color: var(--gray-600);
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .complete-icon {
          color: var(--success);
        }

        /* Questions Section */
        .questions-section {
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          padding: var(--spacing-lg);
        }

        .section-header {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--gray-200);
        }

        .section-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
          margin: 0;
        }

        .section-count {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .question-card {
          display: flex;
          gap: var(--spacing-md);
        }

        .question-number {
          width: 32px;
          height: 32px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .question-content {
          flex: 1;
        }

        .question-text {
          font-size: 1rem;
          color: var(--gray-800);
          margin-bottom: var(--spacing-md);
          line-height: 1.5;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .option-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: var(--gray-50);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .option-label:hover {
          background-color: var(--primary-light);
        }

        .option-label input {
          accent-color: var(--primary-dark);
        }

        .option-text {
          font-size: 0.875rem;
          color: var(--gray-700);
        }

        .scale-input {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .scale-buttons {
          display: flex;
          gap: var(--spacing-sm);
        }

        .scale-btn {
          width: 44px;
          height: 44px;
          border: 2px solid var(--gray-300);
          background-color: var(--white);
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .scale-btn:hover {
          border-color: var(--primary-medium);
          background-color: var(--primary-light);
        }

        .scale-btn.selected {
          background-color: var(--primary-dark);
          border-color: var(--primary-dark);
          color: var(--white);
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          width: 282px;
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .text-input {
          width: 100%;
          padding: var(--spacing-md);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.2s ease;
        }

        .text-input:focus {
          outline: none;
          border-color: var(--primary-medium);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        /* Footer Actions */
        .footer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          position: sticky;
          bottom: var(--spacing-lg);
          box-shadow: var(--shadow-md);
        }

        .center-actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 10px 20px;
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background-color: var(--primary-dark);
          color: var(--white);
        }

        .btn-primary:hover:not(:disabled) {
          background-color: var(--primary-medium);
        }

        .btn-secondary {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: var(--primary-dark);
          color: var(--white);
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

        .btn-success {
          background-color: var(--success);
          color: var(--white);
        }

        .btn-success:hover:not(:disabled) {
          background-color: #218838;
        }

        /* Notifications */
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

        .warning-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background-color: #FFF3CD;
          border: 1px solid #FFECB5;
          border-radius: var(--radius-md);
          color: #856404;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
          }

          .progress-header {
            width: 100%;
          }

          .progress-bar-lg {
            flex: 1;
          }

          .category-nav {
            flex-direction: column;
          }

          .category-btn {
            flex-direction: row;
            justify-content: space-between;
          }

          .footer-actions {
            flex-direction: column;
            position: relative;
            bottom: 0;
          }

          .footer-actions .btn {
            width: 100%;
            justify-content: center;
          }

          .center-actions {
            width: 100%;
          }

          .center-actions .btn {
            flex: 1;
          }

          .scale-buttons {
            flex-wrap: wrap;
          }

          .scale-labels {
            width: 100%;
          }
        }
      `}</style>
    </MainLayout>
  )
}
