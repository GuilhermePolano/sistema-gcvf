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
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useState } from 'react'

export default function VisualizarFuncionarioPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [showDesligarModal, setShowDesligarModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'dados' | 'formacao' | 'competencias' | 'historico'>('dados')
  
  const funcionarioId = params.id

  // Dados mockados
  const funcionario = {
    id: funcionarioId,
    // Dados Pessoais
    nome: 'João Pedro da Silva',
    cpf: '123.456.789-01',
    rg: '1234567890',
    dataNascimento: '1990-05-15',
    estadoCivil: 'Solteiro',
    genero: 'Masculino',
    nacionalidade: 'Brasileira',
    
    // Contato
    email: 'joao.silva@fiergs.org.br',
    emailPessoal: 'joao.silva@gmail.com',
    telefone: '(51) 99999-1111',
    telefoneEmergencia: '(51) 98888-2222',
    contatoEmergencia: 'Maria Silva (Mãe)',
    
    // Endereço
    cep: '90000-000',
    endereco: 'Rua das Flores, 123',
    complemento: 'Apto 45',
    bairro: 'Centro',
    cidade: 'Porto Alegre',
    estado: 'RS',
    
    // Dados Profissionais
    matricula: 'FIERGS-2021-001',
    cargo: 'Desenvolvedor Pleno',
    setor: 'Desenvolvimento',
    entidade: 'FIERGS',
    dataAdmissao: '2021-03-10',
    tipoContrato: 'CLT',
    cargaHoraria: '40h semanais',
    salario: 'R$ 8.500,00',
    status: 'ATIVO',
    gestor: 'Maria Santos',
    
    // Formação Acadêmica
    formacao: [
      {
        nivel: 'Graduação',
        curso: 'Ciência da Computação',
        instituicao: 'UFRGS',
        anoConclusao: '2015',
        status: 'Concluído'
      },
      {
        nivel: 'Pós-Graduação',
        curso: 'Engenharia de Software',
        instituicao: 'PUC-RS',
        anoConclusao: '2018',
        status: 'Concluído'
      }
    ],
    
    // Certificações
    certificacoes: [
      {
        nome: 'AWS Certified Developer',
        instituicao: 'Amazon',
        dataObtencao: '2022-06-15',
        validade: '2025-06-15'
      },
      {
        nome: 'Professional Scrum Master I',
        instituicao: 'Scrum.org',
        dataObtencao: '2021-03-20',
        validade: 'Vitalícia'
      }
    ],
    
    // Competências Técnicas
    competenciasTecnicas: [
      { nome: 'JavaScript', nivel: 4, categoria: 'Linguagem' },
      { nome: 'React', nivel: 4, categoria: 'Framework' },
      { nome: 'Node.js', nivel: 3, categoria: 'Backend' },
      { nome: 'TypeScript', nivel: 4, categoria: 'Linguagem' },
      { nome: 'Docker', nivel: 3, categoria: 'DevOps' },
      { nome: 'Git', nivel: 4, categoria: 'Ferramentas' },
      { nome: 'PostgreSQL', nivel: 3, categoria: 'Banco de Dados' },
      { nome: 'AWS', nivel: 3, categoria: 'Cloud' }
    ],
    
    // Competências Comportamentais
    competenciasComportamentais: [
      { nome: 'Comunicação', nivel: 4 },
      { nome: 'Trabalho em Equipe', nivel: 5 },
      { nome: 'Liderança', nivel: 3 },
      { nome: 'Resolução de Problemas', nivel: 4 },
      { nome: 'Adaptabilidade', nivel: 4 },
      { nome: 'Proatividade', nivel: 5 }
    ],
    
    // Idiomas
    idiomas: [
      { idioma: 'Português', nivel: 'Nativo' },
      { idioma: 'Inglês', nivel: 'Avançado' },
      { idioma: 'Espanhol', nivel: 'Intermediário' }
    ],
    
    // Histórico Profissional (na empresa)
    historico: [
      {
        cargo: 'Desenvolvedor Pleno',
        dataInicio: '2023-01-15',
        dataFim: null,
        tipo: 'Promoção'
      },
      {
        cargo: 'Desenvolvedor Júnior',
        dataInicio: '2021-03-10',
        dataFim: '2023-01-14',
        tipo: 'Admissão'
      }
    ],
    
    // Benefícios
    beneficios: [
      'Vale Alimentação',
      'Vale Transporte',
      'Plano de Saúde',
      'Plano Odontológico',
      'Seguro de Vida',
      'Gympass'
    ],
    
    // Observações
    observacoes: 'Funcionário dedicado com excelente desempenho técnico. Demonstra interesse em assumir responsabilidades de liderança.'
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

            {/* Tabs */}
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'dados' ? 'active' : ''}`}
                onClick={() => setActiveTab('dados')}
              >
                Dados Pessoais e Profissionais
              </button>
              <button 
                className={`tab ${activeTab === 'formacao' ? 'active' : ''}`}
                onClick={() => setActiveTab('formacao')}
              >
                Formação e Certificações
              </button>
              <button 
                className={`tab ${activeTab === 'competencias' ? 'active' : ''}`}
                onClick={() => setActiveTab('competencias')}
              >
                Competências e Idiomas
              </button>
              <button 
                className={`tab ${activeTab === 'historico' ? 'active' : ''}`}
                onClick={() => setActiveTab('historico')}
              >
                Histórico e Benefícios
              </button>
            </div>

            {/* Tab: Dados Pessoais e Profissionais */}
            {activeTab === 'dados' && (
              <div className="tab-content">
                <h3>Dados Pessoais</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">CPF</span>
                    <span className="value">{funcionario.cpf}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">RG</span>
                    <span className="value">{funcionario.rg}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Data de Nascimento</span>
                    <span className="value">{new Date(funcionario.dataNascimento).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Estado Civil</span>
                    <span className="value">{funcionario.estadoCivil}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Gênero</span>
                    <span className="value">{funcionario.genero}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Nacionalidade</span>
                    <span className="value">{funcionario.nacionalidade}</span>
                  </div>
                </div>

                <h3>Contato</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Mail size={18} />
                    <div>
                      <span className="label">Email Corporativo</span>
                      <span className="value">{funcionario.email}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Mail size={18} />
                    <div>
                      <span className="label">Email Pessoal</span>
                      <span className="value">{funcionario.emailPessoal}</span>
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
                    <Phone size={18} />
                    <div>
                      <span className="label">Emergência</span>
                      <span className="value">{funcionario.telefoneEmergencia}</span>
                      <span className="sublabel">{funcionario.contatoEmergencia}</span>
                    </div>
                  </div>
                </div>

                <h3>Endereço</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">CEP</span>
                    <span className="value">{funcionario.cep}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Endereço</span>
                    <span className="value">{funcionario.endereco}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Complemento</span>
                    <span className="value">{funcionario.complemento}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Bairro</span>
                    <span className="value">{funcionario.bairro}</span>
                  </div>
                  <div className="info-item">
                    <MapPin size={18} />
                    <div>
                      <span className="label">Cidade/Estado</span>
                      <span className="value">{funcionario.cidade} - {funcionario.estado}</span>
                    </div>
                  </div>
                </div>

                <h3>Dados Profissionais</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Matrícula</span>
                    <span className="value">{funcionario.matricula}</span>
                  </div>
                  <div className="info-item">
                    <Briefcase size={18} />
                    <div>
                      <span className="label">Cargo</span>
                      <span className="value">{funcionario.cargo}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Building2 size={18} />
                    <div>
                      <span className="label">Setor</span>
                      <span className="value">{funcionario.setor}</span>
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
                    <Calendar size={18} />
                    <div>
                      <span className="label">Data de Admissão</span>
                      <span className="value">{new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="label">Tipo de Contrato</span>
                    <span className="value">{funcionario.tipoContrato}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Carga Horária</span>
                    <span className="value">{funcionario.cargaHoraria}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Gestor Direto</span>
                    <span className="value">{funcionario.gestor}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Formação */}
            {activeTab === 'formacao' && (
              <div className="tab-content">
                <h3>Formação Acadêmica</h3>
                {funcionario.formacao.map((form, idx) => (
                  <div key={idx} className="formacao-item">
                    <div className="formacao-header">
                      <Award size={20} />
                      <div>
                        <h4>{form.nivel} - {form.curso}</h4>
                        <p>{form.instituicao} • {form.anoConclusao} • {form.status}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <h3>Certificações</h3>
                {funcionario.certificacoes.map((cert, idx) => (
                  <div key={idx} className="certificacao-item">
                    <div>
                      <h4>{cert.nome}</h4>
                      <p>{cert.instituicao}</p>
                      <p className="cert-dates">
                        Obtida em: {new Date(cert.dataObtencao).toLocaleDateString('pt-BR')} • 
                        Validade: {cert.validade}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Competências */}
            {activeTab === 'competencias' && (
              <div className="tab-content">
                <h3>Competências Técnicas</h3>
                <div className="competencias-grid">
                  {funcionario.competenciasTecnicas.map((comp, idx) => (
                    <div key={idx} className="competencia-item">
                      <div>
                        <span className="comp-name">{comp.nome}</span>
                        <span className="comp-cat">{comp.categoria}</span>
                      </div>
                      <div className="nivel-dots">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div key={n} className={`dot ${n <= comp.nivel ? 'filled' : ''}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <h3>Competências Comportamentais</h3>
                <div className="competencias-grid">
                  {funcionario.competenciasComportamentais.map((comp, idx) => (
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

                <h3>Idiomas</h3>
                <div className="idiomas-list">
                  {funcionario.idiomas.map((idioma, idx) => (
                    <div key={idx} className="idioma-item">
                      <span>{idioma.idioma}</span>
                      <span className="badge badge-primary">{idioma.nivel}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Histórico */}
            {activeTab === 'historico' && (
              <div className="tab-content">
                <h3>Histórico Profissional na Empresa</h3>
                <div className="timeline">
                  {funcionario.historico.map((hist, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h4>{hist.cargo}</h4>
                        <p>
                          {new Date(hist.dataInicio).toLocaleDateString('pt-BR')} - 
                          {hist.dataFim ? new Date(hist.dataFim).toLocaleDateString('pt-BR') : 'Atual'}
                        </p>
                        <span className="badge badge-info">{hist.tipo}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3>Benefícios</h3>
                <div className="beneficios-grid">
                  {funcionario.beneficios.map((ben, idx) => (
                    <div key={idx} className="beneficio-item">
                      <CheckCircle size={16} />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>

                {funcionario.observacoes && (
                  <>
                    <h3>Observações</h3>
                    <div className="observacoes">
                      <p>{funcionario.observacoes}</p>
                    </div>
                  </>
                )}
              </div>
            )}
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
