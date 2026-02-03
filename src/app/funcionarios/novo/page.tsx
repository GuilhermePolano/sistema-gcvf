'use client'

import MainLayout from '@/components/Layout/MainLayout'
import { useState } from 'react'
import {
  Save,
  X,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Stack {
  id: number
  categoria: string
  tecnologia: string
  nivel: number
}

export default function NovoFuncionarioPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    dadosBasicos: true,
    competencias: true
  })

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cargo: '',
    nivel: '',
    areaAtuacao: '',
    entidade: '',
    setor: '',
    dataAdmissao: '',
    dataNascimento: '',
    genero: '',
    emailCorporativo: '',
    telefone: '',
    status: 'ativo'
  })

  const [stacks, setStacks] = useState<Stack[]>([])
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const [showAddStack, setShowAddStack] = useState(false)
  const [newStack, setNewStack] = useState({
    categoria: '',
    tecnologia: '',
    nivel: 0
  })

  const user = {
    name: 'Maria Coordenadora',
    role: 'Coordenadora',
    entity: 'FIERGS - GINFO',
    userRole: 'coordenador' as const
  }

  const niveis = ['Estagiário', 'Júnior', 'Pleno', 'Sênior']
  const areas = ['Técnico', 'Negócios']
  const entidades = ['FIERGS', 'SESI', 'SENAI', 'IEL', 'CIERGS']
  const setores = ['GINFO', 'RH', 'Financeiro', 'Administrativo', 'Comercial']
  const generos = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar']

  const categoriasTecnologias = {
    'Frontend': ['JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Next.js', 'HTML', 'CSS', 'Tailwind'],
    'Backend': ['Node.js', 'Nest.js', 'Express', 'Python', 'Django', 'Java', 'Spring Boot', 'C#', '.NET'],
    'Banco de Dados': ['PostgreSQL', 'MySQL', 'Oracle', 'MariaDB', 'MongoDB', 'Redis'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'GitLab CI'],
    'QA': ['Selenium', 'Cypress', 'Jest', 'JUnit', 'Postman'],
    'Outros': ['Git', 'Scrum', 'Kanban', 'Power BI', 'Excel Avançado']
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome é obrigatório'
    if (!formData.cargo.trim()) newErrors.cargo = 'Cargo é obrigatório'
    if (!formData.nivel) newErrors.nivel = 'Nível é obrigatório'
    if (!formData.areaAtuacao) newErrors.areaAtuacao = 'Área de atuação é obrigatória'
    if (!formData.entidade) newErrors.entidade = 'Entidade é obrigatória'
    if (!formData.setor) newErrors.setor = 'Setor é obrigatório'
    if (!formData.dataAdmissao) newErrors.dataAdmissao = 'Data de admissão é obrigatória'
    if (!formData.emailCorporativo.trim()) {
      newErrors.emailCorporativo = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.emailCorporativo)) {
      newErrors.emailCorporativo = 'Email inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Dados do funcionário:', { ...formData, stacks })
      router.push('/funcionarios')
    } catch (error) {
      console.error('Erro ao salvar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addStack = () => {
    if (newStack.categoria && newStack.tecnologia) {
      setStacks(prev => [
        ...prev,
        {
          id: Date.now(),
          ...newStack
        }
      ])
      setNewStack({ categoria: '', tecnologia: '', nivel: 0 })
      setShowAddStack(false)
    }
  }

  const removeStack = (id: number) => {
    setStacks(prev => prev.filter(s => s.id !== id))
  }

  const updateStackNivel = (id: number, nivel: number) => {
    setStacks(prev => prev.map(s =>
      s.id === id ? { ...s, nivel } : s
    ))
  }

  const renderNivelSelector = (currentNivel: number, onChange: (nivel: number) => void) => {
    return (
      <div className="nivel-selector">
        {[0, 1, 2, 3, 4, 5].map(nivel => (
          <button
            key={nivel}
            type="button"
            className={`nivel-btn ${currentNivel === nivel ? 'active' : ''}`}
            onClick={() => onChange(nivel)}
          >
            {nivel}
          </button>
        ))}
      </div>
    )
  }

  const renderSkillLevel = (level: number) => {
    return (
      <div className="skill-level-display">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`skill-dot ${i < level ? 'filled' : ''}`}
          />
        ))}
        <span className="skill-level-text">({level}/5)</span>
      </div>
    )
  }

  const stacksByCategoria = stacks.reduce((acc, stack) => {
    if (!acc[stack.categoria]) {
      acc[stack.categoria] = []
    }
    acc[stack.categoria].push(stack)
    return acc
  }, {} as {[key: string]: Stack[]})

  return (
    <MainLayout user={user}>
      <div className="novo-funcionario-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Equipe</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span>Funcionários</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Novo Cadastro</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Header da Página */}
          <div className="page-header">
            <div className="page-title-section">
              <h1>Cadastro de Funcionário</h1>
              <p className="page-subtitle">Preencha os dados do novo funcionário</p>
            </div>
            <div className="header-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => router.push('/funcionarios')}
              >
                <X size={20} />
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                <Save size={20} />
                {isLoading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>

          {/* Seção: Dados Básicos */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => setExpandedSections(prev => ({ ...prev, dadosBasicos: !prev.dadosBasicos }))}
            >
              <h2>Dados Básicos</h2>
              {expandedSections.dadosBasicos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {expandedSections.dadosBasicos && (
              <div className="section-content">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label required">Nome Completo</label>
                    <input
                      type="text"
                      name="nomeCompleto"
                      className={`form-input ${errors.nomeCompleto ? 'error' : ''}`}
                      placeholder="Digite o nome completo"
                      value={formData.nomeCompleto}
                      onChange={handleInputChange}
                    />
                    {errors.nomeCompleto && <span className="form-error">{errors.nomeCompleto}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Cargo</label>
                    <input
                      type="text"
                      name="cargo"
                      className={`form-input ${errors.cargo ? 'error' : ''}`}
                      placeholder="Ex: Desenvolvedor, Analista"
                      value={formData.cargo}
                      onChange={handleInputChange}
                    />
                    {errors.cargo && <span className="form-error">{errors.cargo}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Nível</label>
                    <select
                      name="nivel"
                      className={`form-select ${errors.nivel ? 'error' : ''}`}
                      value={formData.nivel}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione o nível</option>
                      {niveis.map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    {errors.nivel && <span className="form-error">{errors.nivel}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Área de Atuação</label>
                    <select
                      name="areaAtuacao"
                      className={`form-select ${errors.areaAtuacao ? 'error' : ''}`}
                      value={formData.areaAtuacao}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione a área</option>
                      {areas.map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    {errors.areaAtuacao && <span className="form-error">{errors.areaAtuacao}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Entidade</label>
                    <select
                      name="entidade"
                      className={`form-select ${errors.entidade ? 'error' : ''}`}
                      value={formData.entidade}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione a entidade</option>
                      {entidades.map(e => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                    {errors.entidade && <span className="form-error">{errors.entidade}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Setor</label>
                    <select
                      name="setor"
                      className={`form-select ${errors.setor ? 'error' : ''}`}
                      value={formData.setor}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione o setor</option>
                      {setores.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.setor && <span className="form-error">{errors.setor}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Data de Admissão</label>
                    <input
                      type="date"
                      name="dataAdmissao"
                      className={`form-input ${errors.dataAdmissao ? 'error' : ''}`}
                      value={formData.dataAdmissao}
                      onChange={handleInputChange}
                    />
                    {errors.dataAdmissao && <span className="form-error">{errors.dataAdmissao}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Data de Nascimento</label>
                    <input
                      type="date"
                      name="dataNascimento"
                      className="form-input"
                      value={formData.dataNascimento}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gênero</label>
                    <select
                      name="genero"
                      className="form-select"
                      value={formData.genero}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione</option>
                      {generos.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Email Corporativo</label>
                    <input
                      type="email"
                      name="emailCorporativo"
                      className={`form-input ${errors.emailCorporativo ? 'error' : ''}`}
                      placeholder="email@fiergs.org.br"
                      value={formData.emailCorporativo}
                      onChange={handleInputChange}
                    />
                    {errors.emailCorporativo && <span className="form-error">{errors.emailCorporativo}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telefone</label>
                    <input
                      type="tel"
                      name="telefone"
                      className="form-input"
                      placeholder="(51) 99999-9999"
                      value={formData.telefone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Seção: Competências Técnicas */}
          <div className="form-section">
            <div
              className="section-header"
              onClick={() => setExpandedSections(prev => ({ ...prev, competencias: !prev.competencias }))}
            >
              <h2>Competências Técnicas</h2>
              <div className="section-header-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowAddStack(true)
                  }}
                >
                  <Plus size={16} />
                  Adicionar
                </button>
                {expandedSections.competencias ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedSections.competencias && (
              <div className="section-content">
                {/* Modal para adicionar stack */}
                {showAddStack && (
                  <div className="add-stack-form">
                    <h4>Adicionar Competência</h4>
                    <div className="add-stack-grid">
                      <div className="form-group">
                        <label className="form-label">Categoria</label>
                        <select
                          className="form-select"
                          value={newStack.categoria}
                          onChange={(e) => setNewStack(prev => ({ ...prev, categoria: e.target.value, tecnologia: '' }))}
                        >
                          <option value="">Selecione</option>
                          {Object.keys(categoriasTecnologias).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Tecnologia</label>
                        <select
                          className="form-select"
                          value={newStack.tecnologia}
                          onChange={(e) => setNewStack(prev => ({ ...prev, tecnologia: e.target.value }))}
                          disabled={!newStack.categoria}
                        >
                          <option value="">Selecione</option>
                          {newStack.categoria && categoriasTecnologias[newStack.categoria as keyof typeof categoriasTecnologias]?.map(tech => (
                            <option key={tech} value={tech}>{tech}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Nível (0-5)</label>
                        {renderNivelSelector(newStack.nivel, (nivel) => setNewStack(prev => ({ ...prev, nivel })))}
                      </div>
                    </div>

                    <div className="add-stack-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setShowAddStack(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addStack}
                        disabled={!newStack.categoria || !newStack.tecnologia}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                )}

                {/* Lista de Stacks por Categoria */}
                {Object.keys(stacksByCategoria).length === 0 ? (
                  <div className="empty-stacks">
                    <p>Nenhuma competência técnica cadastrada.</p>
                    <p className="text-muted">Clique em "Adicionar" para incluir competências.</p>
                  </div>
                ) : (
                  <div className="stacks-list">
                    {Object.entries(stacksByCategoria).map(([categoria, stacksCategoria]) => (
                      <div key={categoria} className="categoria-group">
                        <h4 className="categoria-title">{categoria}</h4>
                        <div className="stacks-grid">
                          {stacksCategoria.map(stack => (
                            <div key={stack.id} className="stack-item">
                              <div className="stack-info">
                                <span className="stack-name">{stack.tecnologia}</span>
                                {renderSkillLevel(stack.nivel)}
                              </div>
                              <div className="stack-actions">
                                {renderNivelSelector(stack.nivel, (nivel) => updateStackNivel(stack.id, nivel))}
                                <button
                                  type="button"
                                  className="btn-icon danger"
                                  onClick={() => removeStack(stack.id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        .novo-funcionario-page {
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

        .header-actions {
          display: flex;
          gap: var(--spacing-md);
        }

        .form-section {
          background-color: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
          cursor: pointer;
          border-bottom: 1px solid var(--gray-200);
        }

        .section-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          color: var(--gray-900);
        }

        .section-header-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .section-content {
          padding: var(--spacing-lg);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-lg);
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label.required::after {
          content: ' *';
          color: var(--error);
        }

        .add-stack-form {
          background-color: var(--primary-light);
          border: 1px solid var(--primary-medium);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        .add-stack-form h4 {
          margin-bottom: var(--spacing-md);
          color: var(--primary-dark);
        }

        .add-stack-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .add-stack-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-sm);
        }

        .nivel-selector {
          display: flex;
          gap: var(--spacing-xs);
        }

        .nivel-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--gray-400);
          background-color: var(--white);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nivel-btn:hover {
          border-color: var(--primary-medium);
          color: var(--primary-medium);
        }

        .nivel-btn.active {
          background-color: var(--primary-dark);
          border-color: var(--primary-dark);
          color: var(--white);
        }

        .empty-stacks {
          text-align: center;
          padding: var(--spacing-2xl);
          color: var(--gray-600);
        }

        .empty-stacks p {
          margin-bottom: var(--spacing-sm);
        }

        .stacks-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .categoria-group {
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .categoria-title {
          background-color: var(--gray-50);
          padding: var(--spacing-md);
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-700);
          border-bottom: 1px solid var(--gray-200);
        }

        .stacks-grid {
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .stack-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background-color: var(--gray-50);
          border-radius: var(--radius-sm);
          border: 1px solid var(--gray-200);
        }

        .stack-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .stack-name {
          font-weight: 500;
          color: var(--gray-900);
        }

        .skill-level-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .skill-level-text {
          font-size: 0.75rem;
          color: var(--gray-600);
          margin-left: var(--spacing-sm);
        }

        .stack-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .btn-icon {
          background: none;
          border: none;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          cursor: pointer;
          color: var(--gray-600);
          transition: all 0.2s ease;
        }

        .btn-icon:hover {
          background-color: var(--gray-100);
        }

        .btn-icon.danger:hover {
          background-color: #FEE2E2;
          color: var(--error);
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .header-actions {
            flex-direction: column;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .add-stack-grid {
            grid-template-columns: 1fr;
          }

          .stack-item {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }

          .stack-actions {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </MainLayout>
  )
}
