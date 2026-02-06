-- ============================================
-- Sistema GCVF - FIERGS
-- Script de Dados Iniciais (SEED)
-- Inclui 3 usuários de teste com perfis diferentes
-- ============================================

USE gcvf_fiergs;

-- ============================================
-- ENTIDADES
-- ============================================
INSERT INTO entidades (codigo, nome, sigla, tipo) VALUES
('FIERGS-001', 'Federação das Indústrias do Estado do Rio Grande do Sul', 'FIERGS', 'FIERGS'),
('SESI-001', 'Serviço Social da Indústria', 'SESI-RS', 'SESI'),
('SENAI-001', 'Serviço Nacional de Aprendizagem Industrial', 'SENAI-RS', 'SENAI'),
('IEL-001', 'Instituto Euvaldo Lodi', 'IEL-RS', 'IEL');

-- ============================================
-- SETORES
-- ============================================
INSERT INTO setores (entidade_id, codigo, nome, setor_pai_id) VALUES
-- FIERGS
(1, 'FIERGS-TI', 'Tecnologia da Informação', NULL),
(1, 'FIERGS-TI-DEV', 'Desenvolvimento', 1),
(1, 'FIERGS-TI-INFRA', 'Infraestrutura', 1),
(1, 'FIERGS-RH', 'Recursos Humanos', NULL),
(1, 'FIERGS-FIN', 'Financeiro', NULL),
(1, 'FIERGS-ADM', 'Administrativo', NULL),

-- SESI
(2, 'SESI-ADM', 'Administrativo', NULL),
(2, 'SESI-EDU', 'Educação', NULL),

-- SENAI
(3, 'SENAI-ADM', 'Administrativo', NULL),
(3, 'SENAI-TEC', 'Técnico', NULL);

-- ============================================
-- CARGOS
-- ============================================
INSERT INTO cargos (codigo, nome, nivel, descricao) VALUES
('EST-001', 'Estagiário', 'ESTAGIARIO', 'Estudante em formação'),
('DEV-JR', 'Desenvolvedor Júnior', 'JUNIOR', 'Desenvolvedor com até 2 anos de experiência'),
('DEV-PL', 'Desenvolvedor Pleno', 'PLENO', 'Desenvolvedor com 2-5 anos de experiência'),
('DEV-SR', 'Desenvolvedor Sênior', 'SENIOR', 'Desenvolvedor com mais de 5 anos de experiência'),
('COORD-TI', 'Coordenador de TI', 'COORDENADOR', 'Coordenador da área de tecnologia'),
('GER-TI', 'Gerente de TI', 'GERENTE', 'Gerente da área de tecnologia'),
('ANAL-RH', 'Analista de RH', 'PLENO', 'Analista de recursos humanos'),
('COORD-RH', 'Coordenador de RH', 'COORDENADOR', 'Coordenador de recursos humanos'),
('GER-RH', 'Gerente de RH', 'GERENTE', 'Gerente de recursos humanos'),
('DIR-TI', 'Diretor de TI', 'DIRETOR', 'Diretor de tecnologia');

-- ============================================
-- USUÁRIOS DE TESTE
-- Senha para todos: Teste@2024
-- Hash gerado com bcrypt (10 rounds)
-- ============================================
INSERT INTO usuarios (email, senha_hash, perfil, ativo) VALUES
-- Usuário 1: Funcionário (Desenvolvedor Pleno)
('joao.silva@fiergs.org.br', '$2b$10$rZ5YhkqJ9vXGKxvF5YhkqOZxvF5YhkqJ9vXGKxvF5YhkqJ9vXGKxv', 'funcionario', TRUE),

-- Usuário 2: Coordenador (Coordenador de TI)
('maria.santos@fiergs.org.br', '$2b$10$rZ5YhkqJ9vXGKxvF5YhkqOZxvF5YhkqJ9vXGKxvF5YhkqJ9vXGKxv', 'coordenador', TRUE),

-- Usuário 3: Administrador (Gerente de RH)
('carlos.oliveira@fiergs.org.br', '$2b$10$rZ5YhkqJ9vXGKxvF5YhkqOZxvF5YhkqJ9vXGKxvF5YhkqJ9vXGKxv', 'administrador', TRUE);

-- ============================================
-- FUNCIONÁRIOS DE TESTE
-- ============================================
INSERT INTO funcionarios (
  usuario_id, matricula, cpf, nome_completo, data_nascimento, 
  celular, entidade_id, setor_id, cargo_id, data_admissao, 
  status, gestor_id, cidade, estado
) VALUES
-- Funcionário 1: João Silva (Desenvolvedor Pleno)
(
  1, 'FIERGS-2021-001', '123.456.789-01', 'João Pedro da Silva', '1990-05-15',
  '(51) 99999-1111', 1, 2, 3, '2021-03-10',
  'ATIVO', NULL, 'Porto Alegre', 'RS'
),

-- Funcionário 2: Maria Santos (Coordenadora de TI)
(
  2, 'FIERGS-2018-045', '234.567.890-12', 'Maria Fernanda Santos', '1985-08-22',
  '(51) 99999-2222', 1, 1, 5, '2018-06-15',
  'ATIVO', NULL, 'Porto Alegre', 'RS'
),

-- Funcionário 3: Carlos Oliveira (Gerente de RH - Administrador)
(
  3, 'FIERGS-2015-012', '345.678.901-23', 'Carlos Eduardo Oliveira', '1980-12-03',
  '(51) 99999-3333', 1, 4, 9, '2015-01-20',
  'ATIVO', NULL, 'Porto Alegre', 'RS'
);

-- Atualizar gestor do João (Maria é sua coordenadora)
UPDATE funcionarios SET gestor_id = 2 WHERE id = 1;

-- ============================================
-- ÁREAS DE COMPETÊNCIA
-- ============================================
INSERT INTO areas_competencia (nome, descricao, cor) VALUES
('Frontend', 'Desenvolvimento de interfaces e experiência do usuário', '#FF6B6B'),
('Backend', 'Desenvolvimento de APIs e lógica de negócio', '#4ECDC4'),
('DevOps', 'Infraestrutura, CI/CD e automação', '#95E1D3'),
('Banco de Dados', 'Modelagem e otimização de dados', '#F38181'),
('Gestão de Projetos', 'Planejamento e coordenação de projetos', '#AA96DA'),
('Soft Skills', 'Habilidades comportamentais e interpessoais', '#FCBAD3');

-- ============================================
-- COMPETÊNCIAS TÉCNICAS
-- ============================================
INSERT INTO competencias (area_id, nome, descricao, tipo, nivel_maximo) VALUES
-- Frontend
(1, 'React', 'Desenvolvimento com React.js', 'TECNICA', 5),
(1, 'Next.js', 'Framework React para produção', 'TECNICA', 5),
(1, 'TypeScript', 'JavaScript tipado', 'TECNICA', 5),
(1, 'CSS/SASS', 'Estilização e design responsivo', 'TECNICA', 5),
(1, 'UI/UX Design', 'Design de interfaces e experiência', 'TECNICA', 5),

-- Backend
(2, 'Node.js', 'JavaScript no servidor', 'TECNICA', 5),
(2, 'Python', 'Linguagem Python', 'TECNICA', 5),
(2, 'Java', 'Linguagem Java', 'TECNICA', 5),
(2, 'API REST', 'Desenvolvimento de APIs RESTful', 'TECNICA', 5),
(2, 'GraphQL', 'APIs com GraphQL', 'TECNICA', 5),

-- DevOps
(3, 'Docker', 'Containerização de aplicações', 'TECNICA', 5),
(3, 'Kubernetes', 'Orquestração de containers', 'TECNICA', 5),
(3, 'CI/CD', 'Integração e entrega contínua', 'TECNICA', 5),
(3, 'AWS', 'Amazon Web Services', 'TECNICA', 5),
(3, 'Linux', 'Administração de sistemas Linux', 'TECNICA', 5),

-- Banco de Dados
(4, 'MySQL/MariaDB', 'Banco de dados relacional', 'TECNICA', 5),
(4, 'PostgreSQL', 'Banco de dados relacional avançado', 'TECNICA', 5),
(4, 'MongoDB', 'Banco de dados NoSQL', 'TECNICA', 5),
(4, 'Redis', 'Cache e banco em memória', 'TECNICA', 5),

-- Gestão
(5, 'Scrum', 'Metodologia ágil Scrum', 'TECNICA', 5),
(5, 'Kanban', 'Gestão visual de tarefas', 'TECNICA', 5),
(5, 'Liderança de Equipe', 'Coordenação de times', 'COMPORTAMENTAL', 5),

-- Soft Skills
(6, 'Comunicação', 'Comunicação efetiva', 'COMPORTAMENTAL', 5),
(6, 'Trabalho em Equipe', 'Colaboração e cooperação', 'COMPORTAMENTAL', 5),
(6, 'Resolução de Problemas', 'Análise e solução de problemas', 'COMPORTAMENTAL', 5),
(6, 'Proatividade', 'Iniciativa e autonomia', 'COMPORTAMENTAL', 5),
(6, 'Adaptabilidade', 'Flexibilidade e resiliência', 'COMPORTAMENTAL', 5);

-- ============================================
-- COMPETÊNCIAS DOS FUNCIONÁRIOS
-- ============================================

-- João Silva (Desenvolvedor Pleno) - Perfil Frontend/Fullstack
INSERT INTO funcionario_competencias (funcionario_id, competencia_id, nivel_atual, nivel_desejado, data_avaliacao, avaliado_por) VALUES
-- Frontend
(1, 1, 4, 5, '2024-01-15', 2),  -- React: 4/5
(1, 2, 3, 4, '2024-01-15', 2),  -- Next.js: 3/5
(1, 3, 4, 5, '2024-01-15', 2),  -- TypeScript: 4/5
(1, 4, 3, 4, '2024-01-15', 2),  -- CSS/SASS: 3/5
-- Backend
(1, 6, 3, 4, '2024-01-15', 2),  -- Node.js: 3/5
(1, 9, 3, 4, '2024-01-15', 2),  -- API REST: 3/5
-- DevOps
(1, 11, 2, 3, '2024-01-15', 2), -- Docker: 2/5
(1, 14, 2, 3, '2024-01-15', 2), -- AWS: 2/5
-- Banco de Dados
(1, 16, 3, 4, '2024-01-15', 2), -- MySQL: 3/5
-- Soft Skills
(1, 23, 4, 5, '2024-01-15', 2), -- Comunicação: 4/5
(1, 24, 5, 5, '2024-01-15', 2), -- Trabalho em Equipe: 5/5
(1, 25, 4, 5, '2024-01-15', 2); -- Resolução de Problemas: 4/5

-- Maria Santos (Coordenadora) - Perfil Gestão + Técnico
INSERT INTO funcionario_competencias (funcionario_id, competencia_id, nivel_atual, nivel_desejado, data_avaliacao) VALUES
-- Técnicas
(2, 1, 5, 5, '2024-01-15'),  -- React: 5/5
(2, 3, 5, 5, '2024-01-15'),  -- TypeScript: 5/5
(2, 6, 4, 5, '2024-01-15'),  -- Node.js: 4/5
(2, 9, 5, 5, '2024-01-15'),  -- API REST: 5/5
(2, 11, 4, 5, '2024-01-15'), -- Docker: 4/5
-- Gestão
(2, 20, 5, 5, '2024-01-15'), -- Scrum: 5/5
(2, 21, 4, 5, '2024-01-15'), -- Kanban: 4/5
(2, 22, 5, 5, '2024-01-15'), -- Liderança: 5/5
-- Soft Skills
(2, 23, 5, 5, '2024-01-15'), -- Comunicação: 5/5
(2, 24, 5, 5, '2024-01-15'), -- Trabalho em Equipe: 5/5
(2, 26, 5, 5, '2024-01-15'), -- Proatividade: 5/5
(2, 27, 5, 5, '2024-01-15'); -- Adaptabilidade: 5/5

-- Carlos Oliveira (Gerente RH) - Perfil Gestão
INSERT INTO funcionario_competencias (funcionario_id, competencia_id, nivel_atual, nivel_desejado, data_avaliacao) VALUES
-- Gestão
(3, 20, 5, 5, '2024-01-15'), -- Scrum: 5/5
(3, 21, 5, 5, '2024-01-15'), -- Kanban: 5/5
(3, 22, 5, 5, '2024-01-15'), -- Liderança: 5/5
-- Soft Skills
(3, 23, 5, 5, '2024-01-15'), -- Comunicação: 5/5
(3, 24, 5, 5, '2024-01-15'), -- Trabalho em Equipe: 5/5
(3, 25, 5, 5, '2024-01-15'), -- Resolução de Problemas: 5/5
(3, 26, 5, 5, '2024-01-15'), -- Proatividade: 5/5
(3, 27, 5, 5, '2024-01-15'); -- Adaptabilidade: 5/5


-- ============================================
-- CICLO DE FEEDBACK (Exemplo Q1 2026)
-- ============================================
INSERT INTO ciclos_feedback (nome, descricao, tipo, data_inicio, data_fim, data_limite_resposta, status, entidade_id, criado_por) VALUES
('Avaliação Q1 2026', 'Ciclo de feedback do primeiro trimestre de 2026', 'TRIMESTRAL', '2026-01-01', '2026-03-31', '2026-04-15', 'EM_ANDAMENTO', 1, 3);

-- ============================================
-- PERGUNTAS DO FEEDBACK
-- ============================================
INSERT INTO perguntas_feedback (ciclo_id, ordem, pergunta, tipo_resposta, obrigatoria, categoria) VALUES
(1, 1, 'Como você avalia seu desempenho geral neste trimestre?', 'NOTA_1_5', TRUE, 'DESEMPENHO'),
(1, 2, 'Quais foram suas principais conquistas neste período?', 'TEXTO', TRUE, 'DESEMPENHO'),
(1, 3, 'Quais desafios você enfrentou?', 'TEXTO', TRUE, 'DESEMPENHO'),
(1, 4, 'Como você avalia sua comunicação com a equipe?', 'NOTA_1_5', TRUE, 'COMPORTAMENTO'),
(1, 5, 'Como você avalia seu trabalho em equipe?', 'NOTA_1_5', TRUE, 'COMPORTAMENTO'),
(1, 6, 'Você atingiu os objetivos do seu PDI?', 'SIM_NAO', TRUE, 'OBJETIVOS'),
(1, 7, 'Quais competências você gostaria de desenvolver?', 'TEXTO', FALSE, 'COMPETENCIAS'),
(1, 8, 'Comentários adicionais', 'TEXTO', FALSE, 'GERAL');

-- ============================================
-- AVALIAÇÕES DE FEEDBACK
-- ============================================

-- Autoavaliação do João
INSERT INTO avaliacoes_feedback (ciclo_id, avaliado_id, avaliador_id, tipo, status, data_conclusao) VALUES
(1, 1, 1, 'AUTOAVALIACAO', 'CONCLUIDA', '2026-02-10 14:30:00');

-- Avaliação do João pela Maria (Gestor)
INSERT INTO avaliacoes_feedback (ciclo_id, avaliado_id, avaliador_id, tipo, status) VALUES
(1, 1, 2, 'GESTOR', 'PENDENTE');

-- Autoavaliação da Maria
INSERT INTO avaliacoes_feedback (ciclo_id, avaliado_id, avaliador_id, tipo, status) VALUES
(1, 2, 2, 'AUTOAVALIACAO', 'PENDENTE');

-- ============================================
-- RESPOSTAS DO FEEDBACK (João - Autoavaliação)
-- ============================================
INSERT INTO respostas_feedback (avaliacao_id, pergunta_id, resposta_numerica, resposta_texto, resposta_opcao) VALUES
(1, 1, 4, NULL, NULL),
(1, 2, NULL, 'Implementei com sucesso o novo sistema de gestão de competências usando Next.js e TypeScript. Melhorei a performance do dashboard em 40%.', NULL),
(1, 3, NULL, 'Tive dificuldades iniciais com a arquitetura do banco de dados, mas consegui superar com ajuda da equipe.', NULL),
(1, 4, 4, NULL, NULL),
(1, 5, 5, NULL, NULL),
(1, 6, NULL, NULL, 'SIM'),
(1, 7, NULL, 'Gostaria de aprofundar conhecimentos em AWS e Docker para melhorar minhas habilidades em DevOps.', NULL),
(1, 8, NULL, 'Estou muito satisfeito com meu crescimento profissional e com o ambiente de trabalho.', NULL);

-- ============================================
-- PDIs (Plano de Desenvolvimento Individual)
-- ============================================

-- PDI do João Silva (2026)
INSERT INTO pdis (funcionario_id, ano, status, data_criacao, data_aprovacao, aprovado_por) VALUES
(1, 2026, 'APROVADO', '2026-01-05', '2026-01-10', 2);

-- PDI da Maria Santos (2026)
INSERT INTO pdis (funcionario_id, ano, status, data_criacao, data_aprovacao, aprovado_por) VALUES
(2, 2026, 'APROVADO', '2026-01-05', '2026-01-12', 3);

-- ============================================
-- OBJETIVOS PDI - João Silva
-- ============================================
INSERT INTO objetivos_pdi (
  pdi_id, titulo, descricao, 
  especifico, mensuravel, atingivel, relevante, temporal,
  data_inicio, data_fim, progresso, status, competencia_id
) VALUES
(
  1,
  'Certificação AWS Solutions Architect',
  'Obter certificação AWS Solutions Architect Associate',
  'Estudar e obter a certificação AWS Solutions Architect Associate',
  'Aprovação no exame de certificação com nota mínima de 720/1000',
  'Dedicar 10 horas semanais de estudo, com suporte da empresa para curso online',
  'Essencial para evolução na carreira e projetos de cloud da empresa',
  'Conclusão até 30/06/2026',
  '2026-01-15', '2026-06-30', 45, 'EM_ANDAMENTO', 14
),
(
  1,
  'Melhorar habilidades em Docker',
  'Dominar containerização e orquestração',
  'Aprender Docker e Kubernetes através de projetos práticos',
  'Containerizar 3 projetos da empresa e implementar CI/CD',
  'Curso online + mentoria do time de DevOps',
  'Necessário para modernização da infraestrutura',
  'Conclusão até 31/08/2026',
  '2026-02-01', '2026-08-31', 30, 'EM_ANDAMENTO', 11
),
(
  1,
  'Liderar projeto de refatoração',
  'Assumir liderança técnica em projeto estratégico',
  'Liderar refatoração do sistema legado para arquitetura moderna',
  'Entregar MVP com 80% de cobertura de testes',
  'Equipe de 3 desenvolvedores + suporte da coordenação',
  'Desenvolver habilidades de liderança técnica',
  'Conclusão até 31/12/2026',
  '2026-03-01', '2026-12-31', 15, 'EM_ANDAMENTO', 22
);

-- ============================================
-- OBJETIVOS PDI - Maria Santos
-- ============================================
INSERT INTO objetivos_pdi (
  pdi_id, titulo, descricao,
  especifico, mensuravel, atingivel, relevante, temporal,
  data_inicio, data_fim, progresso, status, competencia_id
) VALUES
(
  2,
  'MBA em Gestão de TI',
  'Concluir MBA em Gestão de Tecnologia da Informação',
  'Cursar e concluir MBA em Gestão de TI',
  'Aprovação em todas as disciplinas com média mínima 8.0',
  'Curso aos finais de semana, com apoio financeiro da empresa',
  'Preparação para assumir posição de gerência',
  'Conclusão até 31/12/2026',
  '2026-02-01', '2026-12-31', 25, 'EM_ANDAMENTO', 22
),
(
  2,
  'Implementar OKRs na área de TI',
  'Estruturar e implementar metodologia OKR',
  'Implementar framework de OKRs para toda área de TI',
  ' 100% dos times usando OKRs com revisões trimestrais',
  'Treinamento externo + consultoria especializada',
  'Melhorar alinhamento estratégico e resultados',
  'Conclusão até 30/06/2026',
  '2026-01-15', '2026-06-30', 60, 'EM_ANDAMENTO', 20
);

-- ============================================
-- ATUALIZAÇÕES DE OBJETIVOS
-- ============================================
INSERT INTO atualizacoes_objetivo (objetivo_id, funcionario_id, data_atualizacao, progresso_anterior, progresso_novo, descricao) VALUES
(1, 1, '2026-02-01', 0, 20, 'Concluí o módulo de fundamentos AWS. Estudando EC2 e S3.'),
(1, 1, '2026-02-15', 20, 35, 'Finalizei módulos de EC2, S3 e RDS. Praticando com labs.'),
(1, 1, '2026-03-01', 35, 45, 'Concluí módulo de VPC e segurança. Agendei exame para maio.'),
(2, 1, '2026-02-15', 0, 15, 'Containerizei primeiro projeto (API de usuários).'),
(2, 1, '2026-03-01', 15, 30, 'Containerizei segundo projeto e configurei CI/CD básico.'),
(3, 1, '2026-03-15', 0, 15, 'Planejamento do projeto concluído. Iniciando sprint 1.');

-- ============================================
-- NOTIFICAÇÕES
-- ============================================
INSERT INTO notificacoes (usuario_id, tipo, titulo, mensagem, link, lida) VALUES
(1, 'FEEDBACK_PENDENTE', 'Feedback Pendente', 'Você tem uma avaliação de gestor pendente no ciclo Q1 2026', '/feedbacks', FALSE),
(1, 'PDI_APROVADO', 'PDI Aprovado', 'Seu PDI 2026 foi aprovado por Maria Santos', '/pdi', TRUE),
(2, 'NOVA_AVALIACAO', 'Nova Avaliação', 'Você precisa avaliar João Silva no ciclo Q1 2026', '/feedbacks', FALSE),
(3, 'SISTEMA', 'Bem-vindo ao Sistema GCVF', 'Sistema de Gestão de Ciclo de Vida do Funcionário está ativo', '/dashboard', TRUE);

-- ============================================
-- LOGS DE AUDITORIA (Exemplos)
-- ============================================
INSERT INTO logs_auditoria (usuario_id, acao, tabela, registro_id, ip_address) VALUES
(1, 'LOGIN', 'usuarios', 1, '192.168.1.100'),
(1, 'UPDATE', 'objetivos_pdi', 1, '192.168.1.100'),
(2, 'LOGIN', 'usuarios', 2, '192.168.1.101'),
(2, 'CREATE', 'avaliacoes_feedback', 1, '192.168.1.101'),
(3, 'LOGIN', 'usuarios', 3, '192.168.1.102'),
(3, 'APPROVE', 'pdis', 1, '192.168.1.102');

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View: Funcionários com seus gestores
CREATE OR REPLACE VIEW vw_funcionarios_completo AS
SELECT 
  f.id,
  f.matricula,
  f.nome_completo,
  f.status,
  c.nome AS cargo,
  c.nivel AS nivel_cargo,
  s.nome AS setor,
  e.sigla AS entidade,
  u.email,
  u.perfil,
  g.nome_completo AS gestor_nome,
  g.matricula AS gestor_matricula
FROM funcionarios f
INNER JOIN usuarios u ON f.usuario_id = u.id
INNER JOIN cargos c ON f.cargo_id = c.id
INNER JOIN setores s ON f.setor_id = s.id
INNER JOIN entidades e ON f.entidade_id = e.id
LEFT JOIN funcionarios g ON f.gestor_id = g.id
WHERE f.status = 'ATIVO';

-- View: Matriz de Competências
CREATE OR REPLACE VIEW vw_matriz_competencias AS
SELECT 
  f.id AS funcionario_id,
  f.nome_completo,
  f.matricula,
  s.nome AS setor,
  c.nome AS cargo,
  ac.nome AS area_competencia,
  comp.nome AS competencia,
  comp.tipo AS tipo_competencia,
  fc.nivel_atual,
  fc.nivel_desejado,
  fc.data_avaliacao
FROM funcionarios f
INNER JOIN funcionario_competencias fc ON f.id = fc.funcionario_id
INNER JOIN competencias comp ON fc.competencia_id = comp.id
INNER JOIN areas_competencia ac ON comp.area_id = ac.id
INNER JOIN setores s ON f.setor_id = s.id
INNER JOIN cargos c ON f.cargo_id = c.id
WHERE f.status = 'ATIVO' AND comp.ativo = TRUE;

-- View: PDIs Ativos com Progresso
CREATE OR REPLACE VIEW vw_pdis_ativos AS
SELECT 
  p.id AS pdi_id,
  p.ano,
  p.status AS pdi_status,
  f.id AS funcionario_id,
  f.nome_completo,
  f.matricula,
  COUNT(o.id) AS total_objetivos,
  AVG(o.progresso) AS progresso_medio,
  SUM(CASE WHEN o.status = 'CONCLUIDO' THEN 1 ELSE 0 END) AS objetivos_concluidos,
  SUM(CASE WHEN o.status = 'ATRASADO' THEN 1 ELSE 0 END) AS objetivos_atrasados
FROM pdis p
INNER JOIN funcionarios f ON p.funcionario_id = f.id
LEFT JOIN objetivos_pdi o ON p.id = o.pdi_id
WHERE p.status IN ('APROVADO', 'EM_ANDAMENTO')
GROUP BY p.id, p.ano, p.status, f.id, f.nome_completo, f.matricula;

-- ============================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- ============================================
CREATE INDEX idx_funcionarios_nome_completo ON funcionarios(nome_completo);
CREATE INDEX idx_avaliacoes_status_tipo ON avaliacoes_feedback(status, tipo);
CREATE INDEX idx_objetivos_status_datas ON objetivos_pdi(status, data_inicio, data_fim);
CREATE INDEX idx_competencias_tipo_ativo ON competencias(tipo, ativo);

-- ============================================
-- FIM DO SCRIPT
-- ============================================
