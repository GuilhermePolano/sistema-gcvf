-- ============================================
-- Sistema GCVF - FIERGS
-- Script de Criação do Banco de Dados
-- MariaDB/MySQL 8.0+
-- ============================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS gcvf_fiergs
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gcvf_fiergs;

-- ============================================
-- TABELA: entidades
-- Organizações do Sistema FIERGS
-- ============================================
CREATE TABLE entidades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  sigla VARCHAR(50),
  tipo ENUM('FIERGS', 'SESI', 'SENAI', 'IEL', 'OUTRO') NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_codigo (codigo),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: setores
-- Departamentos/Setores dentro das entidades
-- ============================================
CREATE TABLE setores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  entidade_id INT NOT NULL,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  setor_pai_id INT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entidade_id) REFERENCES entidades(id) ON DELETE CASCADE,
  FOREIGN KEY (setor_pai_id) REFERENCES setores(id) ON DELETE SET NULL,
  INDEX idx_entidade (entidade_id),
  INDEX idx_codigo (codigo),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: cargos
-- Cargos/Funções dos funcionários
-- ============================================
CREATE TABLE cargos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  nivel ENUM('ESTAGIARIO', 'JUNIOR', 'PLENO', 'SENIOR', 'ESPECIALISTA', 'COORDENADOR', 'GERENTE', 'DIRETOR') NOT NULL,
  descricao TEXT,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_codigo (codigo),
  INDEX idx_nivel (nivel),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: usuarios
-- Usuários do sistema (login e autenticação)
-- ============================================
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  perfil ENUM('funcionario', 'coordenador', 'gerente', 'administrador') NOT NULL DEFAULT 'funcionario',
  ativo BOOLEAN DEFAULT TRUE,
  ultimo_acesso TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_perfil (perfil),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: funcionarios
-- Dados dos funcionários
-- ============================================
CREATE TABLE funcionarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNIQUE NOT NULL,
  matricula VARCHAR(20) UNIQUE NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  nome_completo VARCHAR(200) NOT NULL,
  data_nascimento DATE,
  telefone VARCHAR(20),
  celular VARCHAR(20),
  
  -- Dados profissionais
  entidade_id INT NOT NULL,
  setor_id INT NOT NULL,
  cargo_id INT NOT NULL,
  data_admissao DATE NOT NULL,
  data_demissao DATE NULL,
  status ENUM('ATIVO', 'FERIAS', 'AFASTADO', 'DESLIGADO') DEFAULT 'ATIVO',
  
  -- Gestor direto
  gestor_id INT NULL,
  
  -- Endereço
  cep VARCHAR(10),
  logradouro VARCHAR(200),
  numero VARCHAR(20),
  complemento VARCHAR(100),
  bairro VARCHAR(100),
  cidade VARCHAR(100),
  estado CHAR(2),
  
  -- Metadados
  foto_url VARCHAR(500),
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (entidade_id) REFERENCES entidades(id),
  FOREIGN KEY (setor_id) REFERENCES setores(id),
  FOREIGN KEY (cargo_id) REFERENCES cargos(id),
  FOREIGN KEY (gestor_id) REFERENCES funcionarios(id) ON DELETE SET NULL,
  
  INDEX idx_matricula (matricula),
  INDEX idx_cpf (cpf),
  INDEX idx_nome (nome_completo),
  INDEX idx_entidade (entidade_id),
  INDEX idx_setor (setor_id),
  INDEX idx_cargo (cargo_id),
  INDEX idx_status (status),
  INDEX idx_gestor (gestor_id)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: areas_competencia
-- Áreas de conhecimento (ex: Frontend, Backend, Gestão)
-- ============================================
CREATE TABLE areas_competencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) UNIQUE NOT NULL,
  descricao TEXT,
  cor VARCHAR(7) DEFAULT '#0066CC',
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nome (nome),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: competencias
-- Competências técnicas e comportamentais
-- ============================================
CREATE TABLE competencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  area_id INT NOT NULL,
  nome VARCHAR(200) NOT NULL,
  descricao TEXT,
  tipo ENUM('TECNICA', 'COMPORTAMENTAL') NOT NULL,
  nivel_maximo INT DEFAULT 5,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (area_id) REFERENCES areas_competencia(id) ON DELETE CASCADE,
  INDEX idx_area (area_id),
  INDEX idx_tipo (tipo),
  INDEX idx_nome (nome),
  INDEX idx_ativo (ativo)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: funcionario_competencias
-- Nível de competência de cada funcionário
-- ============================================
CREATE TABLE funcionario_competencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  funcionario_id INT NOT NULL,
  competencia_id INT NOT NULL,
  nivel_atual INT NOT NULL DEFAULT 0,
  nivel_desejado INT NULL,
  data_avaliacao DATE NOT NULL,
  avaliado_por INT NULL,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id) ON DELETE CASCADE,
  FOREIGN KEY (competencia_id) REFERENCES competencias(id) ON DELETE CASCADE,
  FOREIGN KEY (avaliado_por) REFERENCES funcionarios(id) ON DELETE SET NULL,
  UNIQUE KEY uk_funcionario_competencia (funcionario_id, competencia_id),
  INDEX idx_funcionario (funcionario_id),
  INDEX idx_competencia (competencia_id),
  INDEX idx_nivel (nivel_atual),
  CHECK (nivel_atual >= 0 AND nivel_atual <= 5),
  CHECK (nivel_desejado IS NULL OR (nivel_desejado >= 0 AND nivel_desejado <= 5))
) ENGINE=InnoDB;

-- ============================================
-- TABELA: ciclos_feedback
-- Ciclos de avaliação (trimestral, semestral, anual)
-- ============================================
CREATE TABLE ciclos_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  descricao TEXT,
  tipo ENUM('TRIMESTRAL', 'SEMESTRAL', 'ANUAL', 'PERSONALIZADO') NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  data_limite_resposta DATE NOT NULL,
  status ENUM('PLANEJADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO') DEFAULT 'PLANEJADO',
  entidade_id INT NULL,
  criado_por INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (entidade_id) REFERENCES entidades(id) ON DELETE SET NULL,
  FOREIGN KEY (criado_por) REFERENCES funcionarios(id),
  INDEX idx_status (status),
  INDEX idx_datas (data_inicio, data_fim),
  INDEX idx_entidade (entidade_id)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: perguntas_feedback
-- Perguntas dos formulários de feedback
-- ============================================
CREATE TABLE perguntas_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ciclo_id INT NOT NULL,
  ordem INT NOT NULL,
  pergunta TEXT NOT NULL,
  tipo_resposta ENUM('TEXTO', 'NOTA_1_5', 'NOTA_1_10', 'MULTIPLA_ESCOLHA', 'SIM_NAO') NOT NULL,
  opcoes_resposta JSON NULL,
  obrigatoria BOOLEAN DEFAULT TRUE,
  categoria ENUM('DESEMPENHO', 'COMPETENCIAS', 'COMPORTAMENTO', 'OBJETIVOS', 'GERAL') DEFAULT 'GERAL',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ciclo_id) REFERENCES ciclos_feedback(id) ON DELETE CASCADE,
  INDEX idx_ciclo (ciclo_id),
  INDEX idx_ordem (ordem)
) ENGINE=InnoDB;


-- ============================================
-- TABELA: avaliacoes_feedback
-- Avaliações de feedback (180° ou 360°)
-- ============================================
CREATE TABLE avaliacoes_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ciclo_id INT NOT NULL,
  avaliado_id INT NOT NULL,
  avaliador_id INT NOT NULL,
  tipo ENUM('AUTOAVALIACAO', 'GESTOR', 'PAR', 'SUBORDINADO') NOT NULL,
  status ENUM('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA') DEFAULT 'PENDENTE',
  data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_conclusao TIMESTAMP NULL,
  observacoes_gerais TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ciclo_id) REFERENCES ciclos_feedback(id) ON DELETE CASCADE,
  FOREIGN KEY (avaliado_id) REFERENCES funcionarios(id) ON DELETE CASCADE,
  FOREIGN KEY (avaliador_id) REFERENCES funcionarios(id) ON DELETE CASCADE,
  INDEX idx_ciclo (ciclo_id),
  INDEX idx_avaliado (avaliado_id),
  INDEX idx_avaliador (avaliador_id),
  INDEX idx_status (status),
  INDEX idx_tipo (tipo)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: respostas_feedback
-- Respostas das perguntas de feedback
-- ============================================
CREATE TABLE respostas_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  avaliacao_id INT NOT NULL,
  pergunta_id INT NOT NULL,
  resposta_texto TEXT,
  resposta_numerica DECIMAL(5,2),
  resposta_opcao VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (avaliacao_id) REFERENCES avaliacoes_feedback(id) ON DELETE CASCADE,
  FOREIGN KEY (pergunta_id) REFERENCES perguntas_feedback(id) ON DELETE CASCADE,
  INDEX idx_avaliacao (avaliacao_id),
  INDEX idx_pergunta (pergunta_id)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: pdis (Plano de Desenvolvimento Individual)
-- ============================================
CREATE TABLE pdis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  funcionario_id INT NOT NULL,
  ano INT NOT NULL,
  status ENUM('RASCUNHO', 'EM_APROVACAO', 'APROVADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO') DEFAULT 'RASCUNHO',
  data_criacao DATE NOT NULL,
  data_aprovacao DATE NULL,
  aprovado_por INT NULL,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id) ON DELETE CASCADE,
  FOREIGN KEY (aprovado_por) REFERENCES funcionarios(id) ON DELETE SET NULL,
  UNIQUE KEY uk_funcionario_ano (funcionario_id, ano),
  INDEX idx_funcionario (funcionario_id),
  INDEX idx_ano (ano),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: objetivos_pdi
-- Objetivos SMART do PDI
-- ============================================
CREATE TABLE objetivos_pdi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pdi_id INT NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT NOT NULL,
  
  -- Critérios SMART
  especifico TEXT,
  mensuravel TEXT,
  atingivel TEXT,
  relevante TEXT,
  temporal TEXT,
  
  -- Datas
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  
  -- Progresso
  progresso INT DEFAULT 0,
  status ENUM('NAO_INICIADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'ATRASADO') DEFAULT 'NAO_INICIADO',
  
  -- Competência relacionada
  competencia_id INT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pdi_id) REFERENCES pdis(id) ON DELETE CASCADE,
  FOREIGN KEY (competencia_id) REFERENCES competencias(id) ON DELETE SET NULL,
  INDEX idx_pdi (pdi_id),
  INDEX idx_status (status),
  INDEX idx_datas (data_inicio, data_fim),
  CHECK (progresso >= 0 AND progresso <= 100)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: atualizacoes_objetivo
-- Histórico de atualizações dos objetivos
-- ============================================
CREATE TABLE atualizacoes_objetivo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  objetivo_id INT NOT NULL,
  funcionario_id INT NOT NULL,
  data_atualizacao DATE NOT NULL,
  progresso_anterior INT NOT NULL,
  progresso_novo INT NOT NULL,
  descricao TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (objetivo_id) REFERENCES objetivos_pdi(id) ON DELETE CASCADE,
  FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id) ON DELETE CASCADE,
  INDEX idx_objetivo (objetivo_id),
  INDEX idx_data (data_atualizacao)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: logs_auditoria
-- Registro de todas as ações importantes do sistema
-- ============================================
CREATE TABLE logs_auditoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  acao VARCHAR(100) NOT NULL,
  tabela VARCHAR(100) NOT NULL,
  registro_id INT NOT NULL,
  dados_anteriores JSON NULL,
  dados_novos JSON NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario (usuario_id),
  INDEX idx_acao (acao),
  INDEX idx_tabela (tabela),
  INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- ============================================
-- TABELA: notificacoes
-- Sistema de notificações para usuários
-- ============================================
CREATE TABLE notificacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo ENUM('FEEDBACK_PENDENTE', 'PDI_APROVADO', 'OBJETIVO_ATRASADO', 'NOVA_AVALIACAO', 'SISTEMA') NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  mensagem TEXT NOT NULL,
  link VARCHAR(500),
  lida BOOLEAN DEFAULT FALSE,
  data_leitura TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_usuario (usuario_id),
  INDEX idx_lida (lida),
  INDEX idx_tipo (tipo),
  INDEX idx_created (created_at)
) ENGINE=InnoDB;
