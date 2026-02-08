'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import {
  FileText,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  ThumbsUp,
  AlertTriangle,
  Target,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart,
  Users
} from 'lucide-react'

interface FeedbackReport {
  id: number
  cycleName: string
  period: string
  employee: string
  status: 'disponivel' | 'em_analise'
  overallScore: number
  strengths: string[]
  improvements: string[]
  agreements: { text: string; deadline: string; status: 'pendente' | 'concluido' }[]
  categories: { name: string; score: number; trend: 'up' | 'down' | 'stable' }[]
}

export default function RelatoriosPage() {
  const { user } = useAuth()
  const [expandedReport, setExpandedReport] = useState<number | null>(1)
  const [filterPeriod, setFilterPeriod] = useState('todos')
  const [activeView, setActiveView] = useState<'individual' | 'equipe'>('individual')



  const reports: FeedbackReport[] = [
    {
      id: 1,
      cycleName: 'Avaliação Q4 2025',
      period: 'Out - Dez 2025',
      employee: 'João Silva',
      status: 'disponivel',
      overallScore: 4.2,
      strengths: [
        'Conhecimento técnico sólido em JavaScript e Node.js',
        'Proatividade em identificar e resolver problemas',
        'Excelente trabalho em equipe e colaboração',
        'Comprometimento com prazos e entregas'
      ],
      improvements: [
        'Comunicação em apresentações públicas',
        'Gestão de tempo em múltiplas tarefas',
        'Documentação de código e processos'
      ],
      agreements: [
        { text: 'Participar de curso de oratória até março/2026', deadline: '31/03/2026', status: 'pendente' },
        { text: 'Implementar metodologia de documentação no projeto', deadline: '28/02/2026', status: 'pendente' },
        { text: 'Usar ferramenta de gestão de tempo por 3 meses', deadline: '30/04/2026', status: 'pendente' }
      ],
      categories: [
        { name: 'Competências Técnicas', score: 4.5, trend: 'up' },
        { name: 'Habilidades Comportamentais', score: 4.0, trend: 'stable' },
        { name: 'Trabalho em Equipe', score: 4.3, trend: 'up' },
        { name: 'Comunicação', score: 3.8, trend: 'down' }
      ]
    },
    {
      id: 2,
      cycleName: 'Avaliação Q3 2025',
      period: 'Jul - Set 2025',
      employee: 'João Silva',
      status: 'disponivel',
      overallScore: 4.0,
      strengths: [
        'Conhecimento técnico em JavaScript',
        'Bom trabalho em equipe',
        'Proatividade'
      ],
      improvements: [
        'Conhecimento em cloud computing',
        'Comunicação em inglês',
        'Documentação de código'
      ],
      agreements: [
        { text: 'Iniciar curso de AWS', deadline: '31/10/2025', status: 'concluido' },
        { text: 'Praticar inglês técnico', deadline: '31/12/2025', status: 'concluido' }
      ],
      categories: [
        { name: 'Competências Técnicas', score: 4.2, trend: 'stable' },
        { name: 'Habilidades Comportamentais', score: 3.9, trend: 'up' },
        { name: 'Trabalho em Equipe', score: 4.0, trend: 'stable' },
        { name: 'Comunicação', score: 3.9, trend: 'stable' }
      ]
    }
  ]

  // Métricas da equipe (visão gerente/coordenador)
  const teamMetrics = {
    totalEmployees: 15,
    avgScore: 4.1,
    completedFeedbacks: 14,
    pendingFeedbacks: 1,
    topStrengths: ['Trabalho em Equipe', 'Competências Técnicas', 'Comprometimento'],
    commonImprovements: ['Documentação', 'Comunicação', 'Gestão de Tempo']
  }

  const toggleReport = (id: number) => {
    setExpandedReport(expandedReport === id ? null : id)
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'excellent'
    if (score >= 4.0) return 'good'
    if (score >= 3.5) return 'average'
    return 'needs-improvement'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="trend-up" />
      case 'down': return <TrendingDown size={16} className="trend-down" />
      default: return <span className="trend-stable">―</span>
    }
  }

  return (
    <ProtectedRoute>
      <MainLayout>
      <div className="relatorios-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Relatórios</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-info">
            <h1>Relatórios de Feedback</h1>
            <p className="subtitle">Visualize seus resultados e acompanhe sua evolução</p>
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Exportar PDF
          </button>
        </div>

        {/* Tabs para Gerente/Coordenador */}
        {user && user.perfil !== 'funcionario' && (
          <div className="view-tabs">
            <button
              className={`view-tab ${activeView === 'individual' ? 'active' : ''}`}
              onClick={() => setActiveView('individual')}
            >
              <FileText size={18} />
              Meus Relatórios
            </button>
            <button
              className={`view-tab ${activeView === 'equipe' ? 'active' : ''}`}
              onClick={() => setActiveView('equipe')}
            >
              <Users size={18} />
              Visão da Equipe
            </button>
          </div>
        )}

        {/* Filtros */}
        <div className="filters-row">
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
            >
              <option value="todos">Todos os períodos</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <span className="results-count">{reports.length} relatórios disponíveis</span>
        </div>

        {/* Resumo de Evolução */}
        <div className="evolution-card">
          <div className="evolution-header">
            <BarChart3 size={20} />
            <h3>Sua Evolução</h3>
          </div>
          <div className="evolution-content">
            <div className="score-display">
              <div className="current-score">
                <span className="score-label">Última Avaliação</span>
                <span className={`score-value ${getScoreColor(reports[0]?.overallScore || 0)}`}>
                  {reports[0]?.overallScore.toFixed(1)}
                </span>
                <span className="score-max">/5.0</span>
              </div>
              <div className="score-change">
                <TrendingUp size={20} className="trend-up" />
                <span>+0.2 vs anterior</span>
              </div>
            </div>
            <div className="categories-summary">
              {reports[0]?.categories.map((cat, index) => (
                <div key={index} className="category-item">
                  <span className="category-name">{cat.name}</span>
                  <div className="category-score-bar">
                    <div
                      className="category-fill"
                      style={{ width: `${(cat.score / 5) * 100}%` }}
                    />
                  </div>
                  <div className="category-score">
                    <span>{cat.score.toFixed(1)}</span>
                    {getTrendIcon(cat.trend)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Relatórios */}
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div
                className="report-header"
                onClick={() => toggleReport(report.id)}
              >
                <div className="report-icon">
                  <FileText size={24} />
                </div>
                <div className="report-info">
                  <h3>{report.cycleName}</h3>
                  <div className="report-meta">
                    <span>
                      <Calendar size={14} />
                      {report.period}
                    </span>
                    <span className={`overall-score ${getScoreColor(report.overallScore)}`}>
                      Nota Geral: {report.overallScore.toFixed(1)}/5.0
                    </span>
                  </div>
                </div>
                <button className="expand-btn">
                  {expandedReport === report.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>

              {expandedReport === report.id && (
                <div className="report-details">
                  {/* Pontos Fortes e Melhorias */}
                  <div className="feedback-grid">
                    <div className="feedback-section strengths">
                      <div className="section-header">
                        <ThumbsUp size={18} />
                        <h4>Pontos Fortes</h4>
                      </div>
                      <ul className="feedback-list">
                        {report.strengths.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="feedback-section improvements">
                      <div className="section-header">
                        <AlertTriangle size={18} />
                        <h4>Áreas de Melhoria</h4>
                      </div>
                      <ul className="feedback-list">
                        {report.improvements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Acordos e Planos de Ação */}
                  <div className="agreements-section">
                    <div className="section-header">
                      <Target size={18} />
                      <h4>Acordos e Planos de Ação</h4>
                    </div>
                    <div className="agreements-list">
                      {report.agreements.map((agreement, index) => (
                        <div
                          key={index}
                          className={`agreement-item ${agreement.status}`}
                        >
                          <span className="agreement-number">{index + 1}</span>
                          <div className="agreement-content">
                            <p>{agreement.text}</p>
                            <span className="agreement-deadline">
                              <Calendar size={12} />
                              Prazo: {agreement.deadline}
                            </span>
                          </div>
                          <span className={`agreement-status badge-${agreement.status === 'concluido' ? 'success' : 'warning'}`}>
                            {agreement.status === 'concluido' ? 'Concluído' : 'Pendente'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categorias Detalhadas */}
                  <div className="categories-detail">
                    <h4>Desempenho por Categoria</h4>
                    <div className="categories-grid">
                      {report.categories.map((cat, index) => (
                        <div key={index} className="category-card">
                          <div className="category-header">
                            <span className="category-title">{cat.name}</span>
                            {getTrendIcon(cat.trend)}
                          </div>
                          <div className="category-score-display">
                            <span className={`big-score ${getScoreColor(cat.score)}`}>
                              {cat.score.toFixed(1)}
                            </span>
                            <div className="score-bar">
                              <div
                                className={`score-fill ${getScoreColor(cat.score)}`}
                                style={{ width: `${(cat.score / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="report-actions">
                    <button className="btn btn-outline btn-sm">
                      <Download size={16} />
                      Exportar PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .relatorios-page {
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

        /* View Tabs */
        .view-tabs {
          display: flex;
          gap: var(--spacing-sm);
          border-bottom: 1px solid var(--gray-200);
        }

        .view-tab {
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

        .view-tab:hover {
          color: var(--primary-dark);
        }

        .view-tab.active {
          color: var(--primary-dark);
          border-bottom-color: var(--primary-dark);
        }

        /* Filters */
        .filters-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-md);
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

        /* Evolution Card */
        .evolution-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
        }

        .evolution-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--primary-dark);
          margin-bottom: var(--spacing-lg);
        }

        .evolution-header h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .evolution-content {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: var(--spacing-xl);
        }

        .score-display {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .current-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .score-label {
          font-size: 0.75rem;
          color: var(--gray-500);
          text-transform: uppercase;
        }

        .score-value {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1;
        }

        .score-value.excellent { color: #15803D; }
        .score-value.good { color: var(--success); }
        .score-value.average { color: var(--warning); }
        .score-value.needs-improvement { color: var(--error); }

        .score-max {
          font-size: 1rem;
          color: var(--gray-500);
        }

        .score-change {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xs);
          font-size: 0.875rem;
          color: var(--success);
        }

        .trend-up { color: var(--success); }
        .trend-down { color: var(--error); }
        .trend-stable { color: var(--gray-500); font-weight: bold; }

        .categories-summary {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .category-name {
          width: 180px;
          font-size: 0.875rem;
          color: var(--gray-700);
        }

        .category-score-bar {
          flex: 1;
          height: 8px;
          background-color: var(--gray-200);
          border-radius: 4px;
          overflow: hidden;
        }

        .category-fill {
          height: 100%;
          background-color: var(--primary-medium);
          border-radius: 4px;
        }

        .category-score {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          width: 60px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
        }

        /* Reports List */
        .reports-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .report-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .report-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .report-header:hover {
          background-color: var(--gray-50);
        }

        .report-icon {
          width: 48px;
          height: 48px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .report-info {
          flex: 1;
        }

        .report-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .report-meta {
          display: flex;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .report-meta span {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .overall-score {
          font-weight: 600;
        }

        .overall-score.excellent { color: #15803D; }
        .overall-score.good { color: var(--success); }
        .overall-score.average { color: var(--warning); }
        .overall-score.needs-improvement { color: var(--error); }

        .expand-btn {
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
        }

        .expand-btn:hover {
          background-color: var(--gray-100);
          color: var(--primary-dark);
        }

        /* Report Details */
        .report-details {
          padding: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
          background-color: var(--gray-50);
        }

        .feedback-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        .feedback-section {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          border: 1px solid var(--gray-200);
        }

        .feedback-section.strengths {
          border-left: 4px solid var(--success);
        }

        .feedback-section.improvements {
          border-left: 4px solid var(--warning);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }

        .feedback-section.strengths .section-header { color: var(--success); }
        .feedback-section.improvements .section-header { color: var(--warning); }
        .agreements-section .section-header { color: var(--primary-dark); }

        .section-header h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0;
        }

        .feedback-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .feedback-list li {
          padding-left: var(--spacing-md);
          position: relative;
          font-size: 0.875rem;
          color: var(--gray-700);
          line-height: 1.5;
        }

        .feedback-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--gray-400);
        }

        /* Agreements Section */
        .agreements-section {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          border: 1px solid var(--gray-200);
          margin-bottom: var(--spacing-lg);
        }

        .agreements-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .agreement-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background-color: var(--gray-50);
          border-radius: var(--radius-sm);
        }

        .agreement-item.concluido {
          opacity: 0.7;
        }

        .agreement-number {
          width: 24px;
          height: 24px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .agreement-content {
          flex: 1;
        }

        .agreement-content p {
          font-size: 0.875rem;
          color: var(--gray-800);
          margin-bottom: var(--spacing-xs);
        }

        .agreement-deadline {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .agreement-status {
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

        /* Categories Detail */
        .categories-detail {
          margin-bottom: var(--spacing-lg);
        }

        .categories-detail h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-md);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
        }

        .category-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          border: 1px solid var(--gray-200);
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }

        .category-title {
          font-size: 0.8125rem;
          color: var(--gray-600);
        }

        .category-score-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .big-score {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .big-score.excellent { color: #15803D; }
        .big-score.good { color: var(--success); }
        .big-score.average { color: var(--warning); }
        .big-score.needs-improvement { color: var(--error); }

        .score-bar {
          flex: 1;
          height: 8px;
          background-color: var(--gray-200);
          border-radius: 4px;
          overflow: hidden;
        }

        .score-fill {
          height: 100%;
          border-radius: 4px;
        }

        .score-fill.excellent { background-color: #15803D; }
        .score-fill.good { background-color: var(--success); }
        .score-fill.average { background-color: var(--warning); }
        .score-fill.needs-improvement { background-color: var(--error); }

        .report-actions {
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
          }

          .evolution-content {
            grid-template-columns: 1fr;
          }

          .current-score {
            flex-direction: row;
            gap: var(--spacing-sm);
          }

          .feedback-grid {
            grid-template-columns: 1fr;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }

          .category-name {
            width: 120px;
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
