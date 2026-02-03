'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
  user: {
    name: string
    role: string
    entity: string
    userRole: 'funcionario' | 'coordenador' | 'gerente' | 'administrador'
  }
}

export default function MainLayout({ children, user }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="main-layout">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={handleOverlayClick} />
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${isMobileMenuOpen ? 'open' : ''}`}>
        <Sidebar userRole={user.userRole} user={user} />
      </div>

      {/* Main Content Area */}
      <div className="content-area">
        <Header
          user={user}
          onMenuToggle={handleMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>

      <style jsx>{`
        .main-layout {
          min-height: 100vh;
          display: flex;
          background-color: #F3F4F6;
        }

        /* Mobile Overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 90;
          backdrop-filter: blur(2px);
        }

        /* Sidebar Container */
        .sidebar-container {
          flex-shrink: 0;
        }

        /* Content Area */
        .content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
        }

        .content-wrapper {
          padding: 32px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        /* Tablet and Mobile Responsive */
        @media (max-width: 1024px) {
          .mobile-overlay {
            display: block;
          }

          .sidebar-container {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 100;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .sidebar-container.open {
            transform: translateX(0);
          }

          .content-wrapper {
            padding: 24px;
          }
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}