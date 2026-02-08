'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import {
  ChevronLeft,
  Calendar,
  User,
  Building2,
  CheckCircle,
  Star,
  TrendingUp,
  MessageSquare,
  Download,
  FileText
} from 'lucide-react'

export default function VisualizarFeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const feedbackId = params.id

  // Dados mockados do feedback
  const feedbackData = {
    id: feedbackId,
    tipo: 'Avaliação 360°',
    ciclo: 'Q1 2026',
    avaliado: {
      nome: 'João Silva',
      cargo: 'Desenvolvedor Pleno',
      setor: 'GINFO',
      entidade: 'FIERGS'
    },
    avaliador: {
      nome: 'Maria Santos',
      cargo: 'Coordenadora de TI',
      tipo: 'Gestor Direto'
    },
    dataResposta: '28/01/2026',
    status: 'Concluído',
    categorias: [
      {
        nome: 'Competências Técnicas',
        questoes: [
          {
            pergunta: 'Demonstra domínio das tecnologias necessárias para suas atividades?',
            resposta: 4,
            tipo: 'escala'
          },
          {
            pergunta: 'Busca atualização e aprendizado contínuo?',
            resposta: 5,
            tipo: 'escala'
          },
          {
            pergunta: 'Resolve problemas técnicos de forma eficiente?',
            resposta: 4,
            tipo: 'escala'
          }
        ]
      },
      {
        nome: 'Trabalho em Equipe',
        questoes: [
          {
            pergunta: 'Colabora efetivamente com os colegas?',
            resposta: 5,
            tipo: 'escala'
          },
          {
            pergunta: 'Compartilha conhecimento com a equipe?',
            resposta: 4,
            tipo: 'escala'
          },
          {
            pergunta: 'Contribui para um ambiente de trabalho positivo?',
            resposta: 5,
            tipo: 'escala'
          }
        ]
      },
      {
        nome: 'Comunicação',
        questoes: [
          {
            pergunta: 'Comunica-se de forma clara e objetiva?',
            resposta: 4,
            tipo: 'escala'
          },
          {
            pergunta: 'Mantém a equipe informada sobre o andamento das atividades?',
            resposta: 4,
            tipo: 'escala'
          }
        ]
      }
    ],
    comentarios: {
      pontosFortesGerais: 'João demonstra excelente domínio técnico e está sempre disposto a ajudar os colegas. Sua capacidade de resolver problemas complexos é notável.',
      areasDesenvolvimento: 'Poderia melhorar a documentação de código e participar mais ativamente das reuniões de planejamento.',
      comentarioGeral: 'João é um profissional dedicado e competente. Tem grande potencial para assumir responsabilidades de liderança técnica no futuro próximo.'
    },
    mediaGeral: 4.4
  }

  const renderEscala = (valor: number) => {
    return (
      <div className="escala-visual">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`escala-item ${n <= valor ? 'filled' : ''}`}
          >
            <Star size={20} fill={n <= valor ? 'currentColor' : 'none'} />
          </div>
        ))}
        <span className="escala-valor">{valor}/5</span>
      </div>
    )
  }

  const calcularMediaCategoria = (questoes: any[]) => {
    const soma = questoes.reduce((acc, q) => acc + q.resposta, 0)
    return (soma / questoes.length).toFixed(1)
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="visualizar-feedback-page">
          {/* Header */}
          <div className="page-header">
            <button className="btn-back" onClick={() => router.back()}>
              <ChevronLeft size={20} />
              Voltar
            </button>
            <div className="header-actions">
              <button className="btn btn-secondary">
                <Download size={18} />
                Exportar PDF
              </button>
            </div>
          </div>

          {/* Informações do Feedback */}
          <div className="card feedback-info-card">
            <div className="feedback-header">
              <div className="feedback-badge">
                <FileText size={20} />
                <span>{feedbackData.tipo}</span>
              </div>
              <div className="feedback-status completed">
                <CheckCircle size={16} />
                {feedbackData.status}
              </div>
            </div>

            <h1 className="feedback-title">{feedbackData.ciclo}</h1>

            <div className="feedback-participants">
              <div className="participant-card">
                <div className="participant-label">Avaliado</div>
                <div className="participant-info">
                  <div className="participant-avatar">
                    <User size={24} />
                  </div>
                  <div>
                    <h3>{feedbackData.avaliado.nome}</h3>
                    <p>{feedbackData.avaliado.cargo}</p>
                    <p className="participant-meta">
                      {feedbackData.avaliado.setor} - {feedbackData.avaliado.entidade}
                    </p>
                  </div>
                </div>
              </div>

              <div className="participant-card">
                <div className="participant-label">Avaliador</div>
                <div className="participant-info">
                  <div className="participant-avatar">
                    <User size={24} />
                  </div>
                  <div>
                    <h3>{feedbackData.avaliador.nome}</h3>
                    <p>{feedbackData.avaliador.cargo}</p>
                    <p className="participant-meta">{feedbackData.avaliador.tipo}</p>
                  </div>
                </div>
              </div>

              <div className="feedback-meta-info">
                <div className="meta-item">
                  <Calendar size={18} />
                  <span>Respondido em {feedbackData.dataResposta}</span>
                </div>
                <div className="meta-item score">
                  <TrendingUp size={18} />
                  <span>Média Geral: <strong>{feedbackData.mediaGeral}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Respostas por Categoria */}
          {feedbackData.categorias.map((categoria, idx) => (
            <div key={idx} className="card categoria-card">
              <div className="categoria-header">
                <h2>{categoria.nome}</h2>
                <div className="categoria-media">
                  Média: <strong>{calcularMediaCategoria(categoria.questoes)}</strong>
                </div>
              </div>

              <div className="questoes-list">
                {categoria.questoes.map((questao, qIdx) => (
                  <div key={qIdx} className="questao-item">
                    <div className="questao-texto">
                      <span className="questao-numero">{qIdx + 1}.</span>
                      {questao.pergunta}
                    </div>
                    {renderEscala(questao.resposta)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Comentários */}
          <div className="card comentarios-card">
            <h2>
              <MessageSquare size={24} />
              Comentários e Observações
            </h2>

            <div className="comentario-section">
              <h3>Pontos Fortes</h3>
              <p>{feedbackData.comentarios.pontosFortesGerais}</p>
            </div>

            <div className="comentario-section">
              <h3>Áreas de Desenvolvimento</h3>
              <p>{feedbackData.comentarios.areasDesenvolvimento}</p>
            </div>

            <div className="comentario-section">
              <h3>Comentário Geral</h3>
              <p>{feedbackData.comentarios.comentarioGeral}</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .visualizar-feedback-page {
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

          .feedback-info-card {
            margin-bottom: var(--spacing-xl);
          }

          .feedback-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
          }

          .feedback-badge {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            padding: var(--spacing-sm) var(--spacing-md);
            background-color: var(--primary-light);
            color: var(--primary-dark);
            border-radius: var(--radius-sm);
            font-weight: 500;
            font-size: 0.875rem;
          }

          .feedback-status {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius-sm);
            font-weight: 500;
            font-size: 0.875rem;
          }

          .feedback-status.completed {
            background-color: #ECFDF5;
            color: var(--success);
          }

          .feedback-title {
            font-size: 1.875rem;
            font-weight: 600;
            color: var(--gray-900);
            margin-bottom: var(--spacing-xl);
          }

          .feedback-participants {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-lg);
          }

          .participant-card {
            padding: var(--spacing-lg);
            background-color: var(--gray-50);
            border-radius: var(--radius-md);
          }

          .participant-label {
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            color: var(--gray-600);
            margin-bottom: var(--spacing-md);
            letter-spacing: 0.05em;
          }

          .participant-info {
            display: flex;
            gap: var(--spacing-md);
          }

          .participant-avatar {
            width: 48px;
            height: 48px;
            background-color: var(--primary-light);
            color: var(--primary-dark);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .participant-info h3 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--gray-900);
            margin: 0 0 4px 0;
          }

          .participant-info p {
            font-size: 0.875rem;
            color: var(--gray-600);
            margin: 0;
          }

          .participant-meta {
            font-size: 0.8125rem !important;
            color: var(--gray-500) !important;
          }

          .feedback-meta-info {
            grid-column: 1 / -1;
            display: flex;
            gap: var(--spacing-xl);
            padding-top: var(--spacing-lg);
            border-top: 1px solid var(--gray-200);
            margin-top: var(--spacing-lg);
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            color: var(--gray-600);
            font-size: 0.875rem;
          }

          .meta-item.score {
            color: var(--primary-dark);
            font-weight: 500;
          }

          .categoria-card {
            margin-bottom: var(--spacing-lg);
          }

          .categoria-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-md);
            border-bottom: 2px solid var(--gray-200);
          }

          .categoria-header h2 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--gray-900);
            margin: 0;
          }

          .categoria-media {
            font-size: 0.875rem;
            color: var(--gray-600);
          }

          .categoria-media strong {
            font-size: 1.125rem;
            color: var(--primary-dark);
          }

          .questoes-list {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
          }

          .questao-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--spacing-lg);
            padding: var(--spacing-md);
            background-color: var(--gray-50);
            border-radius: var(--radius-sm);
          }

          .questao-texto {
            flex: 1;
            font-size: 0.9375rem;
            color: var(--gray-700);
            display: flex;
            gap: var(--spacing-sm);
          }

          .questao-numero {
            font-weight: 600;
            color: var(--primary-dark);
          }

          .escala-visual {
            display: flex;
            align-items: center;
            gap: 4px;
          }

          .escala-item {
            color: var(--gray-300);
            transition: color 0.2s ease;
          }

          .escala-item.filled {
            color: #F59E0B;
          }

          .escala-valor {
            margin-left: var(--spacing-sm);
            font-weight: 600;
            color: var(--gray-700);
            font-size: 0.9375rem;
          }

          .comentarios-card h2 {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--gray-900);
            margin-bottom: var(--spacing-xl);
          }

          .comentario-section {
            margin-bottom: var(--spacing-xl);
          }

          .comentario-section:last-child {
            margin-bottom: 0;
          }

          .comentario-section h3 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--gray-900);
            margin-bottom: var(--spacing-md);
          }

          .comentario-section p {
            font-size: 0.9375rem;
            line-height: 1.6;
            color: var(--gray-700);
            margin: 0;
            padding: var(--spacing-md);
            background-color: var(--gray-50);
            border-radius: var(--radius-sm);
            border-left: 3px solid var(--primary-medium);
          }

          @media (max-width: 768px) {
            .feedback-participants {
              grid-template-columns: 1fr;
            }

            .feedback-meta-info {
              flex-direction: column;
              gap: var(--spacing-md);
            }

            .questao-item {
              flex-direction: column;
              align-items: flex-start;
            }

            .escala-visual {
              width: 100%;
              justify-content: space-between;
            }
          }
        `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
