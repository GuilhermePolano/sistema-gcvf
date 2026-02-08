'use client'

import { Bell, Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface HeaderProps {
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export default function HeaderWithAuth({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()

  if (!user) return null

  const handleLogout = () => {
    if (confirm('Deseja realmente sair do sistema?')) {
      logout()
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="header-title">
          <h1>Sistema GCVF</h1>
          <span className="entity-badge">{user.entidade}</span>
        </div>
      </div>

      <div className="header-right">
        <button className="icon-button" aria-label="Notificações">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <div className="user-menu-container">
          <button
            className="user-menu-button"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              {user.nome.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.nome}</span>
              <span className="user-role">{user.cargo}</span>
            </div>
            <ChevronDown size={16} />
          </button>

          {showUserMenu && (
            <>
              <div
                className="menu-overlay"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <strong>{user.nome}</strong>
                    <span>{user.email}</span>
                    <span className="user-badge">{user.perfil}</span>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  Sair do Sistema
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .header {
          height: 64px;
          background-color: var(--white);
          border-bottom: 1px solid var(--gray-200);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--spacing-lg);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--gray-700);
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          transition: background-color 0.2s ease;
        }

        .menu-toggle:hover {
          background-color: var(--gray-100);
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .header-title h1 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-dark);
          margin: 0;
        }

        .entity-badge {
          background-color: var(--primary-light);
          color: var(--primary-dark);
          padding: 4px 12px;
          border-radius: var(--radius-lg);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .icon-button {
          position: relative;
          background: none;
          border: none;
          color: var(--gray-700);
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          transition: background-color 0.2s ease;
        }

        .icon-button:hover {
          background-color: var(--gray-100);
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background-color: var(--error);
          color: var(--white);
          font-size: 0.625rem;
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 10px;
          min-width: 16px;
          text-align: center;
        }

        .user-menu-container {
          position: relative;
        }

        .user-menu-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          transition: background-color 0.2s ease;
        }

        .user-menu-button:hover {
          background-color: var(--gray-100);
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary-dark);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--gray-900);
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 60;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background-color: var(--white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--gray-200);
          min-width: 240px;
          z-index: 70;
        }

        .dropdown-header {
          padding: var(--spacing-md);
        }

        .dropdown-user-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dropdown-user-info strong {
          font-size: 0.875rem;
          color: var(--gray-900);
        }

        .dropdown-user-info span {
          font-size: 0.75rem;
          color: var(--gray-600);
        }

        .user-badge {
          display: inline-block;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--gray-200);
          margin: 0;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: none;
          border: none;
          color: var(--error);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          text-align: left;
        }

        .dropdown-item:hover {
          background-color: var(--gray-50);
        }

        @media (max-width: 1024px) {
          .menu-toggle {
            display: block;
          }

          .user-info {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 0 var(--spacing-md);
          }

          .header-title h1 {
            font-size: 1rem;
          }

          .entity-badge {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}
