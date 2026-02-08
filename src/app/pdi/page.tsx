'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import {
  Target,
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp,
  Edit,
  AlertCircle,
  BookOpen,
  Users,
  Award,
  TrendingUp
} from 'lucide-react'

interface Action {
  id: number
  title: string
  completed: boolean
}

interface PDIObjective {
  id: number
  title: string
  description: string
  status: 'nao_iniciado' | 'em_andamento' | 'concluido'
  progress: number
  deadline: string
  priority: 'alta' | 'media' | 'baixa'
  category: 'tecnico' | 'lideranca' | 'soft_skills' | 'certificacao'
  actions: Action[]
  resources: string
  nextReview: string
}

export default function PDIPage() {
  const [expandedObjective, setExpandedObjective] = useState<number | null>(1)
  const [showNewObjectiveModal, setShowNewObjectiveModal] = useState(false)



  const [objectives, setObjectives] = useState<PDIObjective[]>([
    {
      id: 1,
      title: 'Certificação AWS Solutions Architect',
      description: 'Obter certificação AWS SAA-C03 para ampliar conhecimentos em cloud computing e arquitetura de soluções na nuvem.',
      status: 'em_andamento',
      progress: 75,
      deadline: '30/06/2026',
      priority: 'alta',
      category: 'certificacao',
      actions: [
        { id: 1, title: 'Completar curso online AWS (40h)', completed: true },
        { id: 2, title: 'Projeto prático: Migração para EC2', completed: true },
        { id: 3, title: 'Simulados de certificação (3x)', completed: false },
        { id: 4, title: 'Agendamento da prova oficial', completed: false }
      ],
      resources: 'Voucher de prova ($150), Acesso ao AWS Training',
      nextReview: '15/02/2026'
    },
    {
      id: 2,
      title: 'Desenvolvimento de Liderança',
      description: 'Desenvolver habilidades de liderança técnica para assumir responsabilidades de tech lead em projetos futuros.',
      status: 'em_andamento',
      progress: 25,
      deadline: '31/12/2026',
      priority: 'media',
      category: 'lideranca',
      actions: [
        { id: 1, title: 'Workshop "Liderança Técnica" (16h)', completed: true },
        { id: 2, title: 'Mentoria com Gerente Sênior (6 meses)', completed: false },
        { id: 3, title: 'Liderar projeto piloto com 3 desenvolvedores', completed: false },
        { id: 4, title: 'Curso online de gestão de pessoas', completed: false }
      ],
      resources: 'Mentoria interna, Curso Udemy',
      nextReview: '28/02/2026'
    },
    {
      id: 3,
      title: 'Dominar TypeScript Avançado',
      description: 'Aprofundar conhecimentos em TypeScript, incluindo tipos avançados, generics e patterns de design.',
      status: 'nao_iniciado',
      progress: 0,
      deadline: '30/09/2026',
      priority: 'media',
      category: 'tecnico',
      actions: [
        { id: 1, title: 'Curso TypeScript Avançado (20h)', completed: false },
        { id: 2, title: 'Refatorar projeto legado para TypeScript', completed: false },
        { id: 3, title: 'Implementar design patterns em TS', completed: false }
      ],
      resources: 'Acesso Pluralsight',
      nextReview: '15/03/2026'
    }
  ])

  const toggleObjective = (id: number) => {
    setExpandedObjective(expandedObjective === id ? null : id)
  }

  const toggleAction = (objectiveId: number, actionId: number) => {
    setObjectives(objectives.map(obj => {
      if (obj.id === objectiveId) {
        const updatedActions = obj.actions.map(action =>
          action.id === actionId ? { ...action, completed: !action.completed } : action
        )
        const completedCount = updatedActions.filter(a => a.completed).length
        const newProgress = Math.round((completedCount / updatedActions.length) * 100)
        return {
          ...obj,
          actions: updatedActions,
          progress: newProgress,
          status: newProgress === 100 ? 'concluido' : newProgress > 0 ? 'em_andamento' : 'nao_iniciado'
        }
      }
      return obj
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'success'
      case 'em_andamento': return 'warning'
      case 'nao_iniciado': return 'muted'
      default: return 'muted'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'concluido': return 'Concluído'
      case 'em_andamento': return 'Em andamento'
      case 'nao_iniciado': return 'Não iniciado'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'error'
      case 'media': return 'warning'
      case 'baixa': return 'info'
      default: return 'muted'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'certificacao': return <Award size={20} />
      case 'lideranca': return <Users size={20} />
      case 'tecnico': return <BookOpen size={20} />
      case 'soft_skills': return <TrendingUp size={20} />
      default: return <Target size={20} />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'certificacao': return 'Certificação'
      case 'lideranca': return 'Liderança'
      case 'tecnico': return 'Técnico'
      case 'soft_skills': return 'Soft Skills'
      default: return category
    }
  }

  const renderProgressDots = (progress: number) => {
    const dots = 4
    const filled = Math.round((progress / 100) * dots)
    return (
      <div className="progress-dots">
        {Array.from({ length: dots }, (_, i) => (
          <div key={i} className={`dot ${i < filled ? 'filled' : ''}`} />
        ))}
      </div>
    )
  }

  // Estatísticas do PDI
  const stats = {
    activeObjectives: objectives.filter(o => o.status !== 'concluido').length,
    completedThisYear: objectives.filter(o => o.status === 'concluido').length,
    averageProgress: Math.round(objectives.reduce((sum, o) => sum + o.progress, 0) / objectives.length),
    nextReviewDate: '05/02/2026'
  }

  return (
    <ProtectedRoute>
      <MainLayout>
      <div className="pdi-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span>PDI</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Meu Plano de Desenvolvimento</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-info">
            <h1>Meu PDI - {user.name}</h1>
            <p className="last-update">Última atualização: 28/01/2026</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowNewObjectiveModal(true)}
          >
            <Plus size={20} />
            Novo Objetivo
          </button>
        </div>

        {/* Resumo do Progresso */}
        <div className="summary-card">
          <div className="summary-header">
            <TrendingUp size={20} />
            <h3>Resumo do Progresso</h3>
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-value">{stats.activeObjectives}</span>
              <span className="summary-label">Objetivos ativos</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{stats.completedThisYear}</span>
              <span className="summary-label">Concluídos este ano</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{stats.averageProgress}%</span>
              <span className="summary-label">Progresso médio</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{stats.nextReviewDate}</span>
              <span className="summary-label">Próxima revisão com gestor</span>
            </div>
          </div>
        </div>

        {/* Lista de Objetivos */}
        <div className="objectives-section">
          <h2 className="section-title">Objetivos Ativos</h2>

          <div className="objectives-list">
            {objectives.map((objective) => (
              <div key={objective.id} className={`objective-card ${objective.status}`}>
                <div
                  className="objective-header"
                  onClick={() => toggleObjective(objective.id)}
                >
                  <div className="objective-icon">
                    {getCategoryIcon(objective.category)}
                  </div>
                  <div className="objective-info">
                    <div className="objective-title-row">
                      <h3 className="objective-title">{objective.title}</h3>
                      <div className="objective-badges">
                        <span className={`badge badge-${getPriorityColor(objective.priority)}`}>
                          {objective.priority.charAt(0).toUpperCase() + objective.priority.slice(1)}
                        </span>
                        <span className={`badge badge-${getStatusColor(objective.status)}`}>
                          {getStatusLabel(objective.status)}
                        </span>
                      </div>
                    </div>
                    <div className="objective-meta">
                      <span className="meta-item">
                        <Calendar size={14} />
                        Prazo: {objective.deadline}
                      </span>
                      <span className="meta-item">
                        <Target size={14} />
                        {getCategoryLabel(objective.category)}
                      </span>
                    </div>
                    <div className="objective-progress">
                      <div className="progress-info">
                        <span>Progresso: {objective.progress}%</span>
                        {renderProgressDots(objective.progress)}
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${objective.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="expand-btn">
                    {expandedObjective === objective.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>

                {expandedObjective === objective.id && (
                  <div className="objective-details">
                    <p className="objective-description">{objective.description}</p>

                    <div className="actions-section">
                      <h4>Ações:</h4>
                      <ul className="actions-list">
                        {objective.actions.map((action) => (
                          <li
                            key={action.id}
                            className={`action-item ${action.completed ? 'completed' : ''}`}
                            onClick={() => toggleAction(objective.id, action.id)}
                          >
                            {action.completed ? (
                              <CheckCircle size={18} className="check-icon completed" />
                            ) : (
                              <Circle size={18} className="check-icon" />
                            )}
                            <span>{action.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Recursos necessários:</span>
                        <span className="detail-value">{objective.resources}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Próxima revisão:</span>
                        <span className="detail-value">{objective.nextReview}</span>
                      </div>
                    </div>

                    <div className="objective-actions">
                      <button className="btn btn-secondary btn-sm">
                        <Edit size={16} />
                        Editar
                      </button>
                      <button className="btn btn-outline btn-sm">
                        <Clock size={16} />
                        Atualizar Progresso
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Novo Objetivo */}
        {showNewObjectiveModal && (
          <div className="modal-overlay" onClick={() => setShowNewObjectiveModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Novo Objetivo PDI</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowNewObjectiveModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Título do Objetivo *</label>
                  <input type="text" placeholder="Ex: Certificação AWS, Liderança de Equipe..." />
                </div>
                <div className="form-group">
                  <label>Descrição *</label>
                  <textarea placeholder="Descreva o objetivo de forma clara e específica..." rows={3} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Categoria *</label>
                    <select>
                      <option value="">Selecione...</option>
                      <option value="tecnico">Técnico</option>
                      <option value="certificacao">Certificação</option>
                      <option value="lideranca">Liderança</option>
                      <option value="soft_skills">Soft Skills</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Prioridade *</label>
                    <select>
                      <option value="">Selecione...</option>
                      <option value="alta">Alta</option>
                      <option value="media">Média</option>
                      <option value="baixa">Baixa</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Prazo *</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Próxima Revisão</label>
                    <input type="date" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Recursos Necessários</label>
                  <input type="text" placeholder="Ex: Voucher de prova, acesso a curso..." />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowNewObjectiveModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary">
                  Criar Objetivo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .pdi-page {
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
          gap: var(--spacing-md);
        }

        .header-info h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .last-update {
          font-size: 0.875rem;
          color: var(--gray-600);
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

        .btn-primary {
          background-color: var(--primary-dark);
          color: var(--white);
        }

        .btn-primary:hover {
          background-color: var(--primary-medium);
        }

        .btn-secondary {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }

        .btn-secondary:hover {
          background-color: var(--primary-dark);
          color: var(--white);
        }

        .btn-outline {
          background-color: transparent;
          border: 1px solid var(--gray-300);
          color: var(--gray-700);
        }

        .btn-outline:hover {
          border-color: var(--primary-dark);
          color: var(--primary-dark);
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 0.8125rem;
        }

        /* Summary Card */
        .summary-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
        }

        .summary-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          color: var(--primary-dark);
        }

        .summary-header h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--spacing-lg);
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .summary-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .summary-label {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        /* Objectives Section */
        .objectives-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .objectives-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .objective-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          overflow: hidden;
          transition: box-shadow 0.2s ease;
        }

        .objective-card:hover {
          box-shadow: var(--shadow-md);
        }

        .objective-card.em_andamento {
          border-left: 4px solid var(--warning);
        }

        .objective-card.concluido {
          border-left: 4px solid var(--success);
        }

        .objective-card.nao_iniciado {
          border-left: 4px solid var(--gray-400);
        }

        .objective-header {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          cursor: pointer;
        }

        .objective-icon {
          width: 44px;
          height: 44px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .objective-info {
          flex: 1;
          min-width: 0;
        }

        .objective-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .objective-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin: 0;
        }

        .objective-badges {
          display: flex;
          gap: var(--spacing-sm);
        }

        .badge {
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .badge-success {
          background-color: #D4EDDA;
          color: #155724;
        }

        .badge-warning {
          background-color: #FFF3CD;
          color: #856404;
        }

        .badge-error {
          background-color: #F8D7DA;
          color: #721C24;
        }

        .badge-info {
          background-color: #D1ECF1;
          color: #0C5460;
        }

        .badge-muted {
          background-color: var(--gray-200);
          color: var(--gray-700);
        }

        .objective-meta {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .objective-progress {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .progress-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 0.875rem;
          color: var(--gray-700);
        }

        .progress-dots {
          display: flex;
          gap: 4px;
        }

        .progress-dots .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--gray-300);
        }

        .progress-dots .dot.filled {
          background-color: var(--primary-medium);
        }

        .progress-bar {
          height: 6px;
          background-color: var(--gray-200);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--primary-medium);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .expand-btn {
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .expand-btn:hover {
          background-color: var(--gray-100);
          color: var(--primary-dark);
        }

        /* Objective Details */
        .objective-details {
          padding: 0 var(--spacing-lg) var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
          margin-top: 0;
          padding-top: var(--spacing-lg);
        }

        .objective-description {
          color: var(--gray-700);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
        }

        .actions-section h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .actions-list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--spacing-lg) 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .action-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: var(--gray-50);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-item:hover {
          background-color: var(--primary-light);
        }

        .action-item.completed span {
          text-decoration: line-through;
          color: var(--gray-500);
        }

        .check-icon {
          color: var(--gray-400);
          flex-shrink: 0;
        }

        .check-icon.completed {
          color: var(--success);
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .detail-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--gray-500);
          text-transform: uppercase;
        }

        .detail-value {
          font-size: 0.875rem;
          color: var(--gray-800);
        }

        .objective-actions {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: flex-end;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--spacing-lg);
        }

        .modal {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-xl);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--gray-200);
        }

        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--gray-500);
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .close-btn:hover {
          color: var(--gray-700);
        }

        .modal-body {
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 10px 12px;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-medium);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-sm);
          padding: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
          }

          .objective-title-row {
            flex-direction: column;
          }

          .objective-badges {
            margin-top: var(--spacing-sm);
          }

          .objective-meta {
            flex-direction: column;
            gap: var(--spacing-sm);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .objective-actions {
            flex-direction: column;
          }

          .objective-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
