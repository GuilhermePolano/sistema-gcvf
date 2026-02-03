'use client'

import MainLayout from '@/components/Layout/MainLayout'
import { useState } from 'react'
import { 
  Filter, 
  Download, 
  Eye,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'

export default function CompetenciasPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    entidade: 'FIERGS',
    setor: 'Todos',
    nivel: 'Todos',
    area: 'Todos'
  })

  // Dados mockados - em produção viriam de uma API
  const user = {
    name: 'Maria Gerente',
    role: 'Gerente',
    entity: 'FIERGS - GINFO',
    userRole: 'gerente' as const
  }

  const tecnologias = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Docker', 'AWS'
  ] as const

  type Tecnologia = typeof tecnologias[number]

  const funcionarios: Array<{
    id: number
    nome: string
    cargo: string
    nivel: string
    area: string
    competencias: Record<Tecnologia, number>
  }> = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor Pleno',
      nivel: 'Pleno',
      area: 'Técnico',
      competencias: {
        'JavaScript': 3,
        'React': 2,
        'Node.js': 4,
        'Python': 1,
        'Docker': 3,
        'AWS': 2
      }
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Analista Sênior',
      nivel: 'Sênior',
      area: 'Técnico',
      competencias: {
        'JavaScript': 5,
        'React': 3,
        'Node.js': 2,
        'Python': 4,
        'Docker': 1,
        'AWS': 3
      }
    },
    {
      id: 3,
      nome: 'Pedro Lima',
      cargo: 'Desenvolvedor Júnior',
      nivel: 'Júnior',
      area: 'Técnico',
      competencias: {
        'JavaScript': 2,
        'React': 3,
        'Node.js': 4,
        'Python': 2,
        'Docker': 4,
        'AWS': 1
      }
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Analista de Negócios',
      nivel: 'Pleno',
      area: 'Negócios',
      competencias: {
        'JavaScript': 1,
        'React': 1,
        'Node.js': 0,
        'Python': 2,
        'Docker': 0,
        'AWS': 2
      }
    },
    {
      id: 5,
      nome: 'Carlos Rocha',
      cargo: 'Desenvolvedor Pleno',
      nivel: 'Pleno',
      area: 'Técnico',
      competencias: {
        'JavaScript': 3,
        'React': 2,
        'Node.js': 4,
        'Python': 1,
        'Docker': 4,
        'AWS': 2
      }
    }
  ]

  // Calcular médias e gaps
  const calcularEstatisticas = () => {
    const stats = tecnologias.map(tech => {
      const valores = funcionarios.map(f => f.competencias[tech] || 0)
      const media = valores.reduce((a, b) => a + b, 0) / valores.length
      const gap = media < 2.5 // Considera gap crítico se média < 2.5
      
      return {
        tecnologia: tech,
        media: Number(media.toFixed(1)),
        gap: gap,
        trend: Math.random() > 0.5 ? 'up' : 'down' // Mock trend
      }
    })
    
    return stats
  }

  const estatisticas = calcularEstatisticas()

  const getCompetenciaColor = (nivel: number) => {
    if (nivel === 0) return 'competencia-0'
    if (nivel === 1) return 'competencia-1'
    if (nivel === 2) return 'competencia-2'
    if (nivel === 3) return 'competencia-3'
    if (nivel === 4) return 'competencia-4'
    if (nivel === 5) return 'competencia-5'
    return 'competencia-0'
  }

  const renderCompetenciaCell = (nivel: number) => {
    const dots = Array.from({ length: 5 }, (_, i) => (
      <div 
        key={i} 
        className={`competencia-dot ${i < nivel ? 'filled' : ''}`}
      />
    ))
    
    return (
      <div className="competencia-cell">
        <div className="competencia-dots">
          {dots}
        </div>
        <span className="competencia-nivel">({nivel})</span>
      </div>
    )
  }

  return (
    <MainLayout user={user}>
      <div className="competencias-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Relatórios</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Matriz de Competências</span>
        </div>

        {/* Header da Página */}
        <div className="page-header">
          <div className="page-title-section">
            <h1>Matriz de Competências</h1>
            <p className="page-subtitle">Visualize as competências técnicas da equipe</p>
          </div>
          <button className="btn btn-primary">
            <Download size={20} />
            Exportar
          </button>
        </div>

        {/* Filtros */}
        <div className="filters-card">
          <div className="filters-header">
            <h3>Filtros</h3>
          </div>
          <div className="filters-grid">
            <div className="form-group">
              <label className="form-label">Entidade</label>
              <select 
                className="form-select"
                value={selectedFilters.entidade}
                onChange={(e) => setSelectedFilters({...selectedFilters, entidade: e.target.value})}
              >
                <option value="FIERGS">FIERGS</option>
                <option value="SESI">SESI</option>
                <option value="SENAI">SENAI</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Setor</label>
              <select 
                className="form-select"
                value={selectedFilters.setor}
                onChange={(e) => setSelectedFilters({...selectedFilters, setor: e.target.value})}
              >
                <option value="Todos">Todos</option>
                <option value="GINFO">GINFO</option>
                <option value="RH">RH</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Nível</label>
              <select 
                className="form-select"
                value={selectedFilters.nivel}
                onChange={(e) => setSelectedFilters({...selectedFilters, nivel: e.target.value})}
              >
                <option value="Todos">Todos</option>
                <option value="Estagiário">Estagiário</option>
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Área</label>
              <select 
                className="form-select"
                value={selectedFilters.area}
                onChange={(e) => setSelectedFilters({...selectedFilters, area: e.target.value})}
              >
                <option value="Todos">Todos</option>
                <option value="Técnico">Técnico</option>
                <option value="Negócios">Negócios</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estatísticas Resumidas */}
        <div className="stats-grid">
          {estatisticas.map((stat) => (
            <div key={stat.tecnologia} className="stat-card">
              <div className="stat-header">
                <h4>{stat.tecnologia}</h4>
                <div className={`trend-icon ${stat.trend}`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  Média: <strong>{stat.media}/5</strong>
                </div>
                <div className={`stat-status ${stat.gap ? 'gap' : 'ok'}`}>
                  {stat.gap ? 'Gap Crítico' : 'Adequado'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Matriz de Competências */}
        <div className="matrix-card">
          <div className="matrix-header">
            <h3>Skills Matrix - {funcionarios.length} funcionários</h3>
            <div className="matrix-actions">
              <button className="btn btn-sm btn-secondary">
                <Eye size={16} />
                Visualizar Detalhes
              </button>
            </div>
          </div>

          <div className="matrix-container">
            <div className="matrix-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="funcionario-col">Funcionário</th>
                    {tecnologias.map((tech) => (
                      <th key={tech} className="tech-col">{tech}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((funcionario) => (
                    <tr key={funcionario.id}>
                      <td className="funcionario-cell">
                        <div className="funcionario-info">
                          <div className="funcionario-nome">{funcionario.nome}</div>
                          <div className="funcionario-cargo">{funcionario.cargo}</div>
                        </div>
                      </td>
                      {tecnologias.map((tech) => (
                        <td key={tech} className="competencia-td">
                          {renderCompetenciaCell(funcionario.competencias[tech] || 0)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="media-row">
                    <td className="funcionario-cell">
                      <strong>Média da Equipe</strong>
                    </td>
                    {tecnologias.map((tech) => {
                      const stat = estatisticas.find(s => s.tecnologia === tech)
                      return (
                        <td key={tech} className="media-cell">
                          <strong>{stat?.media}</strong>
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="gap-row">
                    <td className="funcionario-cell">
                      <strong>Gap Crítico</strong>
                    </td>
                    {tecnologias.map((tech) => {
                      const stat = estatisticas.find(s => s.tecnologia === tech)
                      return (
                        <td key={tech} className="gap-cell">
                          <span className={stat?.gap ? 'gap-sim' : 'gap-nao'}>
                            {stat?.gap ? 'Sim' : 'Não'}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Legenda */}
          <div className="matrix-legend">
            <h4>Legenda:</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-dots">
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                </div>
                <span>(5) Expert</span>
              </div>
              <div className="legend-item">
                <div className="legend-dots">
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot"></div>
                </div>
                <span>(4) Avançado</span>
              </div>
              <div className="legend-item">
                <div className="legend-dots">
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                </div>
                <span>(3) Intermediário</span>
              </div>
              <div className="legend-item">
                <div className="legend-dots">
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                </div>
                <span>(2) Básico</span>
              </div>
              <div className="legend-item">
                <div className="legend-dots">
                  <div className="competencia-dot filled"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                </div>
                <span>(1) Iniciante</span>
              </div>
              <div className="legend-item">
                <div className="legend-dots">
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                  <div className="competencia-dot"></div>
                </div>
                <span>(0) Sem conhecimento</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .competencias-page {
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
        }

        .page-title-section h1 {
          font-size: 2rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-sm);
        }

        .page-subtitle {
          color: var(--gray-600);
          font-size: 1rem;
          margin: 0;
        }

        .filters-card {
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
        }

        .filters-header h3 {
          margin-bottom: var(--spacing-md);
          font-size: 1.125rem;
          font-weight: 600;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
        }

        .stat-card {
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }

        .stat-header h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0;
        }

        .trend-icon.up {
          color: var(--success);
        }

        .trend-icon.down {
          color: var(--error);
        }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .stat-value {
          font-size: 0.875rem;
          color: var(--gray-700);
        }

        .stat-status {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          text-align: center;
        }

        .stat-status.gap {
          background-color: #FEF2F2;
          color: var(--error);
        }

        .stat-status.ok {
          background-color: #F0FDF4;
          color: var(--success);
        }

        .matrix-card {
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
        }

        .matrix-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }

        .matrix-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .matrix-container {
          overflow-x: auto;
          margin-bottom: var(--spacing-lg);
        }

        .matrix-table {
          min-width: 800px;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th,
        .table td {
          padding: var(--spacing-md);
          text-align: center;
          border: 1px solid var(--gray-200);
        }

        .table th {
          background-color: var(--gray-50);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .funcionario-col {
          text-align: left;
          min-width: 200px;
        }

        .tech-col {
          min-width: 100px;
        }

        .funcionario-cell {
          text-align: left !important;
        }

        .funcionario-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .funcionario-nome {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .funcionario-cargo {
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .competencia-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .competencia-dots {
          display: flex;
          gap: 2px;
        }

        .competencia-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--gray-200);
        }

        .competencia-dot.filled {
          background-color: var(--primary-medium);
        }

        .competencia-nivel {
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .media-row {
          background-color: var(--gray-50);
          font-weight: 600;
        }

        .media-cell {
          color: var(--primary-dark);
        }

        .gap-row {
          background-color: var(--gray-50);
        }

        .gap-sim {
          color: var(--error);
          font-weight: 500;
        }

        .gap-nao {
          color: var(--success);
          font-weight: 500;
        }

        .matrix-legend {
          border-top: 1px solid var(--gray-200);
          padding-top: var(--spacing-lg);
        }

        .matrix-legend h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--spacing-md);
        }

        .legend-items {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-lg);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .legend-dots {
          display: flex;
          gap: 2px;
        }

        .legend-item span {
          font-size: 0.875rem;
          color: var(--gray-700);
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .matrix-header {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-md);
          }

          .legend-items {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </MainLayout>
  )
}