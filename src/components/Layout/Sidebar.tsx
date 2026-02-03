'use client'

import {
  Home,
  Users,
  BarChart3,
  MessageSquare,
  Target,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Building2,
  Layers,
  ClipboardList,
  Shield,
  History,
  TrendingUp,
  UserCircle,
  ChevronDown,
  BookOpen,
  PieChart
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

interface SidebarProps {
  userRole: 'funcionario' | 'coordenador' | 'gerente' | 'administrador'
  user?: {
    name: string
    role: string
    entity: string
  }
}

type MenuItemType = {
  icon: React.ElementType
  label: string
  href: string
  roles: string[]
  badge?: string
}

type MenuGroupType = {
  title: string
  icon: React.ElementType
  items: MenuItemType[]
  collapsible?: boolean
}

export default function Sidebar({ userRole, user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const pathname = usePathname()

  const menuGroups: MenuGroupType[] = [
    {
      title: 'Principal',
      icon: Home,
      collapsible: false,
      items: [
        {
          icon: Home,
          label: 'Dashboard',
          href: '/dashboard',
          roles: ['funcionario', 'coordenador', 'gerente', 'administrador']
        },
        {
          icon: UserCircle,
          label: 'Meu Perfil',
          href: '/perfil',
          roles: ['funcionario', 'coordenador', 'gerente', 'administrador']
        }
      ]
    },
    {
      title: 'Gestao de Pessoas',
      icon: Users,
      collapsible: true,
      items: [
        {
          icon: Users,
          label: 'Funcionarios',
          href: '/funcionarios',
          roles: ['coordenador', 'gerente', 'administrador']
        },
        {
          icon: Layers,
          label: 'Competencias',
          href: '/competencias',
          roles: ['coordenador', 'gerente', 'administrador']
        },
        {
          icon: BarChart3,
          label: 'Matriz de Skills',
          href: '/matriz-skills',
          roles: ['gerente', 'administrador']
        }
      ]
    },
    {
      title: 'Desenvolvimento',
      icon: BookOpen,
      collapsible: true,
      items: [
        {
          icon: Target,
          label: 'Meu PDI',
          href: '/pdi',
          roles: ['funcionario', 'coordenador', 'gerente', 'administrador']
        },
        {
          icon: MessageSquare,
          label: 'Feedbacks',
          href: '/feedbacks',
          roles: ['funcionario', 'coordenador', 'gerente', 'administrador'],
          badge: '3'
        },
        {
          icon: ClipboardList,
          label: 'Ciclos de Avaliacao',
          href: '/ciclos',
          roles: ['coordenador', 'gerente', 'administrador']
        }
      ]
    },
    {
      title: 'Relatorios',
      icon: PieChart,
      collapsible: true,
      items: [
        {
          icon: TrendingUp,
          label: 'Meu Desempenho',
          href: '/relatorios/pessoal',
          roles: ['funcionario', 'coordenador', 'gerente', 'administrador']
        },
        {
          icon: FileText,
          label: 'Relatorios Gerenciais',
          href: '/relatorios',
          roles: ['coordenador', 'gerente', 'administrador']
        }
      ]
    },
    {
      title: 'Sistema',
      icon: Settings,
      collapsible: true,
      items: [
        {
          icon: Settings,
          label: 'Configuracoes',
          href: '/configuracoes',
          roles: ['coordenador', 'gerente', 'administrador']
        },
        {
          icon: Shield,
          label: 'Usuarios',
          href: '/usuarios',
          roles: ['administrador']
        },
        {
          icon: History,
          label: 'Auditoria',
          href: '/auditoria',
          roles: ['administrador']
        }
      ]
    }
  ]

  const filteredGroups = menuGroups.map(group => ({
    ...group,
    items: group.items.filter(item => item.roles.includes(userRole))
  })).filter(group => group.items.length > 0)

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/'
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Auto-expand group containing active route
  useEffect(() => {
    const activeGroups: string[] = []
    filteredGroups.forEach(group => {
      if (group.items.some(item => isActive(item.href))) {
        activeGroups.push(group.title)
      }
    })
    // Always keep Principal expanded
    if (!activeGroups.includes('Principal')) {
      activeGroups.push('Principal')
    }
    setExpandedGroups(activeGroups)
  }, [pathname])

  const toggleGroup = (title: string) => {
    if (isCollapsed) return
    setExpandedGroups(prev =>
      prev.includes(title)
        ? prev.filter(g => g !== title)
        : [...prev, title]
    )
  }

  const isGroupExpanded = (title: string) => {
    return !isCollapsed && expandedGroups.includes(title)
  }

  const hasActiveItemInGroup = (group: MenuGroupType) => {
    return group.items.some(item => isActive(item.href))
  }

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Header / Brand */}
      <div className={styles.sidebarHeader}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Building2 size={isCollapsed ? 22 : 26} strokeWidth={1.5} />
          </div>
          {!isCollapsed && (
            <div className={styles.brandInfo}>
              <span className={styles.brandName}>FIERGS</span>
              <span className={styles.brandSystem}>Sistema GCVF</span>
            </div>
          )}
        </div>
        <button
          className={styles.collapseBtn}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.sidebarNav}>
        {filteredGroups.map((group, groupIndex) => {
          const isExpanded = isGroupExpanded(group.title)
          const hasActiveItem = hasActiveItemInGroup(group)
          const GroupIcon = group.icon

          return (
            <div
              key={groupIndex}
              className={`${styles.navGroup} ${hasActiveItem ? styles.hasActive : ''}`}
            >
              {!isCollapsed ? (
                <button
                  className={`${styles.groupHeader} ${group.collapsible ? styles.collapsible : ''} ${isExpanded ? styles.expanded : ''}`}
                  onClick={() => group.collapsible && toggleGroup(group.title)}
                >
                  <div className={styles.groupHeaderLeft}>
                    <span className={styles.groupIcon}>
                      <GroupIcon size={14} strokeWidth={2} />
                    </span>
                    <span className={styles.groupTitle}>{group.title}</span>
                  </div>
                  {group.collapsible && (
                    <ChevronDown
                      size={14}
                      className={`${styles.groupChevron} ${isExpanded ? styles.expanded : ''}`}
                    />
                  )}
                </button>
              ) : (
                <div className={styles.groupSeparator} />
              )}

              <div className={`${styles.navItemsWrapper} ${isExpanded || !group.collapsible ? '' : styles.collapsedWrapper}`}>
                <ul className={styles.navItems}>
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)

                    return (
                      <li key={item.href} className={styles.navItem}>
                        <Link
                          href={item.href}
                          className={`${styles.navLink} ${active ? styles.active : ''}`}
                          title={isCollapsed ? item.label : undefined}
                        >
                          <span className={styles.navIcon}>
                            <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                          </span>
                          {!isCollapsed && (
                            <>
                              <span className={styles.navLabel}>{item.label}</span>
                              {item.badge && (
                                <span className={styles.navBadge}>{item.badge}</span>
                              )}
                            </>
                          )}
                        </Link>
                        {isCollapsed && (
                          <div className={styles.tooltip}>{item.label}</div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </nav>

      {/* User Section */}
      {user && (
        <div className={styles.sidebarFooter}>
          <div className={styles.userSection}>
            <div className={styles.userAvatar}>
              <User size={isCollapsed ? 18 : 20} strokeWidth={1.5} />
            </div>
            {!isCollapsed && (
              <div className={styles.userDetails}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userMeta}>{user.role} - {user.entity}</span>
              </div>
            )}
            {!isCollapsed && (
              <button className={styles.logoutBtn} title="Sair do sistema">
                <LogOut size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  )
}
