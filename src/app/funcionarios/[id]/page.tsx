'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import Link from 'next/link'
import {
  ChevronLeft,
  Edit,
  UserX,
  Mail,
  Phone,
  Calendar,
  Building2,
  Briefcase,
  MapPin,
  Award,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

export default function VisualizarFuncionarioPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [showDesligarModal, setShowDesligarModal] = useState(false)
  
  const funcionarioId = params.id

  // Dados mockados
  const funcionario = {
    id: funcionarioId,
    nome: 'João Pedro da Silva',
    email: 'joao.silva@fiergs.org.br',
    telefone: '(51) 99999-1111',
    cpf: '123.456.789-01',
    matricula: 'FIERGS-2021-001',
    cargo: 'Desenvolvedor Pleno',
    setor: 'Desenvolvimento',
    entidade: 'FIERGS',
    dataAdmissao: '2021-03-10',
    dataNascimento: '1990-05-15',
    cidade: 'Porto Alegre',
    estado: 'RS',
    status: 'ATIVO',
    gestor: 'Maria Santos',
    competencias: [
      { nome: 'JavaScript', nivel: 4 },
      { nome: 'React', nivel: 4 },
      { nome: 'Node.js', nivel: 3 },
      { nome: 'TypeScript', nivel: 4 }
    ]
  }

  const handleDesligar = () => {
    if (confirm(`Tem certeza que deseja desligar ${funcionario.nome}?`)) {
      // Aqui viria a chamada à API
      alert('Funcionário desligado com sucesso!')
      router.push('/funcionarios')
    }
  }

  return (
    <ProtectedRoute requiredRoles={['coordenador', 'gerente', 'administrador']}>
      <MainLayout>
        <div className="visualizar-funcionario-page">
          <div className="page-header">
            <button className="btn-back" onClick={() => router.back()}>
              <ChevronLeft size={20} />
              Voltar
            </button>
            <div className="header-actions">
              <Link href={`/funcionarios/${funcionarioId}/editar`} className="btn btn-primary">
                <Edit size={18} />
                Editar
              </Link>
              <button className="btn btn-danger" onClick={handleDesligar}>
                <UserX size={18} />
                Desligar
              </button>
            </div>
          </div>

          <div className="card profile-card">
            <div className="profile-header">
              <div className="avatar-large">
                {funcionario.nome.charAt(0)}
              </div>
              <div>
                <h1>{funcionario.nome}</h1>
                <p className="cargo">{funcionario.cargo}</p>
                <span className={`badge ${funcionario.status === 'ATIVO' ? 'badge-success' : 'badge-danger'}`}>
                  {funcionario.status}
                </span>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <Mail size={18} />
                <div>
                  <span className="label">Email</span>
                  <span className="value">{funcionario.email}</span>
                </div>
              </div>
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <span className="label">Telefone</span>
                  <span className="value">{funcionario.telefone}</span>
                </div>
              </div>
              <div className="info-item">
                <Building2 size={18} />
                <div>
                  <span className="label">Entidade</span>
                  <span className="value">{funcionario.entidade}</span>
                </div>
              </div>
              <div className="info-item">
                <Briefcase size={18} />
                <div>
                  <span className="label">Setor</span>
                  <span className="value">{funcionario.setor}</span>
                </div>
              </div>
              <div className="info-item">
                <Calendar size={18} />
                <div>
                  <span className="label">Data de Admissão</span>
                  <span className="value">{new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <span className="label">Localização</span>
                  <span className="value">{funcionario.cidade} - {funcionario.estado}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>
              <Award size={24} />
              Competências
            </h2>
            <div className="competencias-list">
              {funcionario.competencias.map((comp, idx) => (
                <div key={idx} className="competencia-item">
                  <span>{comp.nome}</span>
                  <div className="nivel-dots">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className={`dot ${n <= comp.nivel ? 'filled' : ''}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .visualizar-funcionario-page {
            max-width: 1000px;
            margin: 0 auto;
          }

          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-xl);
          }

          .btn-back {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            background: none;
            border: none;
            color: var(--primary-dark);
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius-sm);
            transition: background-color 0.2s ease;
          }

          .btn-back:hover {
            background-color: var(--primary-light);
          }

          .header-actions {
            display: flex;
            gap: var(--spacing-md);
          }

          .profile-card {
            margin-bottom: var(--spacing-xl);
          }

          .profile-header {
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
            padding-bottom: var(--spacing-lg);
            border-bottom: 1px solid var(--gray-200);
          }

          .avatar-large {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: var(--primary-dark);
            color: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 600;
          }

          .profile-header h1 {
            font-size: 1.875rem;
            font-weight: 600;
            margin: 0 0 var(--spacing-xs) 0;
          }

          .cargo {
            font-size: 1.125rem;
            color: var(--gray-600);
            margin: 0 0 var(--spacing-sm) 0;
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-lg);
          }

          .info-item {
            display: flex;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            background-color: var(--gray-50);
            border-radius: var(--radius-sm);
          }

          .info-item svg {
            color: var(--primary-dark);
            flex-shrink: 0;
          }

          .info-item .label {
            display: block;
            font-size: 0.75rem;
            color: var(--gray-600);
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 4px;
          }

          .info-item .value {
            display: block;
            font-size: 0.9375rem;
            color: var(--gray-900);
          }

          .card h2 {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            font-size: 1.25rem;
            margin-bottom: var(--spacing-lg);
          }

          .competencias-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .competencia-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-md);
            background-color: var(--gray-50);
            border-radius: var(--radius-sm);
          }

          .nivel-dots {
            display: flex;
            gap: 4px;
          }

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--gray-300);
          }

          .dot.filled {
            background-color: var(--primary-medium);
          }

          @media (max-width: 768px) {
            .page-header {
              flex-direction: column;
              align-items: flex-start;
              gap: var(--spacing-md);
            }

            .header-actions {
              width: 100%;
            }

            .info-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
