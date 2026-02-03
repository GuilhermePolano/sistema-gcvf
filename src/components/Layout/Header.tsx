'use client'

import { Bell, Search, Menu, X, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  user: {
    name: string
    role: string
    entity: string
  }
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/perfil': 'Meu Perfil',
  '/funcionarios': 'Funcionarios',
  '/competencias': 'Competencias',
  '/matriz-skills': 'Matriz de Skills',
  '/pdi': 'Meu PDI',
  '/feedbacks': 'Feedbacks',
  '/ciclos': 'Ciclos de Avaliacao',
  '/relatorios': 'Relatorios',
  '/relatorios/pessoal': 'Meu Desempenho',
  '/configuracoes': 'Configuracoes',
  '/usuarios': 'Usuarios',
  '/auditoria': 'Auditoria'
}

export default function Header({ user, onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  const notifications = [
    {
      id: 1,
      title: 'Feedback pendente',
      message: 'Autoavaliacao Q1 2026 vence em 3 dias',
      time: '2h atras',
      type: 'warning',
      unread: true
    },
    {
      id: 2,
      title: 'PDI atualizado',
      message: 'Novo objetivo adicionado ao seu PDI',
      time: '1 dia atras',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Reuniao agendada',
      message: '1:1 com gestor marcado para amanha',
      time: '2 dias atras',
      type: 'success',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  // Get current page title
  const getCurrentPageTitle = () => {
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname === path || pathname.startsWith(path + '/')) {
        return title
      }
    }
    return 'Dashboard'
  }

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setShowNotifications(false)
        setShowUserMenu(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false)
      setShowUserMenu(false)
    }
    if (showNotifications || showUserMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showNotifications, showUserMenu])

  return (
    <header className="header">
      <div className="header-left">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={onMenuToggle}>
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Page Title / Breadcrumb */}
        <div className="page-info">
          <h1 className="page-title">{getCurrentPageTitle()}</h1>
        </div>
      </div>

      <div className="header-center">
        {/* Search Bar */}
        <div className={`search-box ${searchFocused ? 'focused' : ''}`}>
          <Search size={18} className="search-icon" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Buscar funcionarios, PDIs, feedbacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {!searchFocused && !searchQuery && (
            <kbd className="search-kbd">Ctrl+K</kbd>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Entity Badge */}
        <div className="entity-badge">
          <span>{user.entity}</span>
        </div>

        {/* Notifications */}
        <div className="dropdown-wrapper">
          <button
            className={`icon-btn ${showNotifications ? 'active' : ''} ${unreadCount > 0 ? 'has-badge' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setShowNotifications(!showNotifications)
              setShowUserMenu(false)
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown notifications-dropdown" onClick={e => e.stopPropagation()}>
              <div className="dropdown-header">
                <span className="dropdown-title">Notificacoes</span>
                {unreadCount > 0 && (
                  <span className="unread-badge">{unreadCount} novas</span>
                )}
              </div>

              <div className="notification-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <div className={`notification-dot ${notification.type}`} />
                    <div className="notification-content">
                      <span className="notification-title">{notification.title}</span>
                      <span className="notification-message">{notification.message}</span>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dropdown-footer">
                <button className="view-all-btn">Ver todas as notificacoes</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="dropdown-wrapper">
          <button
            className={`user-btn ${showUserMenu ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setShowUserMenu(!showUserMenu)
              setShowNotifications(false)
            }}
          >
            <div className="user-avatar-small">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="user-name-short">{user.name.split(' ')[0]}</span>
            <ChevronDown size={16} className={`chevron ${showUserMenu ? 'rotated' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="dropdown user-dropdown" onClick={e => e.stopPropagation()}>
              <div className="user-dropdown-header">
                <div className="user-avatar-large">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <span className="user-full-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <a href="/perfil" className="dropdown-item">Meu Perfil</a>
              <a href="/configuracoes" className="dropdown-item">Configuracoes</a>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout">Sair do Sistema</button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .header {
          background: white;
          border-bottom: 1px solid #E5E7EB;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-menu-btn {
          display: none;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: #374151;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .mobile-menu-btn:hover {
          background: #F3F4F6;
        }

        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex;
          }
        }

        .page-info {
          display: flex;
          flex-direction: column;
        }

        .page-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1F2937;
          margin: 0;
        }

        .header-center {
          flex: 1;
          max-width: 480px;
          margin: 0 32px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: #F3F4F6;
          border: 2px solid transparent;
          border-radius: 10px;
          padding: 0 14px;
          transition: all 0.2s ease;
        }

        .search-box.focused {
          background: white;
          border-color: #0066CC;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.12);
        }

        .search-icon {
          color: #9CA3AF;
          flex-shrink: 0;
        }

        .search-box.focused .search-icon {
          color: #0066CC;
        }

        .search-box input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 10px 12px;
          font-size: 0.875rem;
          color: #1F2937;
          outline: none;
        }

        .search-box input::placeholder {
          color: #9CA3AF;
        }

        .search-kbd {
          background: #E5E7EB;
          color: #6B7280;
          font-size: 0.6875rem;
          font-weight: 500;
          padding: 3px 6px;
          border-radius: 4px;
          font-family: inherit;
          border: none;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .entity-badge {
          background: linear-gradient(135deg, #E6F2FF 0%, #CCE5FF 100%);
          color: #003366;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 16px;
        }

        .dropdown-wrapper {
          position: relative;
        }

        .icon-btn {
          width: 40px;
          height: 40px;
          background: #F3F4F6;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6B7280;
          position: relative;
          transition: all 0.15s ease;
        }

        .icon-btn:hover,
        .icon-btn.active {
          background: #0066CC;
          color: white;
        }

        .icon-btn .badge {
          position: absolute;
          top: 4px;
          right: 4px;
          min-width: 16px;
          height: 16px;
          background: #DC3545;
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px 6px 6px;
          background: #F3F4F6;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .user-btn:hover,
        .user-btn.active {
          background: #E5E7EB;
        }

        .user-avatar-small {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .user-name-short {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .chevron {
          color: #9CA3AF;
          transition: transform 0.2s ease;
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        /* Dropdowns */
        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05);
          z-index: 100;
          animation: dropdownFade 0.15s ease;
          overflow: hidden;
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .notifications-dropdown {
          width: 360px;
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #E5E7EB;
        }

        .dropdown-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1F2937;
        }

        .unread-badge {
          background: #E6F2FF;
          color: #0066CC;
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 10px;
        }

        .notification-list {
          max-height: 320px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          gap: 12px;
          padding: 14px 20px;
          cursor: pointer;
          transition: background 0.15s ease;
          border-bottom: 1px solid #F3F4F6;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-item:hover {
          background: #F9FAFB;
        }

        .notification-item.unread {
          background: #FAFBFF;
        }

        .notification-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 5px;
        }

        .notification-dot.warning { background: #FFC107; }
        .notification-dot.info { background: #0066CC; }
        .notification-dot.success { background: #28A745; }

        .notification-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .notification-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1F2937;
        }

        .notification-message {
          font-size: 0.8125rem;
          color: #6B7280;
          line-height: 1.4;
        }

        .notification-time {
          font-size: 0.6875rem;
          color: #9CA3AF;
        }

        .dropdown-footer {
          padding: 12px 16px;
          border-top: 1px solid #E5E7EB;
          background: #F9FAFB;
        }

        .view-all-btn {
          width: 100%;
          padding: 10px;
          background: white;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #0066CC;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .view-all-btn:hover {
          background: #0066CC;
          border-color: #0066CC;
          color: white;
        }

        /* User Dropdown */
        .user-dropdown {
          width: 240px;
        }

        .user-dropdown-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
        }

        .user-avatar-large {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-full-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1F2937;
        }

        .user-role {
          font-size: 0.75rem;
          color: #6B7280;
        }

        .dropdown-divider {
          height: 1px;
          background: #E5E7EB;
          margin: 4px 0;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 10px 16px;
          background: none;
          border: none;
          text-align: left;
          font-size: 0.875rem;
          color: #374151;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s ease;
        }

        .dropdown-item:hover {
          background: #F3F4F6;
        }

        .dropdown-item.logout {
          color: #DC3545;
        }

        .dropdown-item.logout:hover {
          background: #FEF2F2;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header {
            padding: 0 16px;
          }

          .header-center {
            display: none;
          }

          .entity-badge {
            display: none;
          }

          .user-name-short {
            display: none;
          }

          .notifications-dropdown,
          .user-dropdown {
            width: calc(100vw - 32px);
            right: -60px;
          }
        }
      `}</style>
    </header>
  )
}
