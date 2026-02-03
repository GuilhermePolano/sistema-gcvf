'use client'

import MainLayout from '@/components/Layout/MainLayout'
import { useState } from 'react'
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  FileText,
  Settings,
  Shield,
  LogIn,
  LogOut,
  Edit3,
  Trash2,
  Plus,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface LogEntry {
  id: number
  timestamp: string
  usuario: string
  acao: string
  tipo: 'login' | 'logout' | 'criar' | 'editar' | 'excluir' | 'visualizar' | 'config' | 'erro'
  modulo: string
  detalhes: string
  ip: string
  severidade: 'info' | 'warning' | 'error'
}

export default function AuditoriaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [filtroData, setFiltroData] = useState('hoje')

  const user = {
    name: 'Admin Sistema',
    role: 'Administrador',
    entity: 'FIERGS',
    userRole: 'administrador' as const
  }

  const logs: LogEntry[] = [
    { id: 1, timestamp: '02/02/2026 15:32:45', usuario: 'joao.silva@fiergs.org.br', acao: 'Login realizado', tipo: 'login', modulo: 'Autenticacao', detalhes: 'Login bem-sucedido via SSO', ip: '192.168.1.100', severidade: 'info' },
    { id: 2, timestamp: '02/02/2026 15:30:12', usuario: 'maria.santos@fiergs.org.br', acao: 'PDI atualizado', tipo: 'editar', modulo: 'PDI', detalhes: 'Objetivo "Certificacao AWS" marcado como concluido', ip: '192.168.1.105', severidade: 'info' },
    { id: 3, timestamp: '02/02/2026 15:28:00', usuario: 'admin@fiergs.org.br', acao: 'Usuario criado', tipo: 'criar', modulo: 'Usuarios', detalhes: 'Novo usuario: pedro.lima@sesi.org.br', ip: '192.168.1.1', severidade: 'info' },
    { id: 4, timestamp: '02/02/2026 15:25:33', usuario: 'sistema', acao: 'Falha de autenticacao', tipo: 'erro', modulo: 'Autenticacao', detalhes: '3 tentativas falhas para usuario inexistente', ip: '10.0.0.50', severidade: 'warning' },
    { id: 5, timestamp: '02/02/2026 15:20:00', usuario: 'ana.costa@senai.org.br', acao: 'Feedback respondido', tipo: 'criar', modulo: 'Feedbacks', detalhes: 'Autoavaliacao Q1 2026 completada', ip: '192.168.2.55', severidade: 'info' },
    { id: 6, timestamp: '02/02/2026 15:15:45', usuario: 'admin@fiergs.org.br', acao: 'Configuracao alterada', tipo: 'config', modulo: 'Sistema', detalhes: 'Parametro "email_notificacoes" alterado para true', ip: '192.168.1.1', severidade: 'warning' },
    { id: 7, timestamp: '02/02/2026 15:10:22', usuario: 'carlos.souza@fiergs.org.br', acao: 'Logout realizado', tipo: 'logout', modulo: 'Autenticacao', detalhes: 'Sessao encerrada manualmente', ip: '192.168.1.110', severidade: 'info' },
    { id: 8, timestamp: '02/02/2026 15:05:00', usuario: 'sistema', acao: 'Erro de sistema', tipo: 'erro', modulo: 'API', detalhes: 'Timeout na conexao com servidor de email', ip: 'localhost', severidade: 'error' },
    { id: 9, timestamp: '02/02/2026 15:00:00', usuario: 'julia.ferreira@iel.org.br', acao: 'Relatorio exportado', tipo: 'visualizar', modulo: 'Relatorios', detalhes: 'Exportacao PDF - Matriz de Skills', ip: '192.168.3.20', severidade: 'info' },
    { id: 10, timestamp: '02/02/2026 14:55:30', usuario: 'admin@fiergs.org.br', acao: 'Ciclo de feedback criado', tipo: 'criar', modulo: 'Ciclos', detalhes: 'Novo ciclo: Avaliacao Q2 2026', ip: '192.168.1.1', severidade: 'info' }
  ]

  const getIconByTipo = (tipo: string) => {
    const icons: Record<string, React.ReactNode> = {
      'login': <LogIn size={16} />,
      'logout': <LogOut size={16} />,
      'criar': <Plus size={16} />,
      'editar': <Edit3 size={16} />,
      'excluir': <Trash2 size={16} />,
      'visualizar': <Eye size={16} />,
      'config': <Settings size={16} />,
      'erro': <AlertTriangle size={16} />
    }
    return icons[tipo] || <FileText size={16} />
  }

  const getSeveridadeStyle = (severidade: string) => {
    const styles: Record<string, { bg: string, color: string, icon: React.ReactNode }> = {
      'info': { bg: 'rgba(59, 130, 246, 0.15)', color: '#3B82F6', icon: <CheckCircle size={14} /> },
      'warning': { bg: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', icon: <AlertTriangle size={14} /> },
      'error': { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', icon: <AlertTriangle size={14} /> }
    }
    return styles[severidade]
  }

  const filteredLogs = logs.filter(log => {
    const matchSearch = log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       log.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       log.detalhes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === 'todos' || log.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  return (
    <MainLayout user={user}>
      <div className="auditoria-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Logs de Auditoria</h1>
            <p className="subtitle">Historico de atividades do sistema</p>
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Exportar Logs
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card blue">
            <Clock size={24} />
            <div>
              <span className="stat-value">{logs.length}</span>
              <span className="stat-label">Eventos Hoje</span>
            </div>
          </div>
          <div className="stat-card green">
            <CheckCircle size={24} />
            <div>
              <span className="stat-value">{logs.filter(l => l.severidade === 'info').length}</span>
              <span className="stat-label">Eventos Normais</span>
            </div>
          </div>
          <div className="stat-card orange">
            <AlertTriangle size={24} />
            <div>
              <span className="stat-value">{logs.filter(l => l.severidade === 'warning').length}</span>
              <span className="stat-label">Alertas</span>
            </div>
          </div>
          <div className="stat-card red">
            <AlertTriangle size={24} />
            <div>
              <span className="stat-value">{logs.filter(l => l.severidade === 'error').length}</span>
              <span className="stat-label">Erros</span>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-bar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar nos logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="todos">Todos os tipos</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="criar">Criar</option>
            <option value="editar">Editar</option>
            <option value="excluir">Excluir</option>
            <option value="config">Configuracao</option>
            <option value="erro">Erros</option>
          </select>
          <select value={filtroData} onChange={(e) => setFiltroData(e.target.value)}>
            <option value="hoje">Hoje</option>
            <option value="semana">Ultima Semana</option>
            <option value="mes">Ultimo Mes</option>
            <option value="todos">Todos</option>
          </select>
        </div>

        {/* Lista de Logs */}
        <div className="logs-container">
          {filteredLogs.map(log => {
            const severidadeStyle = getSeveridadeStyle(log.severidade)
            return (
              <div key={log.id} className="log-entry">
                <div className="log-icon" style={{ background: severidadeStyle.bg, color: severidadeStyle.color }}>
                  {getIconByTipo(log.tipo)}
                </div>
                <div className="log-content">
                  <div className="log-header">
                    <span className="log-acao">{log.acao}</span>
                    <span className="log-modulo">{log.modulo}</span>
                  </div>
                  <p className="log-detalhes">{log.detalhes}</p>
                  <div className="log-meta">
                    <span className="log-usuario">
                      <User size={12} />
                      {log.usuario}
                    </span>
                    <span className="log-ip">IP: {log.ip}</span>
                  </div>
                </div>
                <div className="log-timestamp">
                  <span className="severidade-badge" style={{ background: severidadeStyle.bg, color: severidadeStyle.color }}>
                    {severidadeStyle.icon}
                    {log.severidade.toUpperCase()}
                  </span>
                  <span className="timestamp">{log.timestamp}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .auditoria-page {
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
          border: none;
        }

        .btn-secondary {
          background: white;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-card.blue { color: #3B82F6; }
        .stat-card.green { color: #22C55E; }
        .stat-card.orange { color: #F59E0B; }
        .stat-card.red { color: #EF4444; }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .stat-label {
          display: block;
          font-size: 0.75rem;
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

        .filtros-bar select {
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9375rem;
          background: white;
          min-width: 160px;
        }

        .logs-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .log-entry {
          display: flex;
          gap: 16px;
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.2s ease;
        }

        .log-entry:hover {
          background: #f8fafc;
        }

        .log-entry:last-child {
          border-bottom: none;
        }

        .log-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .log-content {
          flex: 1;
        }

        .log-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .log-acao {
          font-weight: 600;
          color: #1e293b;
        }

        .log-modulo {
          font-size: 0.75rem;
          padding: 2px 8px;
          background: #f1f5f9;
          color: #64748b;
          border-radius: 4px;
        }

        .log-detalhes {
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 8px;
        }

        .log-meta {
          display: flex;
          gap: 16px;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .log-usuario {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .log-timestamp {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }

        .severidade-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.6875rem;
          font-weight: 600;
        }

        .timestamp {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .filtros-bar {
            flex-direction: column;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .log-entry {
            flex-direction: column;
          }

          .log-timestamp {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>
    </MainLayout>
  )
}
