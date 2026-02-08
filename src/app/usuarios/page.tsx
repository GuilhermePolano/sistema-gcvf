'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Shield,
  Mail,
  Building2,
  CheckCircle,
  XCircle,
  Key
} from 'lucide-react'

interface Usuario {
  id: number
  nome: string
  email: string
  perfil: 'funcionario' | 'coordenador' | 'gerente' | 'administrador'
  entidade: string
  setor: string
  status: 'ativo' | 'inativo'
  ultimoAcesso: string
}

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroPerfil, setFiltroPerfil] = useState('todos')



  const usuarios: Usuario[] = [
    { id: 1, nome: 'Joao Silva', email: 'joao.silva@fiergs.org.br', perfil: 'funcionario', entidade: 'FIERGS', setor: 'GINFO', status: 'ativo', ultimoAcesso: '02/02/2026 14:30' },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@fiergs.org.br', perfil: 'coordenador', entidade: 'FIERGS', setor: 'GINFO', status: 'ativo', ultimoAcesso: '02/02/2026 10:15' },
    { id: 3, nome: 'Pedro Lima', email: 'pedro.lima@sesi.org.br', perfil: 'gerente', entidade: 'SESI', setor: 'RH', status: 'ativo', ultimoAcesso: '01/02/2026 16:45' },
    { id: 4, nome: 'Ana Costa', email: 'ana.costa@senai.org.br', perfil: 'funcionario', entidade: 'SENAI', setor: 'Educacao', status: 'inativo', ultimoAcesso: '15/01/2026 09:00' },
    { id: 5, nome: 'Carlos Souza', email: 'carlos.souza@fiergs.org.br', perfil: 'administrador', entidade: 'FIERGS', setor: 'TI', status: 'ativo', ultimoAcesso: '02/02/2026 15:00' },
    { id: 6, nome: 'Julia Ferreira', email: 'julia.ferreira@iel.org.br', perfil: 'coordenador', entidade: 'IEL', setor: 'Inovacao', status: 'ativo', ultimoAcesso: '02/02/2026 11:30' }
  ]

  const getPerfilBadge = (perfil: string) => {
    const configs: Record<string, { bg: string, color: string }> = {
      'funcionario': { bg: 'rgba(148, 163, 184, 0.15)', color: '#64748B' },
      'coordenador': { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6' },
      'gerente': { bg: 'rgba(168, 85, 247, 0.15)', color: '#A855F7' },
      'administrador': { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }
    }
    const config = configs[perfil]
    return (
      <span className="perfil-badge" style={{ background: config.bg, color: config.color }}>
        {perfil.charAt(0).toUpperCase() + perfil.slice(1)}
      </span>
    )
  }

  const filteredUsuarios = usuarios.filter(u => {
    const matchSearch = u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchPerfil = filtroPerfil === 'todos' || u.perfil === filtroPerfil
    return matchSearch && matchPerfil
  })

  const stats = {
    total: usuarios.length,
    ativos: usuarios.filter(u => u.status === 'ativo').length,
    admins: usuarios.filter(u => u.perfil === 'administrador').length
  }

  return (
    <ProtectedRoute>
      <MainLayout>
      <div className="usuarios-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Gestao de Usuarios</h1>
            <p className="subtitle">Administre os usuarios e suas permissoes</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} />
            Novo Usuario
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total de Usuarios</span>
          </div>
          <div className="stat-card">
            <span className="stat-value green">{stats.ativos}</span>
            <span className="stat-label">Usuarios Ativos</span>
          </div>
          <div className="stat-card">
            <span className="stat-value red">{stats.admins}</span>
            <span className="stat-label">Administradores</span>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-bar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filtro-perfil">
            <select value={filtroPerfil} onChange={(e) => setFiltroPerfil(e.target.value)}>
              <option value="todos">Todos os perfis</option>
              <option value="funcionario">Funcionario</option>
              <option value="coordenador">Coordenador</option>
              <option value="gerente">Gerente</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
        </div>

        {/* Tabela */}
        <div className="table-container">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Perfil</th>
                <th>Entidade / Setor</th>
                <th>Status</th>
                <th>Ultimo Acesso</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>
                    <div className="usuario-info">
                      <div className="usuario-avatar">
                        {usuario.nome.charAt(0)}
                      </div>
                      <div>
                        <span className="usuario-nome">{usuario.nome}</span>
                        <span className="usuario-email">{usuario.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{getPerfilBadge(usuario.perfil)}</td>
                  <td>
                    <div className="entidade-info">
                      <Building2 size={14} />
                      <span>{usuario.entidade} - {usuario.setor}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${usuario.status}`}>
                      {usuario.status === 'ativo' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {usuario.status.charAt(0).toUpperCase() + usuario.status.slice(1)}
                    </span>
                  </td>
                  <td className="ultimo-acesso">{usuario.ultimoAcesso}</td>
                  <td>
                    <div className="acoes">
                      <button className="action-btn" title="Editar">
                        <Edit3 size={16} />
                      </button>
                      <button className="action-btn" title="Resetar Senha">
                        <Key size={16} />
                      </button>
                      <button className="action-btn" title="Permissoes">
                        <Shield size={16} />
                      </button>
                      <button className="action-btn delete" title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .usuarios-page {
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

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          color: white;
        }

        .stats-row {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          flex: 1;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
        }

        .stat-value.green {
          color: #22C55E;
        }

        .stat-value.red {
          color: #EF4444;
        }

        .stat-label {
          font-size: 0.8125rem;
          color: #64748b;
        }

        .filtros-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .search-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          color: #94a3b8;
        }

        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.9375rem;
        }

        .filtro-perfil select {
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9375rem;
          background: white;
          min-width: 180px;
        }

        .table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .usuarios-table {
          width: 100%;
          border-collapse: collapse;
        }

        .usuarios-table th,
        .usuarios-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #f1f5f9;
        }

        .usuarios-table th {
          background: #f8fafc;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
        }

        .usuario-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .usuario-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .usuario-nome {
          display: block;
          font-weight: 500;
          color: #1e293b;
        }

        .usuario-email {
          display: block;
          font-size: 0.8125rem;
          color: #64748b;
        }

        .perfil-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .entidade-info {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.875rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge.ativo {
          background: rgba(34, 197, 94, 0.15);
          color: #22C55E;
        }

        .status-badge.inativo {
          background: rgba(239, 68, 68, 0.15);
          color: #EF4444;
        }

        .ultimo-acesso {
          font-size: 0.8125rem;
          color: #64748b;
        }

        .acoes {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 6px;
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

        @media (max-width: 1024px) {
          .stats-row {
            flex-wrap: wrap;
          }

          .stat-card {
            min-width: calc(50% - 8px);
          }
        }

        @media (max-width: 768px) {
          .filtros-bar {
            flex-direction: column;
          }

          .table-container {
            overflow-x: auto;
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
