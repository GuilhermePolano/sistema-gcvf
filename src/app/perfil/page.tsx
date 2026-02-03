'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Award,
  TrendingUp
} from 'lucide-react'

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)

  const user = {
    name: 'João Silva',
    role: 'Desenvolvedor Pleno',
    entity: 'FIERGS - GINFO',
    userRole: 'coordenador' as const
  }

  const [profileData, setProfileData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@fiergs.org.br',
    telefone: '(51) 99999-8888',
    cargo: 'Desenvolvedor Pleno',
    setor: 'GINFO - Gerência de Informática',
    entidade: 'FIERGS',
    dataAdmissao: '15/03/2021',
    gestor: 'Maria Santos',
    localizacao: 'Porto Alegre, RS'
  })

  const competencias = [
    { nome: 'JavaScript', nivel: 4 },
    { nome: 'React', nivel: 4 },
    { nome: 'Node.js', nivel: 3 },
    { nome: 'TypeScript', nivel: 4 },
    { nome: 'Python', nivel: 2 },
    { nome: 'Docker', nivel: 3 }
  ]

  const conquistas = [
    { titulo: 'Primeiro PDI Concluído', data: '2023', icone: Award },
    { titulo: 'Avaliação Destaque', data: '2024', icone: TrendingUp },
    { titulo: 'Certificação React', data: '2024', icone: Shield }
  ]

  const renderNivel = (nivel: number) => {
    return (
      <div className="nivel-dots">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`dot ${n <= nivel ? 'filled' : ''}`}
          />
        ))}
      </div>
    )
  }

  return (
    <MainLayout user={user}>
      <div className="perfil-page">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Meu Perfil</h1>
            <p className="subtitle">Gerencie suas informações pessoais e profissionais</p>
          </div>
          <button
            className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <X size={18} />
                Cancelar
              </>
            ) : (
              <>
                <Edit3 size={18} />
                Editar Perfil
              </>
            )}
          </button>
        </div>

        <div className="perfil-content">
          {/* Card Principal - Informações do Usuário */}
          <div className="card card-profile">
            <div className="profile-header">
              <div className="avatar-section">
                <div className="avatar">
                  <User size={48} strokeWidth={1.5} />
                  {isEditing && (
                    <button className="avatar-edit">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
                <div className="profile-info">
                  <h2>{profileData.nome}</h2>
                  <p className="cargo">{profileData.cargo}</p>
                  <span className="badge badge-primary">{user.userRole}</span>
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-group">
                <h3>Informações de Contato</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <Mail size={18} className="detail-icon" />
                    <div>
                      <span className="label">Email</span>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="form-input"
                        />
                      ) : (
                        <span className="value">{profileData.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="detail-item">
                    <Phone size={18} className="detail-icon" />
                    <div>
                      <span className="label">Telefone</span>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.telefone}
                          onChange={(e) => setProfileData({...profileData, telefone: e.target.value})}
                          className="form-input"
                        />
                      ) : (
                        <span className="value">{profileData.telefone}</span>
                      )}
                    </div>
                  </div>
                  <div className="detail-item">
                    <MapPin size={18} className="detail-icon" />
                    <div>
                      <span className="label">Localização</span>
                      <span className="value">{profileData.localizacao}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-group">
                <h3>Informações Profissionais</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <Building2 size={18} className="detail-icon" />
                    <div>
                      <span className="label">Entidade</span>
                      <span className="value">{profileData.entidade}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Briefcase size={18} className="detail-icon" />
                    <div>
                      <span className="label">Setor</span>
                      <span className="value">{profileData.setor}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <Calendar size={18} className="detail-icon" />
                    <div>
                      <span className="label">Data de Admissão</span>
                      <span className="value">{profileData.dataAdmissao}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <User size={18} className="detail-icon" />
                    <div>
                      <span className="label">Gestor Direto</span>
                      <span className="value">{profileData.gestor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="actions">
                  <button className="btn btn-primary" onClick={() => setIsEditing(false)}>
                    <Save size={18} />
                    Salvar Alterações
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar com Competências e Conquistas */}
          <div className="sidebar-content">
            {/* Card de Competências */}
            <div className="card card-competencias">
              <div className="card-header">
                <h3>Minhas Competências</h3>
              </div>
              <div className="competencias-list">
                {competencias.map((comp, index) => (
                  <div key={index} className="competencia-item">
                    <span className="comp-nome">{comp.nome}</span>
                    {renderNivel(comp.nivel)}
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary btn-sm btn-full">
                Ver Todas as Competências
              </button>
            </div>

            {/* Card de Conquistas */}
            <div className="card card-conquistas">
              <div className="card-header">
                <h3>Conquistas</h3>
              </div>
              <div className="conquistas-list">
                {conquistas.map((conquista, index) => {
                  const Icon = conquista.icone
                  return (
                    <div key={index} className="conquista-item">
                      <div className="conquista-icon">
                        <Icon size={20} />
                      </div>
                      <div className="conquista-info">
                        <span className="conquista-titulo">{conquista.titulo}</span>
                        <span className="conquista-data">{conquista.data}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perfil-page {
          max-width: 1200px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .header-content h1 {
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

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .btn-secondary:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.8125rem;
        }

        .btn-full {
          width: 100%;
          justify-content: center;
        }

        .perfil-content {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .card-profile {
          padding: 0;
        }

        .profile-header {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          padding: 32px;
        }

        .avatar-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .avatar {
          width: 96px;
          height: 96px;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          position: relative;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
        }

        .avatar-edit {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 32px;
          height: 32px;
          background: white;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #3B82F6;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .profile-info h2 {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .cargo {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9375rem;
          margin-bottom: 12px;
        }

        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .badge-primary {
          background: rgba(59, 130, 246, 0.2);
          color: #60A5FA;
        }

        .profile-details {
          padding: 32px;
        }

        .detail-group {
          margin-bottom: 32px;
        }

        .detail-group:last-child {
          margin-bottom: 0;
        }

        .detail-group h3 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #f1f5f9;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .detail-icon {
          color: #3B82F6;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .detail-item .label {
          display: block;
          font-size: 0.75rem;
          color: #94a3b8;
          margin-bottom: 2px;
        }

        .detail-item .value {
          display: block;
          font-size: 0.9375rem;
          color: #1e293b;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.9375rem;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #3B82F6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .actions {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #f1f5f9;
        }

        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .card-competencias,
        .card-conquistas {
          padding: 24px;
        }

        .card-header {
          margin-bottom: 20px;
        }

        .card-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .competencias-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .competencia-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .comp-nome {
          font-size: 0.875rem;
          color: #475569;
          font-weight: 500;
        }

        .nivel-dots {
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #e2e8f0;
          transition: background 0.2s ease;
        }

        .dot.filled {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
        }

        .conquistas-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .conquista-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .conquista-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D97706;
        }

        .conquista-info {
          display: flex;
          flex-direction: column;
        }

        .conquista-titulo {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1e293b;
        }

        .conquista-data {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .perfil-content {
            grid-template-columns: 1fr;
          }

          .sidebar-content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 16px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .sidebar-content {
            grid-template-columns: 1fr;
          }

          .avatar-section {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </MainLayout>
  )
}
