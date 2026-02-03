'use client'

import { useState } from 'react'
import Link from 'next/link'
import MainLayout from '@/components/Layout/MainLayout'
import {
  MessageSquare,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  ChevronRight,
  FileText,
  BarChart3,
  Play,
  Pause,
  Eye
} from 'lucide-react'

interface FeedbackCycle {
  id: number
  name: string
  type: '180' | '360'
  periodicity: string
  status: 'ativo' | 'pendente' | 'concluido' | 'rascunho'
  startDate: string
  endDate: string
  participants: number
  completedResponses: number
  categories: string[]
}

interface PendingFeedback {
  id: number
  cycleName: string
  type: string
  deadline: string
  progress: number
  totalQuestions: number
  answeredQuestions: number
  urgent: boolean
}

export default function FeedbacksPage() {
  const [activeTab, setActiveTab] = useState<'meus' | 'ciclos'>('meus')
  const [showNewCycleModal, setShowNewCycleModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('todos')

  const user: {
    name: string
    role: string
    entity: string
    userRole: 'funcionario' | 'coordenador' | 'gerente' | 'administrador'
  } = {
    name: 'João Silva',
    role: 'Desenvolvedor Pleno',
    entity: 'FIERGS - GINFO',
    userRole: 'coordenador'
  }

  // Feedbacks pendentes do usuário
  const pendingFeedbacks: PendingFeedback[] = [
    {
      id: 1,
      cycleName: 'Avaliação Q1 2026',
      type: 'Autoavaliação',
      deadline: '15/02/2026',
      progress: 60,
      totalQuestions: 32,
      answeredQuestions: 19,
      urgent: true
    },
    {
      id: 2,
      cycleName: 'Avaliação Q1 2026',
      type: 'Avaliação de Par - Maria Santos',
      deadline: '20/02/2026',
      progress: 0,
      totalQuestions: 15,
      answeredQuestions: 0,
      urgent: false
    },
    {
      id: 3,
      cycleName: 'Feedback Trimestral',
      type: 'Avaliação do Gestor',
      deadline: '28/02/2026',
      progress: 100,
      totalQuestions: 20,
      answeredQuestions: 20,
      urgent: false
    }
  ]

  // Ciclos de feedback (visão coordenador/gerente)
  const feedbackCycles: FeedbackCycle[] = [
    {
      id: 1,
      name: 'Avaliação Q1 2026',
      type: '360',
      periodicity: 'Trimestral',
      status: 'ativo',
      startDate: '01/02/2026',
      endDate: '28/02/2026',
      participants: 15,
      completedResponses: 8,
      categories: ['Competências Técnicas', 'Habilidades Comportamentais', 'Trabalho em Equipe']
    },
    {
      id: 2,
      name: 'Feedback Mensal Janeiro',
      type: '180',
      periodicity: 'Mensal',
      status: 'concluido',
      startDate: '15/01/2026',
      endDate: '31/01/2026',
      participants: 15,
      completedResponses: 15,
      categories: ['Competências Técnicas', 'Feedback 1:1']
    },
    {
      id: 3,
      name: 'Avaliação Q2 2026',
      type: '360',
      periodicity: 'Trimestral',
      status: 'rascunho',
      startDate: '01/05/2026',
      endDate: '31/05/2026',
      participants: 0,
      completedResponses: 0,
      categories: ['Competências Técnicas', 'Liderança']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'success'
      case 'pendente': return 'warning'
      case 'concluido': return 'info'
      case 'rascunho': return 'muted'
      default: return 'muted'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo'
      case 'pendente': return 'Pendente'
      case 'concluido': return 'Concluído'
      case 'rascunho': return 'Rascunho'
      default: return status
    }
  }

  const filteredCycles = filterStatus === 'todos'
    ? feedbackCycles
    : feedbackCycles.filter(c => c.status === filterStatus)

  return (
    <MainLayout user={user}>
      <div className="feedbacks-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Feedbacks</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-info">
            <h1>Feedbacks</h1>
            <p className="subtitle">Gerencie seus feedbacks e ciclos de avaliação</p>
          </div>
          {user.userRole !== 'funcionario' && (
            <button
              className="btn btn-primary"
              onClick={() => setShowNewCycleModal(true)}
            >
              <Plus size={20} />
              Novo Ciclo
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'meus' ? 'active' : ''}`}
            onClick={() => setActiveTab('meus')}
          >
            <FileText size={18} />
            Meus Feedbacks
            {pendingFeedbacks.filter(f => f.progress < 100).length > 0 && (
              <span className="badge-count">
                {pendingFeedbacks.filter(f => f.progress < 100).length}
              </span>
            )}
          </button>
          {user.userRole !== 'funcionario' && (
            <button
              className={`tab ${activeTab === 'ciclos' ? 'active' : ''}`}
              onClick={() => setActiveTab('ciclos')}
            >
              <BarChart3 size={18} />
              Ciclos de Feedback
            </button>
          )}
        </div>

        {/* Conteúdo das Tabs */}
        {activeTab === 'meus' && (
          <div className="my-feedbacks">
            {/* Métricas */}
            <div className="metrics-row">
              <div className="metric-mini">
                <AlertCircle size={20} className="text-warning" />
                <div>
                  <span className="metric-number">
                    {pendingFeedbacks.filter(f => f.progress < 100).length}
                  </span>
                  <span className="metric-label">Pendentes</span>
                </div>
              </div>
              <div className="metric-mini">
                <CheckCircle size={20} className="text-success" />
                <div>
                  <span className="metric-number">
                    {pendingFeedbacks.filter(f => f.progress === 100).length}
                  </span>
                  <span className="metric-label">Concluídos</span>
                </div>
              </div>
              <div className="metric-mini">
                <Clock size={20} className="text-error" />
                <div>
                  <span className="metric-number">
                    {pendingFeedbacks.filter(f => f.urgent).length}
                  </span>
                  <span className="metric-label">Urgentes</span>
                </div>
              </div>
            </div>

            {/* Lista de Feedbacks Pendentes */}
            <div className="feedbacks-list">
              {pendingFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className={`feedback-card ${feedback.urgent && feedback.progress < 100 ? 'urgent' : ''} ${feedback.progress === 100 ? 'completed' : ''}`}
                >
                  <div className="feedback-info">
                    <div className="feedback-header">
                      <h3>{feedback.cycleName}</h3>
                      <span className={`badge badge-${feedback.progress === 100 ? 'success' : feedback.urgent ? 'error' : 'warning'}`}>
                        {feedback.progress === 100 ? 'Concluído' : feedback.urgent ? 'Urgente' : 'Pendente'}
                      </span>
                    </div>
                    <p className="feedback-type">{feedback.type}</p>
                    <div className="feedback-meta">
                      <span>
                        <Calendar size={14} />
                        Prazo: {feedback.deadline}
                      </span>
                      <span>
                        <MessageSquare size={14} />
                        {feedback.answeredQuestions}/{feedback.totalQuestions} perguntas
                      </span>
                    </div>
                    <div className="feedback-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${feedback.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">{feedback.progress}%</span>
                    </div>
                  </div>
                  <div className="feedback-actions">
                    {feedback.progress === 100 ? (
                      <Link href={`/feedbacks/visualizar/${feedback.id}`} className="btn btn-outline btn-sm">
                        <Eye size={16} />
                        Visualizar
                      </Link>
                    ) : (
                      <Link href={`/feedbacks/responder/${feedback.id}`} className="btn btn-primary btn-sm">
                        {feedback.progress > 0 ? 'Continuar' : 'Iniciar'}
                        <ChevronRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ciclos' && (
          <div className="cycles-section">
            {/* Filtros */}
            <div className="filters-row">
              <div className="filter-group">
                <Filter size={18} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="todos">Todos os status</option>
                  <option value="ativo">Ativos</option>
                  <option value="pendente">Pendentes</option>
                  <option value="concluido">Concluídos</option>
                  <option value="rascunho">Rascunhos</option>
                </select>
              </div>
              <span className="results-count">{filteredCycles.length} ciclos encontrados</span>
            </div>

            {/* Lista de Ciclos */}
            <div className="cycles-list">
              {filteredCycles.map((cycle) => (
                <div key={cycle.id} className="cycle-card">
                  <div className="cycle-header">
                    <div className="cycle-title-row">
                      <div className="cycle-icon">
                        {cycle.type === '360' ? <Users size={24} /> : <MessageSquare size={24} />}
                      </div>
                      <div>
                        <h3>{cycle.name}</h3>
                        <div className="cycle-badges">
                          <span className="badge badge-primary">
                            Feedback {cycle.type}°
                          </span>
                          <span className={`badge badge-${getStatusColor(cycle.status)}`}>
                            {getStatusLabel(cycle.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="cycle-actions">
                      {cycle.status === 'rascunho' && (
                        <button className="btn btn-primary btn-sm">
                          <Play size={16} />
                          Iniciar
                        </button>
                      )}
                      {cycle.status === 'ativo' && (
                        <button className="btn btn-outline btn-sm">
                          <Pause size={16} />
                          Pausar
                        </button>
                      )}
                      <button className="btn btn-secondary btn-sm">
                        <Eye size={16} />
                        Detalhes
                      </button>
                    </div>
                  </div>

                  <div className="cycle-details">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Periodicidade</span>
                        <span className="detail-value">{cycle.periodicity}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Período</span>
                        <span className="detail-value">{cycle.startDate} - {cycle.endDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Participantes</span>
                        <span className="detail-value">{cycle.participants}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Respostas</span>
                        <span className="detail-value">
                          {cycle.completedResponses}/{cycle.participants}
                          {cycle.participants > 0 && (
                            <span className="percentage">
                              ({Math.round((cycle.completedResponses / cycle.participants) * 100)}%)
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="categories-row">
                      <span className="categories-label">Categorias:</span>
                      <div className="categories-tags">
                        {cycle.categories.map((cat, idx) => (
                          <span key={idx} className="category-tag">{cat}</span>
                        ))}
                      </div>
                    </div>

                    {cycle.status === 'ativo' && cycle.participants > 0 && (
                      <div className="cycle-progress">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(cycle.completedResponses / cycle.participants) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Novo Ciclo */}
        {showNewCycleModal && (
          <div className="modal-overlay" onClick={() => setShowNewCycleModal(false)}>
            <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Configuração de Ciclo de Feedback</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowNewCycleModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="section-title">Configurações Básicas</div>

                <div className="form-group">
                  <label>Nome do Ciclo *</label>
                  <input type="text" placeholder="Ex: Avaliação Q1 2026" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Feedback *</label>
                    <select>
                      <option value="">Selecione...</option>
                      <option value="180">180° (Auto + Gestor)</option>
                      <option value="360">360° Completo</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Periodicidade *</label>
                    <select>
                      <option value="">Selecione...</option>
                      <option value="mensal">Mensal</option>
                      <option value="bimestral">Bimestral</option>
                      <option value="trimestral">Trimestral</option>
                      <option value="semestral">Semestral</option>
                      <option value="anual">Anual</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Data de Início *</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Data de Fim *</label>
                    <input type="date" />
                  </div>
                </div>

                <div className="section-title">Participantes</div>

                <div className="form-group">
                  <div className="checkbox-group">
                    <input type="checkbox" id="allTeam" />
                    <label htmlFor="allTeam">Todos da minha equipe (15 funcionários)</label>
                  </div>
                  <div className="checkbox-group">
                    <input type="checkbox" id="manual" />
                    <label htmlFor="manual">Seleção manual</label>
                  </div>
                </div>

                <div className="section-title">Categorias de Perguntas</div>

                <div className="categories-selection">
                  <div className="checkbox-group">
                    <input type="checkbox" id="cat1" defaultChecked />
                    <label htmlFor="cat1">Competências Técnicas (12 perguntas)</label>
                  </div>
                  <div className="checkbox-group">
                    <input type="checkbox" id="cat2" defaultChecked />
                    <label htmlFor="cat2">Habilidades Comportamentais (8 perguntas)</label>
                  </div>
                  <div className="checkbox-group">
                    <input type="checkbox" id="cat3" defaultChecked />
                    <label htmlFor="cat3">Trabalho em Equipe (6 perguntas)</label>
                  </div>
                  <div className="checkbox-group">
                    <input type="checkbox" id="cat4" />
                    <label htmlFor="cat4">Liderança (5 perguntas)</label>
                  </div>
                  <div className="checkbox-group">
                    <input type="checkbox" id="cat5" />
                    <label htmlFor="cat5">Inovação (4 perguntas)</label>
                  </div>
                  <div className="checkbox-group">
                    <input type="checkbox" id="cat6" />
                    <label htmlFor="cat6">Comunicação (7 perguntas)</label>
                  </div>
                </div>

                <p className="total-questions">Total: 26 perguntas selecionadas</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowNewCycleModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-secondary">
                  Salvar Rascunho
                </button>
                <button className="btn btn-primary">
                  Criar e Iniciar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .feedbacks-page {
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

        .subtitle {
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
          text-decoration: none;
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

        /* Tabs */
        .tabs {
          display: flex;
          gap: var(--spacing-sm);
          border-bottom: 1px solid var(--gray-200);
          padding-bottom: 0;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-600);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.2s ease;
        }

        .tab:hover {
          color: var(--primary-dark);
        }

        .tab.active {
          color: var(--primary-dark);
          border-bottom-color: var(--primary-dark);
        }

        .badge-count {
          background-color: var(--error);
          color: var(--white);
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }

        /* Metrics Row */
        .metrics-row {
          display: flex;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .metric-mini {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
        }

        .metric-mini > div {
          display: flex;
          flex-direction: column;
        }

        .metric-number {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        .metric-label {
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .text-warning { color: var(--warning); }
        .text-success { color: var(--success); }
        .text-error { color: var(--error); }

        /* Feedbacks List */
        .feedbacks-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .feedback-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          transition: all 0.2s ease;
        }

        .feedback-card:hover {
          box-shadow: var(--shadow-md);
        }

        .feedback-card.urgent {
          border-left: 4px solid var(--error);
        }

        .feedback-card.completed {
          border-left: 4px solid var(--success);
          opacity: 0.8;
        }

        .feedback-info {
          flex: 1;
        }

        .feedback-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-sm);
        }

        .feedback-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin: 0;
        }

        .feedback-type {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin-bottom: var(--spacing-sm);
        }

        .feedback-meta {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
        }

        .feedback-meta span {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.8125rem;
          color: var(--gray-600);
        }

        .feedback-progress {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .progress-bar {
          flex: 1;
          max-width: 200px;
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

        .progress-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
          min-width: 40px;
        }

        .badge {
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .badge-success { background-color: #D4EDDA; color: #155724; }
        .badge-warning { background-color: #FFF3CD; color: #856404; }
        .badge-error { background-color: #F8D7DA; color: #721C24; }
        .badge-info { background-color: #D1ECF1; color: #0C5460; }
        .badge-muted { background-color: var(--gray-200); color: var(--gray-700); }
        .badge-primary { background-color: var(--primary-light); color: var(--primary-dark); }

        /* Cycles Section */
        .filters-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--gray-600);
        }

        .filter-group select {
          padding: 8px 12px;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          background-color: var(--white);
        }

        .results-count {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        /* Cycles List */
        .cycles-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .cycle-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .cycle-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
          border-bottom: 1px solid var(--gray-200);
        }

        .cycle-title-row {
          display: flex;
          gap: var(--spacing-md);
        }

        .cycle-icon {
          width: 48px;
          height: 48px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cycle-title-row h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .cycle-badges {
          display: flex;
          gap: var(--spacing-sm);
        }

        .cycle-actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .cycle-details {
          padding: var(--spacing-lg);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
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

        .percentage {
          color: var(--gray-500);
          margin-left: var(--spacing-xs);
        }

        .categories-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
          margin-bottom: var(--spacing-md);
        }

        .categories-label {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .categories-tags {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }

        .category-tag {
          padding: 4px 10px;
          background-color: var(--gray-100);
          color: var(--gray-700);
          border-radius: 20px;
          font-size: 0.75rem;
        }

        .cycle-progress .progress-bar {
          max-width: 100%;
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

        .modal-lg {
          max-width: 700px;
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
        }

        .modal-body {
          padding: var(--spacing-lg);
        }

        .section-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-700);
          margin-bottom: var(--spacing-md);
          margin-top: var(--spacing-lg);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-title:first-child {
          margin-top: 0;
        }

        .form-group {
          margin-bottom: var(--spacing-md);
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
          margin-bottom: var(--spacing-xs);
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary-medium);
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--primary-dark);
        }

        .checkbox-group label {
          font-size: 0.875rem;
          color: var(--gray-700);
          margin: 0;
          cursor: pointer;
        }

        .categories-selection {
          background-color: var(--gray-50);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
        }

        .total-questions {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin-top: var(--spacing-md);
          font-weight: 500;
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

          .feedback-card {
            flex-direction: column;
            align-items: stretch;
          }

          .feedback-actions {
            margin-top: var(--spacing-md);
          }

          .feedback-actions .btn {
            width: 100%;
            justify-content: center;
          }

          .cycle-header {
            flex-direction: column;
          }

          .cycle-actions {
            width: 100%;
            flex-wrap: wrap;
          }

          .cycle-actions .btn {
            flex: 1;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .tabs {
            overflow-x: auto;
          }
        }
      `}</style>
    </MainLayout>
  )
}
