// ==========================================
// DADOS MOCKADOS - SIMULANDO BANCO DE DADOS
// ==========================================

export interface Usuario {
  id: number
  email: string
  senha: string
  nome: string
  cargo: string
  perfil: 'funcionario' | 'coordenador' | 'gerente' | 'administrador'
  entidade: string
  setor: string
  gestorId?: number
  dataCriacao: string
  ativo: boolean
}

export interface Funcionario {
  id: number
  usuarioId: number
  nome: string
  email: string
  cargo: string
  setor: string
  entidade: string
  nivel: 'Junior' | 'Pleno' | 'Senior' | 'Especialista'
  dataAdmissao: string
  gestorId: number
  telefone: string
  competencias: Record<string, number>
  status: 'ativo' | 'ferias' | 'afastado' | 'desligado'
}

export interface CicloFeedback {
  id: number
  nome: string
  tipo: '180' | '360'
  status: 'rascunho' | 'ativo' | 'pausado' | 'concluido'
  dataInicio: string
  dataFim: string
  criadoPor: number
  participantes: number[]
  categorias: string[]
  perguntas: Pergunta[]
}

export interface Pergunta {
  id: number
  texto: string
  categoria: string
  tipo: 'escala' | 'texto' | 'multipla'
  obrigatoria: boolean
}

export interface RespostaFeedback {
  id: number
  cicloId: number
  avaliadorId: number
  avaliadoId: number
  tipo: 'auto' | 'gestor' | 'par' | 'subordinado'
  respostas: { perguntaId: number; valor: string | number }[]
  dataResposta: string
  status: 'pendente' | 'em_andamento' | 'concluido'
}

export interface Reuniao1a1 {
  id: number
  gestorId: number
  funcionarioId: number
  data: string
  hora: string
  status: 'agendada' | 'realizada' | 'cancelada'
  pauta: string
  notas?: string
  acoesDefinidas?: string[]
  feedbackId?: number
}

export interface PDI {
  id: number
  funcionarioId: number
  titulo: string
  descricao: string
  dataInicio: string
  dataFim: string
  status: 'nao_iniciado' | 'em_andamento' | 'atrasado' | 'em_revisao' | 'concluido'
  progresso: number
  acoes: AcaoPDI[]
}

export interface AcaoPDI {
  id: number
  descricao: string
  prazo: string
  status: 'pendente' | 'em_andamento' | 'concluida'
}

// ==========================================
// USUARIOS DE TESTE (CREDENCIAIS DE LOGIN)
// ==========================================
export const USUARIOS_INICIAIS: Usuario[] = [
  {
    id: 1,
    email: 'funcionario@fiergs.org.br',
    senha: 'func123',
    nome: 'João Silva',
    cargo: 'Desenvolvedor Pleno',
    perfil: 'funcionario',
    entidade: 'FIERGS',
    setor: 'GINFO',
    gestorId: 2,
    dataCriacao: '2021-03-15',
    ativo: true
  },
  {
    id: 2,
    email: 'coordenador@fiergs.org.br',
    senha: 'coord123',
    nome: 'Maria Santos',
    cargo: 'Coordenadora de Desenvolvimento',
    perfil: 'coordenador',
    entidade: 'FIERGS',
    setor: 'GINFO',
    gestorId: 3,
    dataCriacao: '2019-06-01',
    ativo: true
  },
  {
    id: 3,
    email: 'admin@fiergs.org.br',
    senha: 'admin123',
    nome: 'Carlos Administrador',
    cargo: 'Gerente de TI',
    perfil: 'administrador',
    entidade: 'FIERGS',
    setor: 'GINFO',
    dataCriacao: '2015-01-10',
    ativo: true
  }
]

// ==========================================
// FUNCIONARIOS INICIAIS
// ==========================================
export const FUNCIONARIOS_INICIAIS: Funcionario[] = [
  {
    id: 1,
    usuarioId: 1,
    nome: 'João Silva',
    email: 'joao.silva@fiergs.org.br',
    cargo: 'Desenvolvedor Pleno',
    setor: 'GINFO',
    entidade: 'FIERGS',
    nivel: 'Pleno',
    dataAdmissao: '2021-03-15',
    gestorId: 2,
    telefone: '(51) 99999-1111',
    competencias: {
      'JavaScript': 4,
      'React': 4,
      'Node.js': 3,
      'TypeScript': 4,
      'Python': 2,
      'Docker': 3
    },
    status: 'ativo'
  },
  {
    id: 2,
    usuarioId: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@fiergs.org.br',
    cargo: 'Coordenadora de Desenvolvimento',
    setor: 'GINFO',
    entidade: 'FIERGS',
    nivel: 'Senior',
    dataAdmissao: '2019-06-01',
    gestorId: 3,
    telefone: '(51) 99999-2222',
    competencias: {
      'JavaScript': 5,
      'React': 5,
      'Node.js': 4,
      'TypeScript': 5,
      'Python': 3,
      'Docker': 4,
      'AWS': 4
    },
    status: 'ativo'
  },
  {
    id: 3,
    usuarioId: 3,
    nome: 'Carlos Administrador',
    email: 'carlos.admin@fiergs.org.br',
    cargo: 'Gerente de TI',
    setor: 'GINFO',
    entidade: 'FIERGS',
    nivel: 'Especialista',
    dataAdmissao: '2015-01-10',
    gestorId: 0,
    telefone: '(51) 99999-3333',
    competencias: {
      'Gestão': 5,
      'Liderança': 5,
      'Arquitetura': 4,
      'DevOps': 4
    },
    status: 'ativo'
  },
  {
    id: 4,
    usuarioId: 0,
    nome: 'Ana Costa',
    email: 'ana.costa@fiergs.org.br',
    cargo: 'Desenvolvedora Junior',
    setor: 'GINFO',
    entidade: 'FIERGS',
    nivel: 'Junior',
    dataAdmissao: '2024-01-15',
    gestorId: 2,
    telefone: '(51) 99999-4444',
    competencias: {
      'JavaScript': 2,
      'React': 2,
      'Node.js': 1,
      'TypeScript': 2
    },
    status: 'ativo'
  },
  {
    id: 5,
    usuarioId: 0,
    nome: 'Pedro Lima',
    email: 'pedro.lima@fiergs.org.br',
    cargo: 'Analista de Sistemas',
    setor: 'GINFO',
    entidade: 'FIERGS',
    nivel: 'Pleno',
    dataAdmissao: '2022-08-01',
    gestorId: 2,
    telefone: '(51) 99999-5555',
    competencias: {
      'JavaScript': 3,
      'React': 3,
      'Node.js': 4,
      'Python': 4,
      'Docker': 3
    },
    status: 'ativo'
  }
]

// ==========================================
// CICLOS DE FEEDBACK INICIAIS
// ==========================================
export const CICLOS_INICIAIS: CicloFeedback[] = [
  {
    id: 1,
    nome: 'Avaliação Q1 2026',
    tipo: '360',
    status: 'ativo',
    dataInicio: '2026-01-01',
    dataFim: '2026-02-28',
    criadoPor: 2,
    participantes: [1, 4, 5],
    categorias: ['Técnico', 'Comportamental', 'Liderança'],
    perguntas: [
      { id: 1, texto: 'Como você avalia a qualidade técnica do trabalho?', categoria: 'Técnico', tipo: 'escala', obrigatoria: true },
      { id: 2, texto: 'O colaborador demonstra proatividade?', categoria: 'Comportamental', tipo: 'escala', obrigatoria: true },
      { id: 3, texto: 'Como é a comunicação com a equipe?', categoria: 'Comportamental', tipo: 'escala', obrigatoria: true },
      { id: 4, texto: 'Pontos fortes observados:', categoria: 'Geral', tipo: 'texto', obrigatoria: false },
      { id: 5, texto: 'Pontos a desenvolver:', categoria: 'Geral', tipo: 'texto', obrigatoria: false }
    ]
  }
]

// ==========================================
// REUNIÕES 1:1 INICIAIS
// ==========================================
export const REUNIOES_INICIAIS: Reuniao1a1[] = [
  {
    id: 1,
    gestorId: 2,
    funcionarioId: 1,
    data: '2026-02-10',
    hora: '14:00',
    status: 'agendada',
    pauta: 'Acompanhamento mensal - Feedback Q1 e PDI'
  }
]

// ==========================================
// PDIs INICIAIS
// ==========================================
export const PDIS_INICIAIS: PDI[] = [
  {
    id: 1,
    funcionarioId: 1,
    titulo: 'Certificação AWS Solutions Architect',
    descricao: 'Obter certificação AWS para expandir conhecimentos em cloud',
    dataInicio: '2026-01-01',
    dataFim: '2026-06-30',
    status: 'em_andamento',
    progresso: 30,
    acoes: [
      { id: 1, descricao: 'Completar curso AWS na Udemy', prazo: '2026-03-01', status: 'em_andamento' },
      { id: 2, descricao: 'Fazer laboratórios práticos', prazo: '2026-04-15', status: 'pendente' },
      { id: 3, descricao: 'Realizar simulados', prazo: '2026-05-30', status: 'pendente' },
      { id: 4, descricao: 'Agendar e realizar prova', prazo: '2026-06-30', status: 'pendente' }
    ]
  }
]

// ==========================================
// FUNÇÕES HELPER PARA INICIALIZAR DADOS
// ==========================================
export function initializeData() {
  if (typeof window === 'undefined') return

  // Inicializar dados apenas se não existirem
  if (!localStorage.getItem('gcvf_usuarios')) {
    localStorage.setItem('gcvf_usuarios', JSON.stringify(USUARIOS_INICIAIS))
  }
  if (!localStorage.getItem('gcvf_funcionarios')) {
    localStorage.setItem('gcvf_funcionarios', JSON.stringify(FUNCIONARIOS_INICIAIS))
  }
  if (!localStorage.getItem('gcvf_ciclos')) {
    localStorage.setItem('gcvf_ciclos', JSON.stringify(CICLOS_INICIAIS))
  }
  if (!localStorage.getItem('gcvf_reunioes')) {
    localStorage.setItem('gcvf_reunioes', JSON.stringify(REUNIOES_INICIAIS))
  }
  if (!localStorage.getItem('gcvf_pdis')) {
    localStorage.setItem('gcvf_pdis', JSON.stringify(PDIS_INICIAIS))
  }
  if (!localStorage.getItem('gcvf_respostas')) {
    localStorage.setItem('gcvf_respostas', JSON.stringify([]))
  }
}

export function getData<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(`gcvf_${key}`)
  return data ? JSON.parse(data) : []
}

export function setData<T>(key: string, data: T[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(`gcvf_${key}`, JSON.stringify(data))
}

export function getNextId(key: string): number {
  const data = getData<{ id: number }>(key)
  if (data.length === 0) return 1
  return Math.max(...data.map(item => item.id)) + 1
}
