'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import { useState } from 'react'
import {
  Plus,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Eye,
  Edit3,
  Trash2,
  Filter
} from 'lucide-react'

interface Ciclo {
  id: number
  nome: string
  tipo: '180' | '360'
  status: 'rascunho' | 'ativo' | 'pausado' | 'concluido'
  dataInicio: string
  dataFim: string
  participantes: number
  respostas: number
  categorias: string[]
}

export default function CiclosPage() {
  const [filtroStatus, setFiltroStatus] = useState('todos')



  const ciclos: Ciclo[] = [
    {
      id: 1,
      nome: 'Avaliacao Q1 2026',
      tipo: '360',
      status: 'ativo',
      dataInicio: '01/01/2026',
      dataFim: '28/02/2026',
      participantes: 45,
      respostas: 32,
      categorias: ['Tecnico', 'Comportamental', 'Lideranca']
    },
    {
      id: 2,
      nome: 'Feedback Semestral 2025',
      tipo: '180',
      status: 'concluido',
      dataInicio: '01/07/2025',
      dataFim: '31/08/2025',
      participantes: 38,
      respostas: 38,
      categorias: ['Tecnico', 'Comportamental']
    },
    {
      id: 3,
      nome: 'Avaliacao Q2 2026',
      tipo: '360',
      status: 'rascunho',
      dataInicio: '01/04/2026',
      dataFim: '31/05/2026',
      participantes: 0,
      respostas: 0,
      categorias: ['Tecnico', 'Lideranca']
    },
    {
      id: 4,
      nome: 'Avaliacao Anual 2025',
      tipo: '360',
      status: 'pausado',
      dataInicio: '01/11/2025',
      dataFim: '15/12/2025',
      participantes: 42,
      respostas: 18,
      categorias: ['Tecnico', 'Comportamental', 'Lideranca', 'Inovacao']
    }
  ]

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { bg: string, color: string, label: string }> = {
      'ativo': { bg: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', label: 'Ativo' },
      'rascunho': { bg: 'rgba(148, 163, 184, 0.15)', color: '#64748B', label: 'Rascunho' },
      'pausado': { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', label: 'Pausado' },
      'concluido': { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', label: 'Concluido' }
    }
    const config = configs[status]
    return (
      <span className="status-badge" style={{ background: config.bg, color: config.color }}>
        {config.label}
      </span>
    )
  }

  const filteredCiclos = filtroStatus === 'todos'
    ? ciclos
    : ciclos.filter(c => c.status === filtroStatus)

  return (
    <ProtectedRoute>
      <MainLayout>
      <div className="ciclos-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Ciclos de Avaliacao</h1>
            <p className="subtitle">Gerencie os ciclos de feedback da sua equipe</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            Novo Ciclo
          </button>
        </div>

        {/* Filtros */}
        <div className="filtros">
          <button
            className={`filtro-btn ${filtroStatus === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('todos')}
          >
            Todos ({ciclos.length})
          </button>
          <button
            className={`filtro-btn ${filtroStatus === 'ativo' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('ativo')}
          >
            Ativos ({ciclos.filter(c => c.status === 'ativo').length})
          </button>
          <button
            className={`filtro-btn ${filtroStatus === 'rascunho' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('rascunho')}
          >
            Rascunhos ({ciclos.filter(c => c.status === 'rascunho').length})
          </button>
          <button
            className={`filtro-btn ${filtroStatus === 'concluido' ? 'active' : ''}`}
            onClick={() => setFiltroStatus('concluido')}
          >
            Concluidos ({ciclos.filter(c => c.status === 'concluido').length})
          </button>
        </div>

        {/* Lista de Ciclos */}
        <div className="ciclos-grid">
          {filteredCiclos.map(ciclo => (
            <div key={ciclo.id} className="ciclo-card">
              <div className="ciclo-header">
                <div className="ciclo-title">
                  <h3>{ciclo.nome}</h3>
                  <span className="tipo-badge">{ciclo.tipo} graus</span>
                </div>
                {getStatusBadge(ciclo.status)}
              </div>

              <div className="ciclo-info">
                <div className="info-item">
                  <Calendar size={16} />
                  <span>{ciclo.dataInicio} - {ciclo.dataFim}</span>
                </div>
                <div className="info-item">
                  <Users size={16} />
                  <span>{ciclo.participantes} participantes</span>
                </div>
              </div>

              {ciclo.status !== 'rascunho' && (
                <div className="ciclo-progress">
                  <div className="progress-header">
                    <span>Progresso</span>
                    <span>{ciclo.respostas}/{ciclo.participantes} respostas</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(ciclo.respostas / ciclo.participantes) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="ciclo-categorias">
                {ciclo.categorias.map((cat, idx) => (
                  <span key={idx} className="categoria-tag">{cat}</span>
                ))}
              </div>

              <div className="ciclo-actions">
                <button className="action-btn" title="Visualizar">
                  <Eye size={18} />
                </button>
                <button className="action-btn" title="Editar">
                  <Edit3 size={18} />
                </button>
                {ciclo.status === 'ativo' && (
                  <button className="action-btn" title="Pausar">
                    <Pause size={18} />
                  </button>
                )}
                {ciclo.status === 'pausado' && (
                  <button className="action-btn" title="Retomar">
                    <Play size={18} />
                  </button>
                )}
                {ciclo.status === 'rascunho' && (
                  <button className="action-btn delete" title="Excluir">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ciclos-page {
          max-width: 1200px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .page-header h1 {
          font-size: 1.75rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 4px;
        }

        .subtitle {
          color: #64748b;
          font-size: 0.9375rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
        }

        .filtros {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .filtro-btn {
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filtro-btn:hover {
          border-color: #3B82F6;
          color: #3B82F6;
        }

        .filtro-btn.active {
          background: #3B82F6;
          border-color: #3B82F6;
          color: white;
        }

        .ciclos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .ciclo-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }

        .ciclo-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .ciclo-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .ciclo-title h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .tipo-badge {
          font-size: 0.75rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .ciclo-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: #64748b;
        }

        .ciclo-progress {
          margin-bottom: 16px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 6px;
        }

        .progress-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .ciclo-categorias {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .categoria-tag {
          font-size: 0.6875rem;
          padding: 4px 10px;
          background: #f1f5f9;
          color: #475569;
          border-radius: 4px;
        }

        .ciclo-actions {
          display: flex;
          gap: 8px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          border-color: #3B82F6;
          color: #3B82F6;
        }

        .action-btn.delete:hover {
          border-color: #EF4444;
          color: #EF4444;
        }

        @media (max-width: 768px) {
          .ciclos-grid {
            grid-template-columns: 1fr;
          }

          .filtros {
            flex-wrap: wrap;
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
