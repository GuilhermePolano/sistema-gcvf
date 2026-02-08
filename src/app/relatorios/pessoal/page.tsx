'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function RelatoriosPessoalPage() {


  const metricas = [
    {
      titulo: 'Media de Competencias',
      valor: '3.8',
      variacao: '+0.3',
      positivo: true,
      icone: BarChart3
    },
    {
      titulo: 'PDIs Concluidos',
      valor: '4/5',
      variacao: '80%',
      positivo: true,
      icone: Target
    },
    {
      titulo: 'Feedbacks Recebidos',
      valor: '12',
      variacao: '+2',
      positivo: true,
      icone: Award
    },
    {
      titulo: 'Participacao em Ciclos',
      valor: '100%',
      variacao: 'Excelente',
      positivo: true,
      icone: Calendar
    }
  ]

  const evolucaoCompetencias = [
    { competencia: 'JavaScript', anterior: 3, atual: 4, meta: 5 },
    { competencia: 'React', anterior: 3, atual: 4, meta: 4 },
    { competencia: 'Node.js', anterior: 2, atual: 3, meta: 4 },
    { competencia: 'TypeScript', anterior: 3, atual: 4, meta: 5 },
    { competencia: 'Docker', anterior: 2, atual: 3, meta: 3 },
    { competencia: 'AWS', anterior: 1, atual: 2, meta: 3 }
  ]

  const historicoPDI = [
    { periodo: 'Q4 2025', objetivo: 'Certificacao React', status: 'concluido', nota: 5 },
    { periodo: 'Q3 2025', objetivo: 'Dominar TypeScript', status: 'concluido', nota: 4 },
    { periodo: 'Q2 2025', objetivo: 'Aprender Docker', status: 'concluido', nota: 4 },
    { periodo: 'Q1 2025', objetivo: 'Projeto de Lideranca', status: 'concluido', nota: 3 },
    { periodo: 'Q1 2026', objetivo: 'AWS Solutions Architect', status: 'em_andamento', nota: null }
  ]

  const feedbacksRecentes = [
    { tipo: 'Gestor', data: 'Jan 2026', nota: 4.5, destaque: 'Excelente evolucao tecnica' },
    { tipo: 'Par', data: 'Jan 2026', nota: 4.2, destaque: 'Otimo trabalho em equipe' },
    { tipo: 'Auto', data: 'Jan 2026', nota: 4.0, destaque: 'Preciso melhorar comunicacao' }
  ]

  return (
    <ProtectedRoute>
      <MainLayout>
      <div className="relatorios-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Meu Desempenho</h1>
            <p className="subtitle">Acompanhe sua evolucao profissional</p>
          </div>
          <div className="periodo-selector">
            <select defaultValue="2025">
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>

        {/* Cards de Metricas */}
        <div className="metricas-grid">
          {metricas.map((metrica, idx) => {
            const Icon = metrica.icone
            return (
              <div key={idx} className="metrica-card">
                <div className="metrica-icon">
                  <Icon size={24} />
                </div>
                <div className="metrica-content">
                  <span className="metrica-titulo">{metrica.titulo}</span>
                  <div className="metrica-valor-row">
                    <span className="metrica-valor">{metrica.valor}</span>
                    <span className={`metrica-variacao ${metrica.positivo ? 'positivo' : 'negativo'}`}>
                      {metrica.positivo ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {metrica.variacao}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="content-grid">
          {/* Evolucao de Competencias */}
          <div className="card">
            <div className="card-header">
              <h2>Evolucao de Competencias</h2>
              <span className="card-subtitle">Comparativo com periodo anterior</span>
            </div>
            <div className="competencias-list">
              {evolucaoCompetencias.map((comp, idx) => (
                <div key={idx} className="competencia-row">
                  <span className="comp-nome">{comp.competencia}</span>
                  <div className="comp-barras">
                    <div className="barra-container">
                      <div
                        className="barra anterior"
                        style={{ width: `${(comp.anterior / 5) * 100}%` }}
                      />
                    </div>
                    <div className="barra-container">
                      <div
                        className="barra atual"
                        style={{ width: `${(comp.atual / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="comp-valores">
                    <span className="valor-anterior">{comp.anterior}</span>
                    <span className="valor-seta">→</span>
                    <span className="valor-atual">{comp.atual}</span>
                    <span className="valor-meta">Meta: {comp.meta}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="legenda-barras">
              <span><span className="dot anterior"></span> Anterior</span>
              <span><span className="dot atual"></span> Atual</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Historico PDI */}
            <div className="card">
              <div className="card-header">
                <h2>Historico de PDIs</h2>
              </div>
              <div className="pdi-list">
                {historicoPDI.map((pdi, idx) => (
                  <div key={idx} className="pdi-item">
                    <div className="pdi-info">
                      <span className="pdi-objetivo">{pdi.objetivo}</span>
                      <span className="pdi-periodo">{pdi.periodo}</span>
                    </div>
                    <div className={`pdi-status ${pdi.status}`}>
                      {pdi.status === 'concluido' ? (
                        <span className="nota">{pdi.nota}/5</span>
                      ) : (
                        <span>Em andamento</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedbacks Recentes */}
            <div className="card">
              <div className="card-header">
                <h2>Feedbacks Recentes</h2>
              </div>
              <div className="feedback-list">
                {feedbacksRecentes.map((fb, idx) => (
                  <div key={idx} className="feedback-item">
                    <div className="feedback-header">
                      <span className="feedback-tipo">{fb.tipo}</span>
                      <span className="feedback-nota">{fb.nota}</span>
                    </div>
                    <p className="feedback-destaque">"{fb.destaque}"</p>
                    <span className="feedback-data">{fb.data}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .relatorios-page {
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

        .periodo-selector select {
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
        }

        .metricas-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .metrica-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .metrica-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3B82F6;
        }

        .metrica-content {
          display: flex;
          flex-direction: column;
        }

        .metrica-titulo {
          font-size: 0.75rem;
          color: #64748b;
        }

        .metrica-valor-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .metrica-valor {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .metrica-variacao {
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .metrica-variacao.positivo {
          color: #22C55E;
        }

        .metrica-variacao.negativo {
          color: #EF4444;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-header {
          margin-bottom: 20px;
        }

        .card-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 2px;
        }

        .card-subtitle {
          font-size: 0.8125rem;
          color: #64748b;
        }

        .competencias-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .competencia-row {
          display: grid;
          grid-template-columns: 100px 1fr 140px;
          align-items: center;
          gap: 16px;
        }

        .comp-nome {
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
        }

        .comp-barras {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .barra-container {
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }

        .barra {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .barra.anterior {
          background: #CBD5E1;
        }

        .barra.atual {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
        }

        .comp-valores {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8125rem;
        }

        .valor-anterior {
          color: #94a3b8;
        }

        .valor-seta {
          color: #cbd5e1;
        }

        .valor-atual {
          color: #3B82F6;
          font-weight: 600;
        }

        .valor-meta {
          color: #94a3b8;
          margin-left: 8px;
          font-size: 0.75rem;
        }

        .legenda-barras {
          display: flex;
          gap: 16px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
          font-size: 0.75rem;
          color: #64748b;
        }

        .legenda-barras .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 2px;
          margin-right: 6px;
        }

        .dot.anterior {
          background: #CBD5E1;
        }

        .dot.atual {
          background: #3B82F6;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .pdi-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pdi-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
        }

        .pdi-info {
          display: flex;
          flex-direction: column;
        }

        .pdi-objetivo {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1e293b;
        }

        .pdi-periodo {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .pdi-status {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .pdi-status.concluido {
          background: rgba(34, 197, 94, 0.15);
          color: #22C55E;
        }

        .pdi-status.em_andamento {
          background: rgba(59, 130, 246, 0.15);
          color: #3B82F6;
        }

        .nota {
          font-weight: 600;
        }

        .feedback-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feedback-item {
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
        }

        .feedback-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .feedback-tipo {
          font-size: 0.75rem;
          font-weight: 600;
          color: #3B82F6;
          text-transform: uppercase;
        }

        .feedback-nota {
          font-weight: 700;
          color: #22C55E;
        }

        .feedback-destaque {
          font-size: 0.875rem;
          color: #475569;
          font-style: italic;
          margin-bottom: 4px;
        }

        .feedback-data {
          font-size: 0.6875rem;
          color: #94a3b8;
        }

        @media (max-width: 1024px) {
          .metricas-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .metricas-grid {
            grid-template-columns: 1fr;
          }

          .competencia-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
