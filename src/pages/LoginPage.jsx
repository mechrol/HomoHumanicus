import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Bot, Globe, ChevronDown } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [language, setLanguage] = useState('en')
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  
  const { user, signIn } = useAuth()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const translations = {
    en: {
      title: 'AI Tribes Backend Access',
      subtitle: 'Administrative access to AI Tribes backend system. Access is granted by the administrator through the Reseller management system.',
      signInTitle: 'Administrator Sign In',
      signInSubtitle: 'Access restricted to authorized administrators only.',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      contactAdmin: 'Contact Administrator',
      signInButton: 'Sign In',
      authenticating: 'Authenticating...',
      accessRequest: 'Access Request:',
      accessRequestText: 'Contact the administrator to request backend access permissions through the Reseller management system.'
    },
    es: {
      title: 'Acceso al Backend de AI Tribes',
      subtitle: 'Acceso administrativo al sistema backend de AI Tribes. El acceso es otorgado por el administrador a través del sistema de gestión de Revendedores.',
      signInTitle: 'Inicio de Sesión de Administrador',
      signInSubtitle: 'Acceso restringido solo a administradores autorizados.',
      emailLabel: 'Dirección de Correo Electrónico',
      passwordLabel: 'Contraseña',
      contactAdmin: 'Contactar Administrador',
      signInButton: 'Iniciar Sesión',
      authenticating: 'Autenticando...',
      accessRequest: 'Solicitud de Acceso:',
      accessRequestText: 'Contacte al administrador para solicitar permisos de acceso al backend a través del sistema de gestión de Revendedores.'
    },
    fr: {
      title: 'Accès Backend AI Tribes',
      subtitle: 'Accès administratif au système backend AI Tribes. L\'accès est accordé par l\'administrateur via le système de gestion des Revendeurs.',
      signInTitle: 'Connexion Administrateur',
      signInSubtitle: 'Accès restreint aux administrateurs autorisés uniquement.',
      emailLabel: 'Adresse E-mail',
      passwordLabel: 'Mot de Passe',
      contactAdmin: 'Contacter l\'Administrateur',
      signInButton: 'Se Connecter',
      authenticating: 'Authentification...',
      accessRequest: 'Demande d\'Accès:',
      accessRequestText: 'Contactez l\'administrateur pour demander les permissions d\'accès au backend via le système de gestion des Revendeurs.'
    },
    de: {
      title: 'AI Tribes Backend-Zugang',
      subtitle: 'Administrativer Zugang zum AI Tribes Backend-System. Der Zugang wird vom Administrator über das Reseller-Verwaltungssystem gewährt.',
      signInTitle: 'Administrator-Anmeldung',
      signInSubtitle: 'Zugang nur für autorisierte Administratoren.',
      emailLabel: 'E-Mail-Adresse',
      passwordLabel: 'Passwort',
      contactAdmin: 'Administrator Kontaktieren',
      signInButton: 'Anmelden',
      authenticating: 'Authentifizierung...',
      accessRequest: 'Zugriffsanfrage:',
      accessRequestText: 'Kontaktieren Sie den Administrator, um Backend-Zugriffsberechtigungen über das Reseller-Verwaltungssystem anzufordern.'
    },
    it: {
      title: 'Accesso Backend AI Tribes',
      subtitle: 'Accesso amministrativo al sistema backend AI Tribes. L\'accesso è concesso dall\'amministratore tramite il sistema di gestione Rivenditori.',
      signInTitle: 'Accesso Amministratore',
      signInSubtitle: 'Accesso limitato solo agli amministratori autorizzati.',
      emailLabel: 'Indirizzo Email',
      passwordLabel: 'Password',
      contactAdmin: 'Contatta Amministratore',
      signInButton: 'Accedi',
      authenticating: 'Autenticazione...',
      accessRequest: 'Richiesta di Accesso:',
      accessRequestText: 'Contatta l\'amministratore per richiedere i permessi di accesso al backend tramite il sistema di gestione Rivenditori.'
    },
    pt: {
      title: 'Acesso Backend AI Tribes',
      subtitle: 'Acesso administrativo ao sistema backend AI Tribes. O acesso é concedido pelo administrador através do sistema de gestão de Revendedores.',
      signInTitle: 'Login do Administrador',
      signInSubtitle: 'Acesso restrito apenas a administradores autorizados.',
      emailLabel: 'Endereço de Email',
      passwordLabel: 'Senha',
      contactAdmin: 'Contactar Administrador',
      signInButton: 'Entrar',
      authenticating: 'Autenticando...',
      accessRequest: 'Solicitação de Acesso:',
      accessRequestText: 'Contacte o administrador para solicitar permissões de acesso ao backend através do sistema de gestão de Revendedores.'
    },
    pl: {
      title: 'Dostęp do Backendu AI Tribes',
      subtitle: 'Dostęp administracyjny do systemu backend AI Tribes. Dostęp jest przyznawany przez administratora poprzez system zarządzania Resellerami.',
      signInTitle: 'Logowanie Administratora',
      signInSubtitle: 'Dostęp ograniczony tylko do autoryzowanych administratorów.',
      emailLabel: 'Adres Email',
      passwordLabel: 'Hasło',
      contactAdmin: 'Skontaktuj się z Administratorem',
      signInButton: 'Zaloguj się',
      authenticating: 'Uwierzytelnianie...',
      accessRequest: 'Żądanie Dostępu:',
      accessRequestText: 'Skontaktuj się z administratorem, aby poprosić o uprawnienia dostępu do backendu poprzez system zarządzania Resellerami.'
    },
    id: {
      title: 'Akses Backend AI Tribes',
      subtitle: 'Akses administratif ke sistem backend AI Tribes. Akses diberikan oleh administrator melalui sistem manajemen Reseller.',
      signInTitle: 'Masuk Administrator',
      signInSubtitle: 'Akses terbatas hanya untuk administrator yang berwenang.',
      emailLabel: 'Alamat Email',
      passwordLabel: 'Kata Sandi',
      contactAdmin: 'Hubungi Administrator',
      signInButton: 'Masuk',
      authenticating: 'Mengautentikasi...',
      accessRequest: 'Permintaan Akses:',
      accessRequestText: 'Hubungi administrator untuk meminta izin akses backend melalui sistem manajemen Reseller.'
    },
    da: {
      title: 'AI Tribes Backend Adgang',
      subtitle: 'Administrativ adgang til AI Tribes backend system. Adgang gives af administratoren gennem Forhandler management systemet.',
      signInTitle: 'Administrator Log Ind',
      signInSubtitle: 'Adgang begrænset til kun autoriserede administratorer.',
      emailLabel: 'Email Adresse',
      passwordLabel: 'Adgangskode',
      contactAdmin: 'Kontakt Administrator',
      signInButton: 'Log Ind',
      authenticating: 'Autentificerer...',
      accessRequest: 'Adgangsanmodning:',
      accessRequestText: 'Kontakt administratoren for at anmode om backend adgangstilladelser gennem Forhandler management systemet.'
    },
    ru: {
      title: 'Доступ к Backend AI Tribes',
      subtitle: 'Административный доступ к backend системе AI Tribes. Доступ предоставляется администратором через систему управления Реселлерами.',
      signInTitle: 'Вход Администратора',
      signInSubtitle: 'Доступ ограничен только авторизованными администраторами.',
      emailLabel: 'Адрес Электронной Почты',
      passwordLabel: 'Пароль',
      contactAdmin: 'Связаться с Администратором',
      signInButton: 'Войти',
      authenticating: 'Аутентификация...',
      accessRequest: 'Запрос Доступа:',
      accessRequestText: 'Свяжитесь с администратором для запроса разрешений доступа к backend через систему управления Реселлерами.'
    }
  }

  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ]

  const t = translations[language]
  const currentLanguage = supportedLanguages.find(lang => lang.code === language)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) throw error
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const selectLanguage = (langCode) => {
    setLanguage(langCode)
    setShowLanguageDropdown(false)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Left side - Hero */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ 
          width: '400px', 
          height: '300px', 
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <img 
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="AI Community" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              borderRadius: '2rem',
              opacity: 0.8
            }} 
          />
        </div>
        
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          {t.title}
        </h1>
        
        <p style={{ 
          fontSize: '1.125rem', 
          opacity: 0.9,
          maxWidth: '500px',
          lineHeight: 1.6,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}>
          {t.subtitle}
        </p>
      </div>

      {/* Right side - Login Form */}
      <div style={{ 
        width: '400px', 
        background: 'white', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Language Dropdown */}
        <div style={{ 
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                minWidth: '120px'
              }}
              onMouseOver={(e) => e.target.style.background = '#f1f5f9'}
              onMouseOut={(e) => e.target.style.background = '#f8fafc'}
            >
              <Globe size={16} />
              <span>{currentLanguage?.flag} {currentLanguage?.name}</span>
              <ChevronDown size={14} />
            </button>

            {showLanguageDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.25rem',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                minWidth: '200px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      border: 'none',
                      background: language === lang.code ? '#f1f5f9' : 'transparent',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                      if (language !== lang.code) {
                        e.target.style.background = '#f8fafc'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (language !== lang.code) {
                        e.target.style.background = 'transparent'
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <span style={{ marginLeft: 'auto', color: '#4f46e5', fontSize: '0.75rem' }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '2rem', textAlign: 'right', marginTop: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
            <Bot size={24} color="#4f46e5" />
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>AI Tribes Backend</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {t.signInTitle}
            </span>
          </div>
          
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            {t.signInSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t.emailLabel}</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>{t.passwordLabel}</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <a href="#" style={{ color: '#4f46e5', fontSize: '0.875rem', textDecoration: 'none' }}>
              {t.contactAdmin}
            </a>
          </div>

          {error && (
            <div style={{ 
              color: '#dc2626', 
              fontSize: '0.875rem', 
              marginBottom: '1rem',
              padding: '0.5rem',
              backgroundColor: '#fef2f2',
              borderRadius: '0.25rem',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem' }}
            disabled={loading}
          >
            {loading ? t.authenticating : t.signInButton}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
            <strong>{t.accessRequest}</strong> {t.accessRequestText}
          </p>
        </div>

        <div className="language-selector">
          {supportedLanguages.map((lang) => (
            <div 
              key={lang.code} 
              className="language-flag"
              style={{
                opacity: 1,
                cursor: 'pointer'
              }}
              onClick={() => selectLanguage(lang.code)}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
