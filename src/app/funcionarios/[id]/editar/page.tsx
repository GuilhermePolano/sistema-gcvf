'use client'

import { useParams, useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import MainLayout from '@/components/Layout/MainLayout'
import { ChevronLeft, Save } from 'lucide-react'
import { useState } from 'react'

export default function EditarFuncionarioPage() {
  const params = useParams()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    nome: 'João Pedro da Silva',
    email: 'joao.silva@fiergs.org.br',
    telefone: '(51) 99999-1111',
    cargo_id: '3',
    setor_id: '2',
    entidade_id: '1',
    status: 'ATIVO'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // Aqui viria a chamada à API
    setTimeout(() => {
      setSaving(false)
      alert('Funcionário atualizado com sucesso!')
      router.push(`/funcionarios/${params.id}`)
    }, 1000)
  }

  return (
    <ProtectedRoute requiredRoles={['coordenador', 'gerente', 'administrador']}>
      <MainLayout>
        <div className="editar-funcionario-page">
          <div className="page-header">
            <button className="btn-back" onClick={() => router.back()}>
              <ChevronLeft size={20} />
              Voltar
            </button>
          </div>

          <div className="card">
            <h1>Editar Funcionário</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nome Completo *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cargo *</label>
                  <select
                    className="form-select"
                    value={formData.cargo_id}
                    onChange={(e) => setFormData({...formData, cargo_id: e.target.value})}
                    required
                  >
                    <option value="1">Estagiário</option>
                    <option value="2">Desenvolvedor Júnior</option>
                    <option value="3">Desenvolvedor Pleno</option>
                    <option value="4">Desenvolvedor Sênior</option>
                    <option value="5">Coordenador de TI</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Setor *</label>
                  <select
                    className="form-select"
                    value={formData.setor_id}
                    onChange={(e) => setFormData({...formData, setor_id: e.target.value})}
                    required
                  >
                    <option value="1">Tecnologia da Informação</option>
                    <option value="2">Desenvolvimento</option>
                    <option value="3">Infraestrutura</option>
                    <option value="4">Recursos Humanos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Entidade *</label>
                  <select
                    className="form-select"
                    value={formData.entidade_id}
                    onChange={(e) => setFormData({...formData, entidade_id: e.target.value})}
                    required
                  >
                    <option value="1">FIERGS</option>
                    <option value="2">SESI</option>
                    <option value="3">SENAI</option>
                    <option value="4">IEL</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status *</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    required
                  >
                    <option value="ATIVO">Ativo</option>
                    <option value="AFASTADO">Afastado</option>
                    <option value="FERIAS">Férias</option>
                    <option value="DESLIGADO">Desligado</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  <Save size={18} />
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <style jsx>{`
          .editar-funcionario-page {
            max-width: 900px;
            margin: 0 auto;
          }

          .page-header {
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

          .card h1 {
            font-size: 1.875rem;
            margin-bottom: var(--spacing-xl);
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
          }

          .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: var(--spacing-md);
            padding-top: var(--spacing-lg);
            border-top: 1px solid var(--gray-200);
          }

          @media (max-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr;
            }

            .form-actions {
              flex-direction: column-reverse;
            }

            .form-actions button {
              width: 100%;
            }
          }
        `}</style>
      </MainLayout>
    </ProtectedRoute>
  )
}
