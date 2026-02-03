# Requirements Document

## Introduction

O Sistema de Controle de Ciclo de Vida do Funcionário com PDI (GCVF) é uma solução escalável e flexível para gerenciar o ciclo completo de vida dos funcionários de uma empresa de TI. O sistema visa otimizar a gestão de talentos, promover a evolução contínua dos colaboradores e a retenção de talentos, suportando o crescimento da empresa e integrando as necessidades de múltiplas entidades (FIERGS, SESI, SENAI, IEL, CIERGS) em uma arquitetura web responsiva.

## Glossary

- **GCVF**: Sistema de Gestão de Ciclo de Vida do Funcionário
- **PDI**: Plano de Desenvolvimento Individual
- **Stack Tecnológica**: Conjunto de tecnologias, linguagens e frameworks que um funcionário domina
- **Feedback 180°**: Processo que envolve autoavaliação do funcionário e avaliação de seu gestor direto
- **Feedback 360°**: Processo que inclui autoavaliação, avaliação do gestor, de colegas e subordinados
- **RBAC**: Role-Based Access Control (Controle de Acesso Baseado em Papéis)
- **Entidade**: Organizações como FIERGS, SESI, SENAI, IEL, CIERGS
- **Setor**: Departamentos dentro de cada entidade (ex: GINFO, RH)
- **Nível de Conhecimento**: Escala de 0 a 5 para avaliar proficiência em tecnologias
- **Administrador_Global**: Usuário com acesso irrestrito a todas as funcionalidades do sistema

## Requirements

### Requirement 1

**User Story:** As a Coordenador, I want to register new employees with detailed information, so that I can maintain a comprehensive database of team members and their capabilities.

#### Acceptance Criteria

1. WHEN a Coordenador accesses the employee registration form, THE GCVF SHALL display all mandatory fields including name, position, level, area of expertise, entity, sector, admission date, and corporate email
2. WHEN a Coordenador submits valid employee data, THE GCVF SHALL create a new employee record and assign a unique identifier
3. WHEN a Coordenador attempts to register an employee with missing mandatory fields, THE GCVF SHALL prevent registration and display specific error messages for each missing field
4. WHEN a Coordenador registers an employee, THE GCVF SHALL restrict visibility of this employee data to users within the same entity and authorized sectors
5. WHEN employee data is successfully registered, THE GCVF SHALL redirect to the employee details page and display a success notification

### Requirement 2

**User Story:** As a Funcionário, I want to manage my technology stacks with proficiency levels, so that I can track my technical competencies and plan my professional development.

#### Acceptance Criteria

1. WHEN a Funcionário accesses their technology stack section, THE GCVF SHALL display all registered technologies with their current proficiency levels
2. WHEN assigning proficiency levels to technologies, THE GCVF SHALL enforce a scale from 0 to 5 where 0 means no knowledge and 5 means expert reference level
3. WHEN a Funcionário updates their technology proficiency, THE GCVF SHALL save the changes and maintain a historical record of skill evolution
4. WHEN displaying technology stacks, THE GCVF SHALL organize them hierarchically by categories, technologies, and frameworks
5. WHEN a Funcionário views their competencies, THE GCVF SHALL show only their own data and prevent access to other employees' information

### Requirement 3

**User Story:** As a Gerente, I want to configure feedback cycles with flexible periodicity, so that I can establish structured evaluation processes for my teams.

#### Acceptance Criteria

1. WHEN a Gerente configures a feedback cycle, THE GCVF SHALL allow selection of periodicity options including monthly, bimonthly, quarterly, semi-annual, and annual
2. WHEN setting up feedback types, THE GCVF SHALL provide options for 180° feedback (self and manager evaluation) and 360° feedback (including peers and subordinates)
3. WHEN a feedback cycle is configured, THE GCVF SHALL automatically notify all participants according to the established timeline
4. WHEN a Gerente initiates a feedback cycle, THE GCVF SHALL ensure only employees within their entity and authorized sectors are included
5. WHEN feedback cycles are active, THE GCVF SHALL track completion status and send reminders for pending evaluations

### Requirement 4

**User Story:** As a Funcionário, I want to complete self-assessments with pre-configured questions, so that I can provide structured feedback about my performance and development needs.

#### Acceptance Criteria

1. WHEN a Funcionário accesses a self-assessment, THE GCVF SHALL present categorized questions covering technical skills, behavioral competencies, and development goals
2. WHEN answering assessment questions, THE GCVF SHALL support multiple question types including multiple choice, numerical scales, and free text responses
3. WHEN a self-assessment is submitted, THE GCVF SHALL validate all required responses and prevent submission of incomplete assessments
4. WHEN feedback data is collected, THE GCVF SHALL categorize responses into technical feedback, behavioral feedback, and one-on-one conversation notes
5. WHEN assessments are completed, THE GCVF SHALL generate consolidated reports showing positive points, improvement areas, and agreed action plans

### Requirement 5

**User Story:** As a Coordenador, I want to manage assessment questions and categories, so that I can customize evaluation forms to match our team's specific needs.

#### Acceptance Criteria

1. WHEN a Coordenador accesses question management, THE GCVF SHALL allow creation, editing, and deletion of assessment questions
2. WHEN creating questions, THE GCVF SHALL support categorization by type (technical, behavioral, development) and question format
3. WHEN managing question categories, THE GCVF SHALL allow hierarchical organization and ensure questions can be reused across different assessment forms
4. WHEN questions are modified, THE GCVF SHALL maintain version history and ensure ongoing assessments are not disrupted
5. WHEN question banks are updated, THE GCVF SHALL allow Coordenadores to preview how changes will appear in active assessment forms

### Requirement 6

**User Story:** As a Funcionário, I want to track my Individual Development Plan (PDI), so that I can monitor my progress toward professional goals and career advancement.

#### Acceptance Criteria

1. WHEN a PDI is created from feedback results, THE GCVF SHALL generate SMART objectives (Specific, Measurable, Achievable, Relevant, Time-bound)
2. WHEN accessing my PDI, THE GCVF SHALL display current objectives, proposed actions, required resources, deadlines, and progress status
3. WHEN updating PDI progress, THE GCVF SHALL allow both employees and managers to record status updates and milestone achievements
4. WHEN PDI deadlines approach, THE GCVF SHALL send automated reminders to both employee and manager
5. WHEN PDI objectives are completed, THE GCVF SHALL allow marking as achieved and linking to subsequent development goals

### Requirement 7

**User Story:** As an Administrador_Global, I want to manage user profiles and access controls, so that I can ensure proper security and data segregation across multiple entities.

#### Acceptance Criteria

1. WHEN managing user profiles, THE Administrador_Global SHALL assign roles including Funcionário, Coordenador, Gerente, and Administrador with appropriate permissions
2. WHEN configuring access controls, THE GCVF SHALL implement role-based access control (RBAC) with entity and sector-level data segregation
3. WHEN users access the system, THE GCVF SHALL enforce that Funcionários, Coordenadores, and Gerentes can only view data from their assigned entity and authorized sectors
4. WHEN the Administrador_Global accesses data, THE GCVF SHALL provide unrestricted access to all entities, sectors, and system functions
5. WHEN user permissions are modified, THE GCVF SHALL immediately apply changes and log all administrative actions for audit purposes

### Requirement 8

**User Story:** As a Gerente, I want to view aggregated performance data and skills matrices, so that I can make informed decisions about team development and project assignments.

#### Acceptance Criteria

1. WHEN accessing team analytics, THE GCVF SHALL display skills matrices showing technology proficiencies across all team members
2. WHEN viewing performance data, THE GCVF SHALL present aggregated feedback scores, PDI completion rates, and development trends
3. WHEN analyzing team capabilities, THE GCVF SHALL allow filtering by entity, sector, position level, area of expertise, and specific technologies
4. WHEN identifying skill gaps, THE GCVF SHALL highlight areas where team knowledge is insufficient and suggest training opportunities
5. WHEN generating reports, THE GCVF SHALL ensure data visibility respects the manager's entity and sector authorization boundaries

### Requirement 9

**User Story:** As the system, I want to maintain comprehensive audit logs and ensure data security, so that all operations are traceable and sensitive information is protected.

#### Acceptance Criteria

1. WHEN users perform critical operations, THE GCVF SHALL log all actions including user identity, timestamp, operation type, and affected data
2. WHEN handling sensitive data, THE GCVF SHALL encrypt all information both in transit using HTTPS/TLS and at rest in the database
3. WHEN authentication is required, THE GCVF SHALL integrate with corporate authentication systems and support multi-factor authentication
4. WHEN data access occurs, THE GCVF SHALL enforce strict authorization rules preventing unauthorized access to employee information
5. WHEN audit logs are generated, THE GCVF SHALL protect them against tampering and make them accessible only to Administrador_Global users

### Requirement 10

**User Story:** As a user, I want to access the system through a responsive web interface, so that I can perform my tasks efficiently across different devices and screen sizes.

#### Acceptance Criteria

1. WHEN accessing the system from any device, THE GCVF SHALL provide a responsive interface that adapts to desktop, tablet, and mobile screen sizes
2. WHEN navigating the interface, THE GCVF SHALL present an intuitive and modern design that minimizes learning curve for all user profiles
3. WHEN performing tasks, THE GCVF SHALL provide logical workflows and efficient processes for feedback completion and PDI management
4. WHEN the system loads, THE GCVF SHALL ensure fast response times and smooth performance even under high user load
5. WHEN accessibility features are needed, THE GCVF SHALL comply with web accessibility standards (WCAG) to support users with different capabilities