'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import { 
  User, 
  Target, 
  Calendar, 
  AlertCircle,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  // Dados mockados - em produção viriam de uma API

  const dashboardData = {
    status: 'ATIVO',
    pdiObjectives: 2,
    pdiProgress: 75,
    nextFeedback: 15,
    skills: [
      { name: 'JavaScript', level: 3, maxLevel: 5 },
      { name: 'React', level: 2, maxLevel: 5 },
      { name: 'Node.js', level: 4, maxLevel: 5 },
      { name: 'Python', level: 1, maxLevel: 5 },
      { name: 'Docker', level: 3, maxLevel: 5 },
      { name: 'AWS', level: 2, maxLevel: 5 }
    ],
    pendingActions: [
      {
        id: 1,
        title: 'Autoavaliação Q1 2026',
        description: 'Prazo: 15/02/2026',
        type: 'feedback',
        urgent: true
      },
      {
        id: 2,
        title: 'Atualizar objetivo PDI "AWS Certification"',
        description: 'Registrar progresso do curso online',
        type: 'pdi',
        urgent: false
      },
      {
        id: 3,
        title: 'Agendar 1:1 com gestor',
        description: 'Reunião mensal de acompanhamento',
        type: 'meeting',
        urgent: false
      }
    ]
  }

  const renderSkillLevel = (level: number, maxLevel: number) => {
    return (
      <div className="skill-level">
        {Array.from({ length: maxLevel }, (_, i) => (
          <div 
            key={i} 
            className={`skill-dot ${i < level ? 'filled' : ''}`}
          />
        ))}
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="dashboard">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Dashboard</span>
        </div>

        {/* Cards de Métricas */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon status">
              <User size={24} />
            </div>
            <div className="metric-content">
              <h3>Meu Status</h3>
              <p className="metric-value success">{dashboardData.status}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon pdi">
              <Target size={24} />
            </div>
            <div className="metric-content">
              <h3>PDI Ativo</h3>
              <p className="metric-value">{dashboardData.pdiObjectives} objetivos</p>
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${dashboardData.pdiProgress}%` }}
                  />
                </div>
                <span className="progress-text">{dashboardData.pdiProgress}%</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon feedback">
              <Calendar size={24} />
            </div>
            <div className="metric-content">
              <h3>Próx. Feedback</h3>
              <p className="metric-value warning">{dashboardData.nextFeedback} dias</p>
            </div>
          </div>
        </div>

        {/* Competências Técnicas */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Minhas Competências Técnicas</h2>
          </div>
          <div className="skills-grid">
            {dashboardData.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level-text">({skill.level}/{skill.maxLevel})</span>
                </div>
                {renderSkillLevel(skill.level, skill.maxLevel)}
              </div>
            ))}
          </div>
        </div>

        {/* Ações Pendentes */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Ações Pendentes</h2>
          </div>
          <div className="actions-list">
            {dashboardData.pendingActions.map((action) => (
              <div key={action.id} className={`action-item ${action.urgent ? 'urgent' : ''}`}>
                <div className="action-icon">
                  {action.type === 'feedback' && <MessageSquare size={20} />}
                  {action.type === 'pdi' && <Target size={20} />}
                  {action.type === 'meeting' && <Calendar size={20} />}
                </div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                  <p className="action-description">{action.description}</p>
                </div>
                <div className="action-status">
                  {action.urgent ? (
                    <AlertCircle size={20} className="text-warning" />
                  ) : (
                    <Clock size={20} className="text-muted" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
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
          margin-bottom: var(--spacing-md);
        }

        .breadcrumb-separator {
          color: var(--gray-400);
        }

        .breadcrumb-current {
          color: var(--primary-dark);
          font-weight: 500;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-lg);
        }

        .metric-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          transition: box-shadow 0.2s ease;
        }

        .metric-card:hover {
          box-shadow: var(--shadow-md);
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
        }

        .metric-icon.status {
          background-color: var(--success);
        }

        .metric-icon.pdi {
          background-color: var(--primary-medium);
        }

        .metric-icon.feedback {
          background-color: var(--warning);
        }

        .metric-content {
          flex: 1;
        }

        .metric-content h3 {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-600);
          margin-bottom: var(--spacing-sm);
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
        }

        .metric-value.success {
          color: var(--success);
        }

        .metric-value.warning {
          color: var(--warning);
        }

        .progress-container {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .progress-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-600);
          min-width: 35px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
        }

        .skill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background-color: var(--gray-50);
          border-radius: var(--radius-sm);
          border: 1px solid var(--gray-200);
        }

        .skill-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .skill-name {
          font-weight: 500;
          color: var(--gray-900);
        }

        .skill-level-text {
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .actions-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .action-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background-color: var(--gray-50);
          border-radius: var(--radius-sm);
          border: 1px solid var(--gray-200);
          transition: all 0.2s ease;
        }

        .action-item:hover {
          background-color: var(--white);
          box-shadow: var(--shadow-sm);
        }

        .action-item.urgent {
          border-left: 4px solid var(--warning);
          background-color: #FFFBF0;
        }

        .action-icon {
          width: 40px;
          height: 40px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-content {
          flex: 1;
        }

        .action-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .action-description {
          font-size: 0.75rem;
          color: var(--gray-600);
          margin: 0;
        }

        .action-status {
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .skill-item {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}

// Componente MessageSquare (substituto do lucide-react)
function MessageSquare({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}