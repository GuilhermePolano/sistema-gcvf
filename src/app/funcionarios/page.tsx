'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  MoreVertical,
  User
} from 'lucide-react'

export default function FuncionariosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Dados mockados - em produção viriam de uma API

  const funcionarios = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Desenvolvedor',
      nivel: 'Pleno',
      area: 'Técnico',
      entidade: 'FIERGS',
      setor: 'GINFO',
      email: 'joao.silva@fiergs.org.br',
      dataAdmissao: '2023-01-15',
      status: 'Ativo',
      stacks: ['JavaScript', 'React', 'Node.js']
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cargo: 'Analista de Sistemas',
      nivel: 'Sênior',
      area: 'Técnico',
      entidade: 'FIERGS',
      setor: 'GINFO',
      email: 'maria.santos@fiergs.org.br',
      dataAdmissao: '2021-03-10',
      status: 'Ativo',
      stacks: ['Python', 'Django', 'PostgreSQL']
    },
    {
      id: 3,
      nome: 'Pedro Lima',
      cargo: 'Desenvolvedor',
      nivel: 'Júnior',
      area: 'Técnico',
      entidade: 'FIERGS',
      setor: 'GINFO',
      email: 'pedro.lima@fiergs.org.br',
      dataAdmissao: '2024-06-01',
      status: 'Ativo',
      stacks: ['JavaScript', 'Vue.js', 'CSS']
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Analista de Negócios',
      nivel: 'Pleno',
      area: 'Negócios',
      entidade: 'FIERGS',
      setor: 'GINFO',
      email: 'ana.costa@fiergs.org.br',
      dataAdmissao: '2022-09-20',
      status: 'Ativo',
      stacks: ['Business Analysis', 'SQL', 'Power BI']
    }
  ]

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    funcionario.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getNivelBadgeClass = (nivel: string) => {
    switch (nivel) {
      case 'Estagiário': return 'badge-warning'
      case 'Júnior': return 'badge-info'
      case 'Pleno': return 'badge-primary'
      case 'Sênior': return 'badge-success'
      default: return 'badge-primary'
    }
  }

  return (
    <ProtectedRoute requiredRoles={['coordenador', 'gerente', 'administrador']}>
      <MainLayout>
        <div className="funcionarios-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Equipe</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Funcionários</span>
        </div>

        {/* Header da Página */}
        <div className="page-header">
          <div className="page-title-section">
            <h1>Funcionários</h1>
            <p className="page-subtitle">Gerencie os funcionários da sua equipe</p>
          </div>
          <Link href="/funcionarios/novo" className="btn btn-primary">
            <Plus size={20} />
            Novo Funcionário
          </Link>
        </div>

        {/* Filtros e Busca */}
        <div className="filters-section">
          <div className="search-container">
            <div className="search-input-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Buscar por nome, cargo ou email..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <button 
            className="btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filtros
          </button>
        </div>

        {/* Filtros Expandidos */}
        {showFilters && (
          <div className="filters-expanded">
            <div className="filters-grid">
              <div className="form-group">
                <label className="form-label">Nível</label>
                <select className="form-select">
                  <option value="">Todos os níveis</option>
                  <option value="estagiario">Estagiário</option>
                  <option value="junior">Júnior</option>
                  <option value="pleno">Pleno</option>
                  <option value="senior">Sênior</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Área</label>
                <select className="form-select">
                  <option value="">Todas as áreas</option>
                  <option value="tecnico">Técnico</option>
                  <option value="negocios">Negócios</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select">
                  <option value="">Todos os status</option>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Funcionários */}
        <div className="funcionarios-list">
          <div className="list-header">
            <h3>
              {filteredFuncionarios.length} funcionário{filteredFuncionarios.length !== 1 ? 's' : ''} encontrado{filteredFuncionarios.length !== 1 ? 's' : ''}
            </h3>
          </div>

          <div className="funcionarios-grid">
            {filteredFuncionarios.map((funcionario) => (
              <div key={funcionario.id} className="funcionario-card">
                <div className="funcionario-header">
                  <div className="funcionario-avatar">
                    <User size={24} />
                  </div>
                  <div className="funcionario-info">
                    <h4 className="funcionario-nome">{funcionario.nome}</h4>
                    <p className="funcionario-cargo">{funcionario.cargo}</p>
                  </div>
                  <div className="funcionario-actions">
                    <button className="action-btn">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                <div className="funcionario-details">
                  <div className="detail-row">
                    <span className="detail-label">Nível:</span>
                    <span className={`badge ${getNivelBadgeClass(funcionario.nivel)}`}>
                      {funcionario.nivel}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Área:</span>
                    <span className="detail-value">{funcionario.area}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{funcionario.email}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Admissão:</span>
                    <span className="detail-value">
                      {new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="funcionario-stacks">
                  <span className="stacks-label">Principais tecnologias:</span>
                  <div className="stacks-list">
                    {funcionario.stacks.slice(0, 3).map((stack, index) => (
                      <span key={index} className="stack-tag">
                        {stack}
                      </span>
                    ))}
                    {funcionario.stacks.length > 3 && (
                      <span className="stack-tag more">
                        +{funcionario.stacks.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="funcionario-footer">
                  <Link href={`/funcionarios/${funcionario.id}`} className="btn btn-sm btn-secondary">
                    <Eye size={16} />
                    Visualizar
                  </Link>
                  <Link href={`/funcionarios/${funcionario.id}/editar`} className="btn btn-sm btn-primary">
                    <Edit size={16} />
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .funcionarios-page {
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

        .filters-section {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .search-container {
          flex: 1;
        }

        .search-input-container {
          position: relative;
          max-width: 400px;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          border: 1px solid var(--gray-400);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
        }

        .filters-expanded {
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }

        .list-header h3 {
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--gray-700);
          margin: 0;
        }

        .funcionarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--spacing-lg);
        }

        .funcionario-card {
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          transition: all 0.2s ease;
        }

        .funcionario-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--primary-light);
        }

        .funcionario-header {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .funcionario-avatar {
          width: 48px;
          height: 48px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .funcionario-info {
          flex: 1;
        }

        .funcionario-nome {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .funcionario-cargo {
          color: var(--gray-600);
          font-size: 0.875rem;
          margin: 0;
        }

        .funcionario-actions {
          display: flex;
          align-items: center;
        }

        .action-btn {
          background: none;
          border: none;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          cursor: pointer;
          color: var(--gray-400);
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background-color: var(--gray-100);
          color: var(--gray-600);
        }

        .funcionario-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 0.875rem;
          color: var(--gray-600);
          font-weight: 500;
        }

        .detail-value {
          font-size: 0.875rem;
          color: var(--gray-900);
        }

        .funcionario-stacks {
          margin-bottom: var(--spacing-lg);
        }

        .stacks-label {
          font-size: 0.875rem;
          color: var(--gray-600);
          font-weight: 500;
          display: block;
          margin-bottom: var(--spacing-sm);
        }

        .stacks-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }

        .stack-tag {
          background-color: var(--primary-light);
          color: var(--primary-dark);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .stack-tag.more {
          background-color: var(--gray-200);
          color: var(--gray-600);
        }

        .funcionario-footer {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: flex-end;
        }

        .badge-info {
          background-color: #D1ECF1;
          color: #0C5460;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-input-container {
            max-width: none;
          }

          .funcionarios-grid {
            grid-template-columns: 1fr;
          }

          .funcionario-footer {
            justify-content: stretch;
          }

          .funcionario-footer .btn {
            flex: 1;
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}