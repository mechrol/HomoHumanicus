import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Bot,
  Store,
  ChevronDown,
  User,
  CreditCard,
  Play,
  BookOpen,
  Globe,
  Palette
} from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/reseller', icon: Store, label: 'Reseller' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/integrations', icon: Settings, label: 'Integrations' },
  ]

  const userMenuItems = [
    { icon: User, label: 'Profile', action: () => {} },
    { icon: Play, label: 'Video tutorials', action: () => {} },
    { icon: BookOpen, label: 'Knowledgebase', action: () => {} },
    { icon: Palette, label: 'Template Club', action: () => {} },
    { icon: Globe, label: 'Agency Website', action: () => {} },
    { icon: Settings, label: 'DFY Tribe', action: () => {} },
    { icon: Globe, label: 'Language', action: () => {} },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Top Navigation Bar */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 2rem',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot size={32} color="#4f46e5" />
          <span style={{ 
            fontWeight: 'bold', 
            fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            AITribes
          </span>
          <span style={{ 
            fontSize: '0.75rem', 
            color: '#64748b',
            fontWeight: '500',
            marginLeft: '0.5rem'
          }}>
            BACKEND ADMIN
          </span>
        </div>

        {/* Navigation Menu */}
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: location.pathname === item.path ? '#4f46e5' : 'transparent',
                color: location.pathname === item.path ? 'white' : '#64748b'
              }}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = '#f1f5f9'
                  e.target.style.color = '#4f46e5'
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#64748b'
                }
              }}
            >
              <item.icon size={18} />
              {item.label}
              {item.label === 'Reseller' && (
                <ChevronDown size={14} style={{ marginLeft: '0.25rem' }} />
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginRight: '0.5rem'
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                Janusz Krawczak
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                januszjankra@gmail.com
              </div>
            </div>
            <div 
              style={{ 
                width: '2.5rem', 
                height: '2.5rem', 
                borderRadius: '50%', 
                backgroundColor: '#e2e8f0',
                backgroundImage: 'url(https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid #e2e8f0'
              }} 
            />
          </button>

          {/* User Dropdown Menu */}
          {showUserDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              width: '280px',
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              overflow: 'hidden'
            }}>
              {/* Credits Section */}
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                    Free Credits
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4f46e5' }}>
                    735/1000
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '3px',
                  marginTop: '0.5rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '73.5%',
                    height: '100%',
                    backgroundColor: '#4f46e5',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>

              {/* Menu Items */}
              <div style={{ padding: '0.5rem 0' }}>
                {userMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <item.icon size={16} color="#64748b" />
                    {item.label}
                    {item.label === 'Language' && (
                      <ChevronDown size={14} style={{ marginLeft: 'auto', color: '#64748b' }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Sign Out */}
              <div style={{ borderTop: '1px solid #e2e8f0', padding: '0.5rem 0' }}>
                <button
                  onClick={handleSignOut}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#dc2626',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {children}
      </div>

      {/* Click outside to close dropdown */}
      {showUserDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50
          }}
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </div>
  )
}

export default Layout
