'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import {
  Settings,
  MessageSquare,
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  List,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  questionCount: number
  active: boolean
}

interface Question {
  id: number
  categoryId: number
  text: string
  type: 'multiple' | 'scale' | 'text'
  options?: string[]
  required: boolean
  active: boolean
}

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<'categorias' | 'perguntas' | 'geral'>('categorias')
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [searchTerm, setSearchTerm] = useState('')



  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Competências Técnicas', description: 'Avaliação de habilidades técnicas e conhecimento', questionCount: 12, active: true },
    { id: 2, name: 'Habilidades Comportamentais', description: 'Avaliação de soft skills e comportamento', questionCount: 8, active: true },
    { id: 3, name: 'Trabalho em Equipe', description: 'Colaboração e integração com a equipe', questionCount: 6, active: true },
    { id: 4, name: 'Liderança', description: 'Capacidades de liderança e gestão', questionCount: 5, active: true },
    { id: 5, name: 'Inovação', description: 'Criatividade e proposição de melhorias', questionCount: 4, active: false },
    { id: 6, name: 'Comunicação', description: 'Habilidades de comunicação oral e escrita', questionCount: 7, active: true }
  ])

  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, categoryId: 1, text: 'Como você avalia seu conhecimento em JavaScript?', type: 'multiple', options: ['Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Expert'], required: true, active: true },
    { id: 2, categoryId: 1, text: 'Descreva um projeto recente onde aplicou suas habilidades técnicas:', type: 'text', required: true, active: true },
    { id: 3, categoryId: 1, text: 'De 0 a 5, avalie sua capacidade de resolver problemas técnicos complexos:', type: 'scale', required: true, active: true },
    { id: 4, categoryId: 2, text: 'Como você avalia sua comunicação com a equipe?', type: 'multiple', options: ['Precisa melhorar', 'Regular', 'Boa', 'Muito boa', 'Excelente'], required: true, active: true },
    { id: 5, categoryId: 2, text: 'De 0 a 5, avalie sua proatividade:', type: 'scale', required: true, active: true },
    { id: 6, categoryId: 3, text: 'Como você avalia sua colaboração com outros membros?', type: 'multiple', options: ['Precisa melhorar', 'Regular', 'Boa', 'Muito boa', 'Excelente'], required: true, active: true }
  ])

  const filteredQuestions = questions.filter(q =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryQuestions = (categoryId: number) => {
    return questions.filter(q => q.categoryId === categoryId)
  }

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  const toggleCategoryActive = (id: number) => {
    setCategories(categories.map(c =>
      c.id === id ? { ...c, active: !c.active } : c
    ))
  }

  const toggleQuestionActive = (id: number) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, active: !q.active } : q
    ))
  }

  const openEditCategory = (category: Category) => {
    setEditingCategory(category)
    setShowCategoryModal(true)
  }

  const openNewCategory = () => {
    setEditingCategory(null)
    setShowCategoryModal(true)
  }

  const openEditQuestion = (question: Question) => {
    setEditingQuestion(question)
    setShowQuestionModal(true)
  }

  const openNewQuestion = (categoryId?: number) => {
    setEditingQuestion(categoryId ? { id: 0, categoryId, text: '', type: 'multiple', required: true, active: true } : null)
    setShowQuestionModal(true)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple': return 'Múltipla Escolha'
      case 'scale': return 'Escala (0-5)'
      case 'text': return 'Texto Livre'
      default: return type
    }
  }

  return (
    <ProtectedRoute>
      <MainLayout>
      <div className="configuracoes-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">{'>'}</span>
          <span className="breadcrumb-current">Configurações</span>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-info">
            <h1>Configurações</h1>
            <p className="subtitle">Gerencie categorias, perguntas e configurações do sistema</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'categorias' ? 'active' : ''}`}
            onClick={() => setActiveTab('categorias')}
          >
            <FolderOpen size={18} />
            Categorias
          </button>
          <button
            className={`tab ${activeTab === 'perguntas' ? 'active' : ''}`}
            onClick={() => setActiveTab('perguntas')}
          >
            <MessageSquare size={18} />
            Banco de Perguntas
          </button>
          <button
            className={`tab ${activeTab === 'geral' ? 'active' : ''}`}
            onClick={() => setActiveTab('geral')}
          >
            <Settings size={18} />
            Geral
          </button>
        </div>

        {/* Tab Content: Categorias */}
        {activeTab === 'categorias' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Categorias de Avaliação</h2>
              <button className="btn btn-primary" onClick={openNewCategory}>
                <Plus size={18} />
                Nova Categoria
              </button>
            </div>

            <div className="categories-list">
              {categories.map((category) => (
                <div key={category.id} className={`category-card ${!category.active ? 'inactive' : ''}`}>
                  <div
                    className="category-header"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="category-info">
                      <div className="category-title-row">
                        <h3>{category.name}</h3>
                        <span className={`status-badge ${category.active ? 'active' : 'inactive'}`}>
                          {category.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                      <p className="category-description">{category.description}</p>
                      <span className="question-count">{category.questionCount} perguntas</span>
                    </div>
                    <div className="category-actions">
                      <button
                        className="icon-btn"
                        onClick={(e) => { e.stopPropagation(); toggleCategoryActive(category.id); }}
                        title={category.active ? 'Desativar' : 'Ativar'}
                      >
                        {category.active ? <ToggleRight size={20} className="text-success" /> : <ToggleLeft size={20} />}
                      </button>
                      <button
                        className="icon-btn"
                        onClick={(e) => { e.stopPropagation(); openEditCategory(category); }}
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button className="expand-btn">
                        {expandedCategory === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {expandedCategory === category.id && (
                    <div className="category-questions">
                      <div className="questions-header">
                        <span>Perguntas desta categoria</span>
                        <button className="btn btn-sm btn-secondary" onClick={() => openNewQuestion(category.id)}>
                          <Plus size={16} />
                          Adicionar Pergunta
                        </button>
                      </div>
                      <div className="questions-list">
                        {getCategoryQuestions(category.id).map((question, index) => (
                          <div key={question.id} className={`question-item ${!question.active ? 'inactive' : ''}`}>
                            <span className="question-number">{index + 1}</span>
                            <div className="question-info">
                              <p className="question-text">{question.text}</p>
                              <div className="question-meta">
                                <span className="type-badge">{getTypeLabel(question.type)}</span>
                                {question.required && <span className="required-badge">Obrigatória</span>}
                              </div>
                            </div>
                            <div className="question-actions">
                              <button
                                className="icon-btn"
                                onClick={() => toggleQuestionActive(question.id)}
                                title={question.active ? 'Desativar' : 'Ativar'}
                              >
                                {question.active ? <ToggleRight size={18} className="text-success" /> : <ToggleLeft size={18} />}
                              </button>
                              <button className="icon-btn" onClick={() => openEditQuestion(question)} title="Editar">
                                <Edit size={16} />
                              </button>
                              <button className="icon-btn danger" title="Excluir">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                        {getCategoryQuestions(category.id).length === 0 && (
                          <p className="empty-message">Nenhuma pergunta nesta categoria</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Banco de Perguntas */}
        {activeTab === 'perguntas' && (
          <div className="tab-content">
            <div className="content-header">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Buscar perguntas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={() => openNewQuestion()}>
                <Plus size={18} />
                Nova Pergunta
              </button>
            </div>

            <div className="all-questions-list">
              {filteredQuestions.map((question) => {
                const category = categories.find(c => c.id === question.categoryId)
                return (
                  <div key={question.id} className={`question-card ${!question.active ? 'inactive' : ''}`}>
                    <div className="question-content">
                      <div className="question-header">
                        <span className="category-tag">{category?.name}</span>
                        <span className={`status-badge ${question.active ? 'active' : 'inactive'}`}>
                          {question.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                      <p className="question-text">{question.text}</p>
                      <div className="question-meta">
                        <span className="type-badge">{getTypeLabel(question.type)}</span>
                        {question.required && <span className="required-badge">Obrigatória</span>}
                        {question.options && (
                          <span className="options-count">{question.options.length} opções</span>
                        )}
                      </div>
                    </div>
                    <div className="question-actions">
                      <button
                        className="icon-btn"
                        onClick={() => toggleQuestionActive(question.id)}
                      >
                        {question.active ? <ToggleRight size={20} className="text-success" /> : <ToggleLeft size={20} />}
                      </button>
                      <button className="icon-btn" onClick={() => openEditQuestion(question)}>
                        <Edit size={18} />
                      </button>
                      <button className="icon-btn danger">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="stats-summary">
              <div className="stat-item">
                <span className="stat-value">{questions.length}</span>
                <span className="stat-label">Total de Perguntas</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{questions.filter(q => q.active).length}</span>
                <span className="stat-label">Perguntas Ativas</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{categories.filter(c => c.active).length}</span>
                <span className="stat-label">Categorias Ativas</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Geral */}
        {activeTab === 'geral' && (
          <div className="tab-content">
            <div className="settings-section">
              <h3>Configurações de Feedback</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Permitir feedback anônimo</h4>
                    <p>Avaliações de pares podem ser anônimas</p>
                  </div>
                  <button className="toggle-btn active">
                    <ToggleRight size={24} />
                  </button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Notificações por email</h4>
                    <p>Enviar lembretes de feedback pendente</p>
                  </div>
                  <button className="toggle-btn active">
                    <ToggleRight size={24} />
                  </button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Autoavaliação obrigatória</h4>
                    <p>Exigir autoavaliação em todos os ciclos</p>
                  </div>
                  <button className="toggle-btn active">
                    <ToggleRight size={24} />
                  </button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Mostrar pontuação aos funcionários</h4>
                    <p>Funcionários podem ver sua pontuação geral</p>
                  </div>
                  <button className="toggle-btn">
                    <ToggleLeft size={24} />
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Escalas de Avaliação</h3>
              <div className="scale-config">
                <div className="scale-item">
                  <span className="scale-level">Nível 0</span>
                  <input type="text" defaultValue="Sem conhecimento" />
                </div>
                <div className="scale-item">
                  <span className="scale-level">Nível 1</span>
                  <input type="text" defaultValue="Iniciante" />
                </div>
                <div className="scale-item">
                  <span className="scale-level">Nível 2</span>
                  <input type="text" defaultValue="Básico" />
                </div>
                <div className="scale-item">
                  <span className="scale-level">Nível 3</span>
                  <input type="text" defaultValue="Intermediário" />
                </div>
                <div className="scale-item">
                  <span className="scale-level">Nível 4</span>
                  <input type="text" defaultValue="Avançado" />
                </div>
                <div className="scale-item">
                  <span className="scale-level">Nível 5</span>
                  <input type="text" defaultValue="Expert/Referência" />
                </div>
              </div>
              <button className="btn btn-primary">
                <Save size={18} />
                Salvar Alterações
              </button>
            </div>
          </div>
        )}

        {/* Modal Categoria */}
        {showCategoryModal && (
          <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h2>
                <button className="close-btn" onClick={() => setShowCategoryModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nome da Categoria *</label>
                  <input type="text" defaultValue={editingCategory?.name || ''} placeholder="Ex: Competências Técnicas" />
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea rows={3} defaultValue={editingCategory?.description || ''} placeholder="Descreva o objetivo desta categoria..." />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked={editingCategory?.active ?? true} />
                    Categoria ativa
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline" onClick={() => setShowCategoryModal(false)}>Cancelar</button>
                <button className="btn btn-primary">
                  <Save size={18} />
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Pergunta */}
        {showQuestionModal && (
          <div className="modal-overlay" onClick={() => setShowQuestionModal(false)}>
            <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingQuestion?.id ? 'Editar Pergunta' : 'Nova Pergunta'}</h2>
                <button className="close-btn" onClick={() => setShowQuestionModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Categoria *</label>
                  <select defaultValue={editingQuestion?.categoryId || ''}>
                    <option value="">Selecione uma categoria</option>
                    {categories.filter(c => c.active).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Texto da Pergunta *</label>
                  <textarea rows={3} defaultValue={editingQuestion?.text || ''} placeholder="Digite a pergunta..." />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tipo de Resposta *</label>
                    <select defaultValue={editingQuestion?.type || 'multiple'}>
                      <option value="multiple">Múltipla Escolha</option>
                      <option value="scale">Escala (0-5)</option>
                      <option value="text">Texto Livre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked={editingQuestion?.required ?? true} />
                      Resposta obrigatória
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Opções de Resposta (para múltipla escolha)</label>
                  <div className="options-input">
                    {(editingQuestion?.options || ['', '', '', '', '']).map((opt, idx) => (
                      <input key={idx} type="text" defaultValue={opt} placeholder={`Opção ${idx + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline" onClick={() => setShowQuestionModal(false)}>Cancelar</button>
                <button className="btn btn-primary">
                  <Save size={18} />
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .configuracoes-page {
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

        .breadcrumb-separator { color: var(--gray-400); }
        .breadcrumb-current { color: var(--primary-dark); font-weight: 500; }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-info h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .subtitle {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: var(--spacing-sm);
          border-bottom: 1px solid var(--gray-200);
        }

        .tab {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-600);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.2s ease;
        }

        .tab:hover { color: var(--primary-dark); }
        .tab.active {
          color: var(--primary-dark);
          border-bottom-color: var(--primary-dark);
        }

        /* Tab Content */
        .tab-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-md);
        }

        .content-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gray-900);
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 10px 20px;
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .btn-primary {
          background-color: var(--primary-dark);
          color: var(--white);
        }

        .btn-primary:hover {
          background-color: var(--primary-medium);
        }

        .btn-secondary {
          background-color: var(--primary-light);
          color: var(--primary-dark);
        }

        .btn-outline {
          background-color: transparent;
          border: 1px solid var(--gray-300);
          color: var(--gray-700);
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 0.8125rem;
        }

        /* Search */
        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: var(--white);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          flex: 1;
          max-width: 400px;
        }

        .search-box input {
          border: none;
          outline: none;
          flex: 1;
          font-size: 0.875rem;
        }

        .search-box svg {
          color: var(--gray-400);
        }

        /* Categories List */
        .categories-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .category-card {
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
          overflow: hidden;
        }

        .category-card.inactive {
          opacity: 0.6;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: var(--spacing-lg);
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .category-header:hover {
          background-color: var(--gray-50);
        }

        .category-info {
          flex: 1;
        }

        .category-title-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xs);
        }

        .category-title-row h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin: 0;
        }

        .status-badge {
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge.active {
          background-color: #D4EDDA;
          color: #155724;
        }

        .status-badge.inactive {
          background-color: var(--gray-200);
          color: var(--gray-600);
        }

        .category-description {
          font-size: 0.875rem;
          color: var(--gray-600);
          margin-bottom: var(--spacing-xs);
        }

        .question-count {
          font-size: 0.75rem;
          color: var(--gray-500);
        }

        .category-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .icon-btn {
          background: none;
          border: none;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          color: var(--gray-500);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          background-color: var(--gray-100);
          color: var(--primary-dark);
        }

        .icon-btn.danger:hover {
          color: var(--error);
        }

        .text-success { color: var(--success); }

        .expand-btn {
          background: none;
          border: none;
          padding: var(--spacing-sm);
          color: var(--gray-500);
          cursor: pointer;
        }

        /* Category Questions */
        .category-questions {
          border-top: 1px solid var(--gray-200);
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
        }

        .questions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .question-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background-color: var(--white);
          border-radius: var(--radius-sm);
          border: 1px solid var(--gray-200);
        }

        .question-item.inactive {
          opacity: 0.6;
        }

        .question-number {
          width: 24px;
          height: 24px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .question-info {
          flex: 1;
        }

        .question-text {
          font-size: 0.875rem;
          color: var(--gray-800);
          margin-bottom: var(--spacing-xs);
        }

        .question-meta {
          display: flex;
          gap: var(--spacing-sm);
        }

        .type-badge {
          padding: 2px 6px;
          background-color: var(--gray-100);
          color: var(--gray-600);
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
        }

        .required-badge {
          padding: 2px 6px;
          background-color: #FFF3CD;
          color: #856404;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
        }

        .question-actions {
          display: flex;
          gap: var(--spacing-xs);
        }

        .empty-message {
          text-align: center;
          color: var(--gray-500);
          font-size: 0.875rem;
          padding: var(--spacing-lg);
        }

        /* All Questions List */
        .all-questions-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .question-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          background-color: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--gray-200);
        }

        .question-card.inactive {
          opacity: 0.6;
        }

        .question-content {
          flex: 1;
        }

        .question-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-sm);
        }

        .category-tag {
          padding: 2px 8px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-radius: 20px;
          font-size: 0.75rem;
        }

        .options-count {
          font-size: 0.7rem;
          color: var(--gray-500);
        }

        /* Stats */
        .stats-summary {
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-lg);
          background-color: var(--gray-50);
          border-radius: var(--radius-md);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary-dark);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--gray-600);
        }

        /* Settings Section */
        .settings-section {
          background-color: var(--white);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          border: 1px solid var(--gray-200);
        }

        .settings-section h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--gray-900);
          margin-bottom: var(--spacing-lg);
        }

        .settings-grid {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md);
          background-color: var(--gray-50);
          border-radius: var(--radius-sm);
        }

        .setting-info h4 {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-900);
          margin-bottom: var(--spacing-xs);
        }

        .setting-info p {
          font-size: 0.8125rem;
          color: var(--gray-600);
          margin: 0;
        }

        .toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray-400);
          padding: 0;
        }

        .toggle-btn.active {
          color: var(--success);
        }

        .scale-config {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .scale-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .scale-level {
          width: 80px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
        }

        .scale-item input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--spacing-lg);
        }

        .modal {
          background-color: var(--white);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-lg {
          max-width: 650px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-lg);
          border-bottom: 1px solid var(--gray-200);
        }

        .modal-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--gray-500);
          cursor: pointer;
        }

        .modal-body {
          padding: var(--spacing-lg);
        }

        .form-group {
          margin-bottom: var(--spacing-md);
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-700);
          margin-bottom: var(--spacing-xs);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
          align-items: end;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
        }

        .checkbox-label input {
          width: auto;
        }

        .options-input {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-sm);
          padding: var(--spacing-lg);
          border-top: 1px solid var(--gray-200);
        }

        @media (max-width: 768px) {
          .content-header {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            max-width: 100%;
          }

          .category-header {
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .category-actions {
            width: 100%;
            justify-content: flex-end;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .stats-summary {
            flex-direction: column;
          }
        }
      `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
