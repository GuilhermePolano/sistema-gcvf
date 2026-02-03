'use client'

import MainLayout from '@/components/Layout/MainLayout'
import { useState } from 'react'
import {
  Filter,
  Download,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Search
} from 'lucide-react'

export default function MatrizSkillsPage() {
  const [filtroEntidade, setFiltroEntidade] = useState('Todas')
  const [filtroSetor, setFiltroSetor] = useState('Todos')

  const user = {
    name: 'Maria Gerente',
    role: 'Gerente',
    entity: 'FIERGS - GINFO',
    userRole: 'gerente' as const
  }

  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'Docker', 'AWS', 'SQL', 'Git']

  const equipes = [
    {
      nome: 'Desenvolvimento Web',
      membros: 8,
      mediaGeral: 3.4,
      skills: { 'JavaScript': 4.2, 'React': 3.8, 'Node.js': 3.5, 'Python': 2.1, 'Docker': 3.0, 'AWS': 2.8, 'SQL': 3.6, 'Git': 4.0 }
    },
    {
      nome: 'Infraestrutura',
      membros: 5,
      mediaGeral: 3.1,
      skills: { 'JavaScript': 1.5, 'React': 1.2, 'Node.js': 2.0, 'Python': 3.5, 'Docker': 4.2, 'AWS': 4.0, 'SQL': 3.8, 'Git': 3.5 }
    },
    {
      nome: 'Data Analytics',
      membros: 4,
      mediaGeral: 3.6,
      skills: { 'JavaScript': 2.0, 'React': 1.5, 'Node.js': 1.8, 'Python': 4.5, 'Docker': 3.0, 'AWS': 3.5, 'SQL': 4.8, 'Git': 3.2 }
    },
    {
      nome: 'Mobile',
      membros: 3,
      mediaGeral: 3.2,
      skills: { 'JavaScript': 4.0, 'React': 4.5, 'Node.js': 3.0, 'Python': 1.5, 'Docker': 2.5, 'AWS': 2.8, 'SQL': 3.0, 'Git': 4.2 }
    }
  ]

  const getSkillColor = (valor: number) => {
    if (valor >= 4) return '#22C55E'
    if (valor >= 3) return '#3B82F6'
    if (valor >= 2) return '#F59E0B'
    return '#EF4444'
  }

  const getSkillBg = (valor: number) => {
    if (valor >= 4) return 'rgba(34, 197, 94, 0.15)'
    if (valor >= 3) return 'rgba(59, 130, 246, 0.15)'
    if (valor >= 2) return 'rgba(245, 158, 11, 0.15)'
    return 'rgba(239, 68, 68, 0.15)'
  }

  const gaps = skills.map(skill => {
    const valores = equipes.map(e => e.skills[skill as keyof typeof e.skills])
    const media = valores.reduce((a, b) => a + b, 0) / valores.length
    return { skill, media, isGap: media < 3 }
  }).filter(g => g.isGap)

  return (
    <MainLayout user={user}>
      <div className="matriz-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Matriz de Skills</h1>
            <p className="subtitle">Visao consolidada das competencias por equipe</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filtros
            </button>
            <button className="btn btn-primary">
              <Download size={18} />
              Exportar
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-card">
          <div className="filtro-group">
            <label>Entidade</label>
            <select value={filtroEntidade} onChange={(e) => setFiltroEntidade(e.target.value)}>
              <option>Todas</option>
              <option>FIERGS</option>
              <option>SESI</option>
              <option>SENAI</option>
            </select>
          </div>
          <div className="filtro-group">
            <label>Setor</label>
            <select value={filtroSetor} onChange={(e) => setFiltroSetor(e.target.value)}>
              <option>Todos</option>
              <option>GINFO</option>
              <option>RH</option>
              <option>Financeiro</option>
            </select>
          </div>
          <div className="filtro-search">
            <Search size={18} />
            <input type="text" placeholder="Buscar skill..." />
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon blue">
              <Users size={24} />
            </div>
            <div className="summary-info">
              <span className="summary-value">20</span>
              <span className="summary-label">Total de Colaboradores</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon green">
              <TrendingUp size={24} />
            </div>
            <div className="summary-info">
              <span className="summary-value">3.3</span>
              <span className="summary-label">Media Geral</span>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon orange">
              <AlertTriangle size={24} />
            </div>
            <div className="summary-info">
              <span className="summary-value">{gaps.length}</span>
              <span className="summary-label">Gaps Identificados</span>
            </div>
          </div>
        </div>

        {/* Gaps Críticos */}
        {gaps.length > 0 && (
          <div className="gaps-alert">
            <AlertTriangle size={20} />
            <div>
              <strong>Gaps criticos identificados:</strong>
              <span>{gaps.map(g => `${g.skill} (${g.media.toFixed(1)})`).join(', ')}</span>
            </div>
          </div>
        )}

        {/* Matriz */}
        <div className="matriz-container">
          <table className="matriz-table">
            <thead>
              <tr>
                <th className="equipe-col">Equipe</th>
                <th className="membros-col">Membros</th>
                {skills.map(skill => (
                  <th key={skill} className="skill-col">{skill}</th>
                ))}
                <th className="media-col">Media</th>
              </tr>
            </thead>
            <tbody>
              {equipes.map((equipe, idx) => (
                <tr key={idx}>
                  <td className="equipe-nome">{equipe.nome}</td>
                  <td className="membros-count">{equipe.membros}</td>
                  {skills.map(skill => {
                    const valor = equipe.skills[skill as keyof typeof equipe.skills]
                    return (
                      <td key={skill}>
                        <div
                          className="skill-cell"
                          style={{
                            background: getSkillBg(valor),
                            color: getSkillColor(valor)
                          }}
                        >
                          {valor.toFixed(1)}
                        </div>
                      </td>
                    )
                  })}
                  <td>
                    <div className="media-cell">
                      {equipe.mediaGeral.toFixed(1)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legenda */}
        <div className="legenda">
          <span className="legenda-title">Legenda:</span>
          <div className="legenda-item">
            <div className="legenda-color" style={{ background: '#22C55E' }}></div>
            <span>Expert (4-5)</span>
          </div>
          <div className="legenda-item">
            <div className="legenda-color" style={{ background: '#3B82F6' }}></div>
            <span>Intermediario (3-4)</span>
          </div>
          <div className="legenda-item">
            <div className="legenda-color" style={{ background: '#F59E0B' }}></div>
            <span>Basico (2-3)</span>
          </div>
          <div className="legenda-item">
            <div className="legenda-color" style={{ background: '#EF4444' }}></div>
            <span>Iniciante (0-2)</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .matriz-page {
          max-width: 1400px;
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

        .header-actions {
          display: flex;
          gap: 12px;
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

        .btn-secondary {
          background: white;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .filtros-card {
          display: flex;
          gap: 16px;
          padding: 16px 20px;
          background: white;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .filtro-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .filtro-group label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
        }

        .filtro-group select {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.875rem;
          min-width: 150px;
        }

        .filtro-search {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          margin-left: auto;
          color: #94a3b8;
        }

        .filtro-search input {
          border: none;
          outline: none;
          font-size: 0.875rem;
          width: 200px;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .summary-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .summary-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .summary-icon.blue {
          background: rgba(59, 130, 246, 0.15);
          color: #3B82F6;
        }

        .summary-icon.green {
          background: rgba(34, 197, 94, 0.15);
          color: #22C55E;
        }

        .summary-icon.orange {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
        }

        .summary-info {
          display: flex;
          flex-direction: column;
        }

        .summary-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .summary-label {
          font-size: 0.8125rem;
          color: #64748b;
        }

        .gaps-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 10px;
          margin-bottom: 24px;
          color: #B45309;
        }

        .gaps-alert strong {
          margin-right: 8px;
        }

        .matriz-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow-x: auto;
          margin-bottom: 16px;
        }

        .matriz-table {
          width: 100%;
          border-collapse: collapse;
        }

        .matriz-table th,
        .matriz-table td {
          padding: 12px;
          text-align: center;
          border-bottom: 1px solid #f1f5f9;
        }

        .matriz-table th {
          background: #f8fafc;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
        }

        .equipe-col {
          text-align: left !important;
          min-width: 180px;
        }

        .equipe-nome {
          text-align: left;
          font-weight: 500;
          color: #1e293b;
        }

        .membros-count {
          color: #64748b;
        }

        .skill-cell {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .media-cell {
          font-weight: 700;
          color: #1e293b;
        }

        .legenda {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 12px 16px;
          background: white;
          border-radius: 8px;
          font-size: 0.8125rem;
        }

        .legenda-title {
          color: #64748b;
          font-weight: 500;
        }

        .legenda-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #475569;
        }

        .legenda-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }

        @media (max-width: 1024px) {
          .summary-cards {
            grid-template-columns: 1fr;
          }

          .filtros-card {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </MainLayout>
  )
}
